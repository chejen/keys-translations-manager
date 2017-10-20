import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import ConfirmModal from './ConfirmModal'
import Mask from '../layout/Mask'
import configUtil from '../../configUtil'

export default class TablePanel extends React.PureComponent {
	static propTypes = {
		reloaddata: PropTypes.bool,
		messages: PropTypes.object,
		CountActions: PropTypes.object.isRequired,
		TranslationActions: PropTypes.object.isRequired,
		ComponentActions: PropTypes.object.isRequired,
		translations: PropTypes.array
	};

	static contextTypes = {
		config: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			windowHeight: 0
		};

		//https://gist.github.com/Restuta/e400a555ba24daa396cc
		this.handleResize = this.handleResize.bind(this);
		this.onQuickFilterText = this.onQuickFilterText.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.loadData();
	}

	componentWillReceiveProps(nextProps) {
		const { reloaddata, translations } = nextProps;

		if (reloaddata) {
			this.loadData();
		}

		if (translations && translations !== this.props.translations) {
			nextProps.CountActions.loadCounts();
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	loadData() {
		this.props.TranslationActions.loadTranslations();
	}

	/* istanbul ignore next */
	handleResize() {
		this.setState({
			windowHeight: window.innerHeight
		});
	}

	onQuickFilterText(event) {
		this.refTable.handleSearch(event.target.value);
	}

	showEditModal(data) {
		this.props.ComponentActions.showEditModal(data)
	}

	showConfirmModal(value, data) {
		this.refConfirmModal.open(
			localeUtil.getMsg("ui.common.delete"),
			localeUtil.getMsg("ui.confirm.delete", data.key),
			this.removeTranslation.bind(this, value)
		);
	}

	removeTranslation(value) {
		this.props.TranslationActions.removeTranslation(value);
	}

	downloadCsv() {
		let url = configUtil.getHost() + "/api/download/csv"

		/* istanbul ignore next */
		location.href = url;
	}

	render() {
		const me = this,
			config = me.context.config,
			locales = config.locales,
			minHeight = 200,
			top = 370,
			windowHeight = this.state.windowHeight ||
						(typeof window === "undefined" ? minHeight + top : window.innerHeight);

		return (
			<div>
				<InputGroup>
					<InputGroup.Addon className="app-search-icon">
						<i className="fa fa-search"/>
					</InputGroup.Addon>
					<FormControl type="text" className="app-search-bar"
						placeholder={localeUtil.getMsg("ui.grid.search")}
						onChange={this.onQuickFilterText}/>
					<InputGroup.Button style={{"paddingLeft": "5px"}}>
						<Button onClick={this.downloadCsv}>
							<i className="fa fa-file-text-o"/> CSV
						</Button>
					</InputGroup.Button>
				</InputGroup>
				<BootstrapTable
					ref={cmp => { this.refTable = cmp; }}
					data={this.props.translations || []}
					height={(windowHeight < (minHeight + top) ? minHeight : windowHeight - top) + ""}
					striped={true}
					hover={true}
					condensed={true}
					options={{
						noDataText: localeUtil.getMsg("ui.grid.empty")
					}}
					cellEdit={{
						mode: "dbclick",
						blurToSave: false,
						afterSaveCell: row => {
							me.props.TranslationActions.updateTranslation(row);
						}
					}}
				>

					<TableHeaderColumn
						row="0"
						rowSpan="2"
						width="30"
						dataField="_id"
						isKey={true}
						dataFormat={function(cell, row){
							return (
								<div>
									<Glyphicon
										glyph="edit"
										className="app-action-icon"
										title={localeUtil.getMsg("ui.common.edit")}
										onClick={me.showEditModal.bind(me, row)}
									/>
									<Glyphicon
										glyph="trash"
										className="app-action-icon"
										title={localeUtil.getMsg("ui.common.delete")}
										onClick={me.showConfirmModal.bind(me, cell, row)}
									/>
								</div>
							);
						}}
					>
						{localeUtil.getMsg("ui.common.action")}
					</TableHeaderColumn>

					<TableHeaderColumn
						row="0"
						rowSpan="2"
						width="100"
						editable={false}
						dataField="project"
						dataFormat={function(cell){
							const projectList = cell,
									l = projectList ? projectList.length : 0,
									getProjectName = configUtil.getProjectName;
							let i, project = [];
							for (i = 0; i < l; i++) {
								project.push( getProjectName(projectList[i]) );
							}
							return <div>{project.join(", ")}</div>
						}}
					>
						{localeUtil.getMsg("ui.common.applyto")}
					</TableHeaderColumn>

					<TableHeaderColumn
						row="0"
						rowSpan="2"
						width="100"
						editable={false}
						dataField="key"
						dataSort={true}
					>
						Key
					</TableHeaderColumn>

					<TableHeaderColumn
						row="0"
						rowSpan="2"
						width="100"
						editable={false}
						dataField="description"
					>
						{localeUtil.getMsg("ui.common.desc")}
					</TableHeaderColumn>

					<TableHeaderColumn row="0" colSpan={locales.length}>
						{localeUtil.getMsg("ui.common.locales")}
						{' '}
						<OverlayTrigger
							placement="top"
							overlay={<Tooltip id="tooltip-locales">
									{localeUtil.getMsg("ui.grid.edit")}
									</Tooltip>
							}
						>
							<i className="fa fa-info-circle text-primary"/>
						</OverlayTrigger>
					</TableHeaderColumn>

					{locales.map(function(locale){
						return (
							<TableHeaderColumn
								key={locale}
								row="1"
								width="100"
								editable={true}
								dataField={locale}
								dataSort={true}
							>
								{locale}
							</TableHeaderColumn>
						);
					})}
				</BootstrapTable>
				<ConfirmModal ref={cmp => { this.refConfirmModal = cmp; }} />
				<Mask show={!this.props.translations}/>
			</div>
		);
	}
}
