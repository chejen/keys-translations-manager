import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import ConfirmModal from './ConfirmModal'
import configUtil from '../../configUtil'

export default class TablePanel extends React.Component {
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
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onQuickFilterText(event) {
		this.refs.table.handleSearch(event.target.value);
	}

	showEditModal(data) {
		this.props.showEditModal(data)
	}

	showConfirmModal(value, data) {
		this.refs.confirmModal.open(
			localeUtil.getMsg("ui.common.delete"),
			localeUtil.getMsg("ui.confirm.delete", data.key),
			this.removeTranslation.bind(this, value)
		);
	}

	removeTranslation(value) {
		this.props.removeTranslation(value);
	}

	render() {
		// const h = $(window).height();
		// const offset = $(".ag-fresh").offset();
		const me = this,
			config = me.context.config,
			locales = config.locales;

		return (
			<div>
				<Row>
					<Col sm={8} xs={12}>
						{localeUtil.getMsg("ui.grid.edit")}
					</Col>
					<Col sm={4} xs={12}>
						<InputGroup>
							<InputGroup.Addon>
								<i className="fa fa-search"/>
							</InputGroup.Addon>
							<FormControl type="text"
								placeholder={localeUtil.getMsg("ui.grid.search")}
								onChange={this.onQuickFilterText.bind(this)}/>
						</InputGroup>
					</Col>
				</Row>
				<BootstrapTable ref="table" data={this.props.translations}
						striped={true} hover={true} condensed={true}
						options={{
							noDataText: localeUtil.getMsg("ui.grid.empty")
						}}
						cellEdit={{
							mode: "dbclick",
							blurToSave: false,
							afterSaveCell: function(row, cellName, cellValue){
								console.log(row, cellName, cellValue)
								me.props.updateTranslation(row);
							}
						}}>

					<TableHeaderColumn width="50" dataField="_id" dataFormat={function(cell, row){
						return (
							<div>
								<Glyphicon glyph="edit" className="app-action-icon" title={localeUtil.getMsg("ui.common.edit")}
									onClick={me.showEditModal.bind(me, row)}/>
								<Glyphicon glyph="trash" className="app-action-icon" title={localeUtil.getMsg("ui.common.delete")}
									onClick={me.showConfirmModal.bind(me, cell, row)}/>
							</div>
						);
					}}>
						{localeUtil.getMsg("ui.common.action")}
					</TableHeaderColumn>
					<TableHeaderColumn width="100" dataField="project" dataFormat={function(cell){
						const projectList = cell,
								l = projectList ? projectList.length : 0,
								getProjectName = configUtil.getProjectName;
						let i, project = [];
						for (i = 0; i < l; i++) {
							project.push( getProjectName(projectList[i]) );
						}
						return <div>{project.join(", ")}</div>
					}}>
						{localeUtil.getMsg("ui.common.applyto")}
					</TableHeaderColumn>
					<TableHeaderColumn width="100" dataField="key" isKey={true} dataSort={true}>Key</TableHeaderColumn>
					<TableHeaderColumn width="100" dataField="description">{localeUtil.getMsg("ui.common.desc")}</TableHeaderColumn>
					{locales.map(function(locale){
						return (
							<TableHeaderColumn key={locale} width="100" dataField={locale} dataSort={true}>
								{`${localeUtil.getMsg("ui.common.locale")} / ${locale}`}
							</TableHeaderColumn>
						);
					})}
				</BootstrapTable>
				<ConfirmModal ref="confirmModal"/>
			</div>
		);
	}
}
