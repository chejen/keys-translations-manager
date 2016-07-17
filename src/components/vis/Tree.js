import React from 'react'
import d3 from 'd3'
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import Mask from '../layout/Mask'

export default class Tree extends React.Component {
	static propTypes = {
		params: React.PropTypes.object.isRequired,
		messages: React.PropTypes.object,
		translations: React.PropTypes.array,
		CountActions: React.PropTypes.object.isRequired,
		VisActions: React.PropTypes.object.isRequired,
		treedata: React.PropTypes.array,
		reloaddata: React.PropTypes.bool.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const minHeight = 350,
			top = 370,
			windowHeight = typeof window === "undefined" ? minHeight + top : window.innerHeight,
			height = windowHeight < (minHeight + top) ? minHeight : windowHeight - top;

		this.height = height;
		this.diagonal = d3.svg.diagonal().projection(function(d) {
			return [d.y, d.x];
		});
		this.tree = d3.layout.tree().size([height, 600]);
		this.svg = d3.select("#vis_tree").append("svg")
			.attr("width", "100%").attr("height", height).append("g")
			.attr("transform", "translate(100,0)");
		this.count = 0;

		this.loadData(this.props.params.projectId);
	}

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
		}
	}

	loadData(projectId) {
		this.props.VisActions.loadTreeData(projectId);
	}

	toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}

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
				me.toggle(d);
				me.update(d);
			});

		nodeEnter.append("circle")
			.attr("r", 9).style("fill", "#fff");

		nodeEnter.append("text")
			.attr("x", function(d) {
				return d.children || d._children ? -13 : 13;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			})
			.text(function(d) { return d.name; })

		nodeEnter.append("title").html(function(d) {
				let obj = d.translations,
					filter = ["__v", "_id", "project", "key"],
					str = "",
					key;

				if (obj) {
					for (key in obj) {
						if ({}.hasOwnProperty.call(obj, key)) {
							if (filter.indexOf(key) === -1 && obj[key]) {
								str += `【${key}】${obj[key]}<br/><br/>`
							}
						}
					}
				}
				return str;
			});

		nodeUpdate = node.transition().duration(duration)
			.attr("transform", function(d) {
				return `translate(${d.y},${d.x})`;
			});

		nodeUpdate.select("circle").attr("r", 5.5)
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
				var o = {x: root.x0, y: root.y0};
				return me.diagonal({source: o, target: o});
			})
			.transition()
			.duration(duration)
			.attr("d", me.diagonal);

		link.transition().duration(duration).attr("d", me.diagonal);

		link.exit().transition().duration(duration)
			.attr("d", function() {
				var o = {x: root.x, y: root.y};
				return me.diagonal({source: o, target: o});
			})
			.remove();

		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	render() {
		return (
			<div id="vis_tree">
				<Mask show={!this.props.treedata}/>
				<Link to="/">
					<i title={localeUtil.getMsg("ui.common.goBack")} className="fa fa-arrow-left fa-lg"/>
				</Link>
			</div>
		);
	}
}
