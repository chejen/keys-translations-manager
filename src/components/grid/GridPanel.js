// import 'ag-grid/dist/styles/ag-grid.css'
// import 'ag-grid/dist/styles/theme-fresh.css'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {AgGridReact} from 'ag-grid-react/lib/agGridReact'
import {reactCellRendererFactory} from 'ag-grid-react/lib/reactCellRendererFactory';
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ActionCellRenderer from './ActionCellRenderer'
import ProjectCellRenderer from './ProjectCellRenderer'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class GridPanel extends React.Component {
	static propTypes = {
		messages: React.PropTypes.object,
		translations: React.PropTypes.array.isRequired,
		updateTranslation: React.PropTypes.func.isRequired,
		removeTranslation: React.PropTypes.func.isRequired,
		showEditModal: React.PropTypes.func.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			quickFilterText: null,
			columnDefs: this.getColumnDefs(props, context),
			rowData: [],
			icons: {
				columnRemoveFromGroup: '<i class="fa fa-remove"/>',
				filter: '<i class="fa fa-filter"/>',
				sortAscending: '<i class="fa fa-long-arrow-down"/>',
				sortDescending: '<i class="fa fa-long-arrow-up"/>',
				groupExpanded: '<i class="fa fa-minus-square-o"/>',
				groupContracted: '<i class="fa fa-plus-square-o"/>',
				columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
				columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
			}
		};

		this.gridOptions = {
			rowBuffer: 10,
			localeText: {
				noRowsToShow: localeUtil.getMsg("ui.grid.empty")
			}
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.messages !== this.props.messages) {
			this.setState({
				columnDefs: this.getColumnDefs(this.props, this.context)
			});
		}
	}

	getColumnDefs(props, context) {
		const me = this,
			config = context.config,
			locales = config.locales;

		let localeCols = locales.map(function(locale){
			return {
				headerName: locale,
				field: locale,
				editable: true,
				newValueHandler: function(params) {
					params.data[params.colDef.field] = params.newValue;
					me.props.updateTranslation(params.data);
				}
			};
		});

		const columnDefs = [{
				headerName: localeUtil.getMsg("ui.common.action"),
				field: '_id',
				pinned: true,
				width: 60,
				suppressSorting: true,
				cellRenderer: reactCellRendererFactory(ActionCellRenderer)
			}, {
				headerName: localeUtil.getMsg("ui.common.applyto"),
				field: 'project',
				pinned: true,
				cellRenderer: reactCellRendererFactory(ProjectCellRenderer)
			}, {
				headerName: "Key",
				field: "key",
				pinned: true
			}, {
				headerName: localeUtil.getMsg("ui.common.desc"),
				field: "description",
				pinned: true
			}, {
				headerName: localeUtil.getMsg("ui.common.locales") + " " + localeUtil.getMsg("ui.grid.edit"),
				children: localeCols
			}
		];
		return columnDefs;
	}

	onQuickFilterText(event) {
		this.setState({quickFilterText: event.target.value});
	}

	render() {
        const h = $(window).height();
        const offset = $(".ag-fresh").offset();

		return (
			<div>
				<InputGroup>
					<InputGroup.Addon>
						<i className="fa fa-search"/>
					</InputGroup.Addon>
					<FormControl type="text"
						placeholder={localeUtil.getMsg("ui.grid.search")}
						onChange={this.onQuickFilterText.bind(this)}/>
				</InputGroup>

				<div style={{height: (offset ? (h - offset.top - 20) : 430) + 'px'}} className="ag-fresh">
					<AgGridReact
						context={{
							config: this.context.config,
							showEditModal: this.props.showEditModal,
							removeTranslation: this.props.removeTranslation
						}}
						gridOptions={this.gridOptions}
						quickFilterText={this.state.quickFilterText}
						icons={this.state.icons}
						columnDefs={this.state.columnDefs}
						rowData={this.props.translations}
						enableColResize="true"
						enableSorting="true"
						groupHeaders="true"
						rowHeight="28"
					/>
				</div>
			</div>
		);
	}
}
