import React from 'react'
import { browserHistory } from 'react-router'
import d3 from 'd3'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Label from 'react-bootstrap/lib/Label'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ConfirmModal from '../grid/ConfirmModal'
import Mask from '../layout/Mask'
import Tooltip from './Tooltip'

export default class Tree extends React.Component {
	static propTypes = {
		params: React.PropTypes.object.isRequired,
		messages: React.PropTypes.object,
		translations: React.PropTypes.array,
		TranslationActions: React.PropTypes.object.isRequired,
		ComponentActions: React.PropTypes.object.isRequired,
		CountActions: React.PropTypes.object.isRequired,
		VisActions: React.PropTypes.object.isRequired,
		showtooltip: React.PropTypes.bool.isRequired,
		tooltiptop: React.PropTypes.number.isRequired,
		tooltipleft: React.PropTypes.number.isRequired,
		treedata: React.PropTypes.array,
		reloaddata: React.PropTypes.bool.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
		const me = this,
			minHeight = 350,
			top = 370,
			windowHeight = typeof window === "undefined" ? minHeight + top : window.innerHeight,
			height = windowHeight < (minHeight + top) ? minHeight : windowHeight - top;

		this.height = height;
		this.zoom = d3.behavior.zoom()
			.scaleExtent([1, 10])
			.on("zoom", function() {
				const x = d3.event.translate[0],
					y = d3.event.translate[1],
					scale = d3.event.scale;

				if (x !== me.newX || y !== me.newY || scale !== me.newScale) {
					me.newX = x;
					me.newY = y;
					me.newScale = scale;
					me.svg.attr("transform", "translate(" + (x + me.margin) + "," + y + ")scale(" + scale + ")");
					me.setState({
						isTranslatedOrScaled: true
					});
				}
			});
		this.diagonal = d3.svg.diagonal().projection(function(d) {
			return [d.y, d.x];
		});
		this.tree = d3.layout.tree().size([height, 600]);
		this._svg = d3.select("#vis_tree").append("svg").call(this.zoom);
		this.svg = this._svg
			.attr("width", "100%").attr("height", height).append("g")
			.attr("transform", "translate(" + me.margin + ",0)");
		this.count = 0;

		this.loadData(this.props.params.projectId);
	}

	/* istanbul ignore next */
	componentWillReceiveProps(nextProps) {
		const me = this,
			{treedata, translations, reloaddata, params, CountActions} = nextProps;

		if (reloaddata || //socket
				translations !== this.props.translations || //add/update/...
				params.projectId !== this.props.params.projectId) { //change project
			this.loadData(params.projectId);
		}

		if (treedata && treedata.length &&
			treedata !== this.props.treedata) {

			CountActions.loadCounts();

			if (treedata.length === 1) {
				this.root = treedata[0];
			} else {
				this.root = {
					name: "-",
					children: treedata
				};
			}
			this.root.x0 = this.height / 2;
			this.root.y0 = 0;
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
			duration = 200;
		let nodes = me.tree.nodes(this.root).reverse(),
			links = me.tree.links(nodes),
			node,
			nodeEnter,
			nodeUpdate,
			nodeExit,
			nodeCount = 0,
			link;

		nodes.forEach(function(d) { d.y = d.depth * 150; });

		node = me.svg.selectAll("g.node")
			.data(nodes, function(d) {
				if (!d.id) {
					d.id = ++me.count;
				}
				return d.id;
			});

		nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function() {
				return `translate(${root.y0},${root.x0})`
			})
			.on("click", function(d) {
				me.enableMouseover = false;
				me.toggle(d);
				me.update(d);
			});

		nodeEnter.append("circle")
			.attr("r", 9).style("fill", "#fff")
			.on("mouseover", function(d) {
				const obj = d.translations,
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
					}, function(){
						me.props.ComponentActions.showTooltip(
							(d.x) * me.newScale + me.newY - 12,
							(d.y + me.radius + me.strokeWidth) * me.newScale + me.newX + 130
						);
					});
				}
			})
			.on("mouseout", function(d) {
				if (d.translations) {
					const timeoutId = setTimeout(function(){
						me.props.ComponentActions.hideTooltip();
					}, 300);
					timingUtil.setTimeoutId(timeoutId);
				}
			});

		nodeEnter.append("text")
			.attr("x", function(d) {
				return d.children || d._children ? -15 : 15;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			})
			.text(function(d) { return d.name; })


		nodeUpdate = node
			.each(function() {
				nodeCount++;
			})
			.transition().duration(duration)
			.each('end', function() {
				nodeCount--;
				if (!nodeCount) {
					me.enableMouseover = true;
				}
			})
			.attr("transform", function(d) {
				return `translate(${d.y},${d.x})`;
			});

		nodeUpdate.select("circle").attr("r", me.radius)
			.style("fill", function(d) {
				return d._children ? "#FDD11A" : "#fff";
			})
			.style("cursor", function(d) {
				return (d.children || d._children) ? "pointer" : "default";
			});

		nodeUpdate.select("text").style("fill-opacity", 1);

		nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function() {
				return `translate(${root.y},${root.x})`
			})
			.remove();

		nodeExit.select("circle").attr("r", 1e-6);

		nodeExit.select("text").style("fill-opacity", 1e-6);

		link = me.svg.selectAll("path.link")
			.data(links, function(d) { return d.target.id; });

		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function() {
				const o = {x: root.x0, y: root.y0};
				return me.diagonal({source: o, target: o});
			})
			.transition()
			.duration(duration)
			.attr("d", me.diagonal);

		link.transition().duration(duration).attr("d", me.diagonal);

		link.exit().transition().duration(duration)
			.attr("d", function() {
				const o = {x: root.x, y: root.y};
				return me.diagonal({source: o, target: o});
			})
			.remove();

		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	showEditModal(data) {
		this.props.ComponentActions.showEditModal(data);
	}

	showConfirmModal(value, data) {
		this.refs.confirmModal.open(
			localeUtil.getMsg("ui.common.delete"),
			localeUtil.getMsg("ui.confirm.delete", data.key),
			this.removeTranslation.bind(this, value)
		);
	}

	/* istanbul ignore next */
	removeTranslation(value) {
		this.props.TranslationActions.removeTranslation(value);
	}

	goBack() {
		browserHistory.push("/");
	}

	reset() {
		this.newX = 0;
		this.newY = 0;
		this.newScale = 1;
		this.zoom.translate([this.newX, this.newY]).scale(this.newScale);
		this.svg.attr("transform", `translate(${(this.newX + this.margin)},${this.newX})scale(${this.newScale})`);
		this.setState({
			isTranslatedOrScaled: false
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
							onClick={this.showConfirmModal.bind(this, data._id, data)}/>}
					</div>
				</Tooltip>
				<ConfirmModal ref="confirmModal"/>
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
