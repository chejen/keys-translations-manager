import React from 'react'
import PropTypes from 'prop-types'
import * as d3Zoom from 'd3-zoom'
import * as d3Hierarchy from 'd3-hierarchy'
import * as d3Selection from 'd3-selection'
import {event as currentEvent} from 'd3-selection'; // https://github.com/d3/d3/issues/2814
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Label from 'react-bootstrap/lib/Label'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Mask from '../layout/Mask'
import Tooltip from './Tooltip'

const d3 = Object.assign({}, d3Zoom, d3Hierarchy, d3Selection);

export default class Tree extends React.PureComponent {
	static propTypes = {
		match: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		translations: PropTypes.array,
		TranslationActions: PropTypes.object.isRequired,
		ComponentActions: PropTypes.object.isRequired,
		CountActions: PropTypes.object.isRequired,
		VisActions: PropTypes.object.isRequired,
		showtooltip: PropTypes.bool.isRequired,
		tooltiptop: PropTypes.number.isRequired,
		tooltipleft: PropTypes.number.isRequired,
		treedata: PropTypes.array,
		reloaddata: PropTypes.bool.isRequired
	};

	constructor() {
		super();
		this.state = {
			isTranslatedOrScaled: false,
			data: null,
			title: "",
			desc: "",
			content: ""
		};

		this.enableMouseover = true;
		this.radius = 5;
		this.strokeWidth = 2; //set in less
		this.margin = 100;
		this.newX = 0;
		this.newY = 0;
		this.newScale = 1;
	}

	/* istanbul ignore next */
	componentDidMount() {
		const minHeight = 350,
			top = 370,
			windowHeight = typeof window === "undefined" ? minHeight + top : window.innerHeight,
			height = windowHeight < (minHeight + top) ? minHeight : windowHeight - top;

		this.height = height;
		this.zoom = d3.zoom()
			.scaleExtent([1, 10])
			.on("zoom", () => {
				// https://github.com/facebook/react/issues/6641
				const t = currentEvent.transform,
					x = t.x,
					y = t.y,
					scale = t.k;

				this.newX = x;
				this.newY = y;
				this.newScale = scale;
				this.svg.attr("transform", "translate(" + (x + this.margin) + "," + y + ")scale(" + scale + ")");
				this.setState({
					isTranslatedOrScaled: true
				});
			});

		// https://github.com/d3/d3-shape/issues/27
		this.diagonal = (s, d) => {
			return `M ${s.y} ${s.x} C ${(s.y + d.y) / 2} ${s.x}, ${(s.y + d.y) / 2} ${d.x}, ${d.y} ${d.x}`
		};

		// https://github.com/d3/d3/blob/master/CHANGES.md#hierarchies-d3-hierarchy
		this.treemap = d3.tree().size([height, 600]);

		this._svg = d3.select("#vis_tree").append("svg").call(this.zoom);
		this.svg = this._svg
			.attr("width", "100%").attr("height", height).append("g")
			.attr("transform", "translate(" + this.margin + ",0)");
		this.count = 0;
		this.loadData(this.props.match.params.projectId);
	}

	/* istanbul ignore next */
	componentDidUpdate(prevProps) {
		const me = this,
			{treedata, translations, reloaddata, match, CountActions} = this.props;
		let data;

		if (reloaddata || //socket
				translations !== prevProps.translations || //add/update/...
				match.params.projectId !== prevProps.match.params.projectId) { //change project
			this.loadData(match.params.projectId);
		}

		if (treedata && treedata.length &&
			treedata !== prevProps.treedata) {

			CountActions.loadCounts();

			if (treedata.length === 1) {
				data = treedata[0];
			} else {
				data = {
					name: "-",
					children: treedata
				};
			}
			this.root = d3.hierarchy(data, d => { return d.children; });
			this.root.x0 = this.height / 2;
			this.root.y0 = 0;

			// Collapse after the second level
			if (this.root.children) {
				this.root.children.forEach(me.toggleAll.bind(me));
			}
			this.update(this.root);
			this.reset();
		}
	}

	loadData(projectId) {
		this.props.VisActions.loadTreeData(projectId);
	}

	/* istanbul ignore next */
	toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}

	/* istanbul ignore next */
	toggleAll(d) {
		const me = this;
		if (d.children) {
			d.children.forEach(me.toggleAll.bind(me));
			me.toggle(d);
		}
	}

	update(root) {
		const me = this,
			duration = 200,
			treeData = this.treemap(this.root),
			nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);
		let node,
			nodeEnter,
			nodeUpdate,
			nodeExit,
			nodeCount = 0,
			link;

		nodes.forEach(d => { d.y = d.depth * 150; });

		node = me.svg.selectAll("g.node")
			.data(nodes, d => {
				if (!d.id) {
					d.id = ++me.count;
				}
				return d.id;
			});

		nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", () => {
				return `translate(${root.y0},${root.x0})`
			})
			.on("click", d => {
				me.enableMouseover = false;
				me.toggle(d);
				me.update(d);
			});

		nodeEnter.append("circle")
			.attr("r", me.radius).style("fill", "#fff")
			.on("mouseover", d => {
				const obj = d.data.translations,
					filter = ["__v", "_id", "project"];
				let title,
					desc,
					content = [],
					key;

				if (me.enableMouseover && obj) {
					for (key in obj) {
						if ({}.hasOwnProperty.call(obj, key)) {
							if (key === "key") {
								title = obj.key;
							} else if (key === "description") {
								desc = obj.description;
							} else if (filter.indexOf(key) === -1 && obj[key]) {
								content.push(
									<h5 key={key}>
										<Label bsStyle="warning">{key}</Label>
										{' ' + obj[key]}
									</h5>
								);
							}
						}
					}

					clearInterval(timingUtil.getTimeoutId());
					me.setState({
						data: obj,
						title,
						desc,
						content,
						t: +new Date() //force update
					}, () => {
						me.props.ComponentActions.showTooltip(
							(d.x) * me.newScale + me.newY - 12,
							(d.y + me.radius + me.strokeWidth) * me.newScale + me.newX + 130
						);
					});
				}
			})
			.on("mouseout", d => {
				if (d.data.translations) {
					const timeoutId = setTimeout(() => {
						me.props.ComponentActions.hideTooltip();
					}, 300);
					timingUtil.setTimeoutId(timeoutId);
				}
			});

		nodeEnter.append("text")
			.attr("x", d => {
				return d.children || d._children ? -15 : 15;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", d => {
				return d.children || d._children ? "end" : "start";
			})
			.text(d => { return d.data.name; })

		nodeUpdate = nodeEnter.merge(node)
			.each(() => {
				nodeCount++;
			})
			.transition().duration(duration)
			.on('end', () => {
				nodeCount--;
				if (!nodeCount) {
					me.enableMouseover = true;
				}
			})
			.attr("transform", d => {
				return `translate(${d.y},${d.x})`;
			});

		nodeUpdate.select("circle").attr("r", me.radius)
			.style("fill", d => {
				return d._children ? "#FDD11A" : "#fff";
			})
			.style("cursor", d => {
				return (d.children || d._children) ? "pointer" : "default";
			});

		nodeUpdate.select("text").style("fill-opacity", 1);

		nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", () => {
				return `translate(${root.y},${root.x})`
			})
			.remove();

		nodeExit.select("circle").attr("r", 1e-6);

		nodeExit.select("text").style("fill-opacity", 1e-6);

		link = me.svg.selectAll("path.link")
			.data(links, d => { return d.id; });

		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", () => {
				const o = {x: root.x0, y: root.y0};
				return me.diagonal(o, o);
			})
			.transition()
			.duration(duration)
			.attr("d", d => {
				return me.diagonal(d, d.parent)
			});

		link.transition().duration(duration).attr("d", d => {
			return me.diagonal(d, d.parent)
		});

		link.exit().transition().duration(duration)
			.attr("d", () => {
				const o = {x: root.x, y: root.y};
				return me.diagonal(o, o);
			})
			.remove();

		nodes.forEach(d => {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	showEditModal(data) {
		this.props.ComponentActions.showEditModal(data);
	}

	showConfirmModal(data) {
		this.props.ComponentActions.showConfirmModal(data);
	}

	/* istanbul ignore next */
	removeTranslation(value) {
		this.props.TranslationActions.removeTranslation(value);
	}

	goBack() {
		// this.props.history.goBack();
		this.props.history.push("/");
	}

	reset() {
		this.newX = 0;
		this.newY = 0;
		this.newScale = 1;

		this._svg.transition().duration(200)
			.call(this.zoom.transform, d3.zoomIdentity)
			.on('end', () => {
				this.setState({
					isTranslatedOrScaled: false
				});
			});
	}

	render() {
		const { title, desc, content, data } = this.state;
		const style = {
			display: this.props.showtooltip ? "inline" : "none",
			top: this.props.tooltiptop,
			left: this.props.tooltipleft,
		};

		return (
			<div id="vis_tree">
				<Tooltip {...style} ComponentActions={this.props.ComponentActions}>
					<div className="app-tooltip-title">{title}</div>
					{desc && <div className="app-tooltip-desc">{desc}</div>}
					<div className="app-tooltip-content">{content}</div>
					<div className="app-tooltip-footer">
						<Glyphicon glyph="edit" className="app-action-icon"
							title={localeUtil.getMsg("ui.common.edit")}
							onClick={this.showEditModal.bind(this, data)}/>
						{data && <Glyphicon glyph="trash" className="app-action-icon"
							title={localeUtil.getMsg("ui.common.delete")}
							onClick={this.showConfirmModal.bind(this, data)}/>}
					</div>
				</Tooltip>
				<Mask show={!this.props.treedata}/>

				<ButtonGroup>
					<Button onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"/>
						{' ' + localeUtil.getMsg("ui.common.goBack")}
					</Button>
					{this.state.isTranslatedOrScaled &&
						<Button onClick={this.reset.bind(this)}>
							<i className="fa fa-refresh"/>
							{' ' + localeUtil.getMsg("ui.common.reset")}
						</Button>
					}
				</ButtonGroup>
			</div>
		);
	}
}
