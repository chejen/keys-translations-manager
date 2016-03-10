import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'
import React from 'react'
import {AgGridReact} from 'ag-grid-react/lib/agGridReact'
import {reactCellRendererFactory} from 'ag-grid-react/lib/reactCellRendererFactory';
import Button from 'react-bootstrap/lib/Button'
import Input from 'react-bootstrap/lib/Input'
import ActionCellRenderer from './ActionCellRenderer'
import ProjectCellRenderer from './ProjectCellRenderer'
import TranslationActions from '../../actions/TranslationActions'
import LocaleUtil from '../../../util/LocaleUtil'

export default class GridPanel extends React.Component {
	constructor(props, context) {
		super(props, context);



		/*let columnDefs = [{
				headerName: LocaleUtil.getMsg("ui.common.action"),
				field: '_id',
				pinned: true,
				width: 60,
				suppressSorting: true,
				cellRenderer: reactCellRendererFactory(ActionCellRenderer)
			}, {
				headerName: LocaleUtil.getMsg("ui.common.applyto"),
				field: 'project',
				pinned: true,
				cellRenderer: reactCellRendererFactory(ProjectCellRenderer, props)
			}, {
				headerName: "Key",
				field: "key",
				pinned: true
			}, {
				headerName: LocaleUtil.getMsg("ui.common.locales"),
				children: localeCols
			}
		];*/

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
				noRowsToShow: LocaleUtil.getMsg("ui.grid.empty")
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.messages !== this.props.messages) {
			this.setState({
				columnDefs: this.getColumnDefs(this.props, this.context)
			});
		}
	}

	getColumnDefs(props, context) {
		const config = context.config,
				locales = config.locales;

		let localeCols = locales.map(function(locale){
			return {
				headerName: locale,
				field: locale,
				editable: true,
				newValueHandler: function(params) {
					params.data[this.field] = params.newValue;
					TranslationActions.updateTranslation(params.data);
				}
			};
		});

		const columnDefs = [{
				headerName: LocaleUtil.getMsg("ui.common.action"),
				field: '_id',
				pinned: true,
				width: 60,
				suppressSorting: true,
				cellRenderer: reactCellRendererFactory(ActionCellRenderer)
			}, {
				headerName: LocaleUtil.getMsg("ui.common.applyto"),
				field: 'project',
				pinned: true,
				cellRenderer: reactCellRendererFactory(ProjectCellRenderer, props)
			}, {
				headerName: "Key",
				field: "key",
				pinned: true
			}, {
				headerName: LocaleUtil.getMsg("ui.common.locales"),
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
				<div className="input-group custom-search-form">
					<span className="input-group-btn">
						<Button bsStyle="default">
							<i className="fa fa-search"/>
						</Button>
					</span>
					<Input type="text" className="form-control"
						placeholder={LocaleUtil.getMsg("ui.grid.search")}
						onChange={this.onQuickFilterText.bind(this)}/>
				</div>

				<div style={{height: (offset ? (h - offset.top - 20) : 430) + 'px'}} className="ag-fresh">
					<AgGridReact
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

GridPanel.contextTypes = {
    config: React.PropTypes.object
};
