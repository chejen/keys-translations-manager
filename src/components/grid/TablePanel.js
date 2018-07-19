import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/ag-theme-dark.css'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import { AgGridReact } from 'ag-grid-react'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import ConfigContext from '../../context/ConfigContext'
import ActionCellRenderer from './ActionCellRenderer'
import Mask from '../layout/Mask'
import { getHost, getProjectName } from '../../configUtil'

let ActionCellRendererHoc

export default class TablePanel extends React.PureComponent {
	static propTypes = {
		reloaddata: PropTypes.bool,
		messages: PropTypes.object,
		CountActions: PropTypes.object.isRequired,
		TranslationActions: PropTypes.object.isRequired,
		ComponentActions: PropTypes.object.isRequired,
		translations: PropTypes.array
	};

	constructor(props) {
		super(props);

		ActionCellRendererHoc = connect(
			null,
			dispatch => ({
				ComponentActions: bindActionCreators(props.ComponentActions, dispatch),
			})
		)(ActionCellRenderer);

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

	componentDidUpdate(prevProps) {
		const { reloaddata, translations, CountActions } = this.props;

		if (reloaddata) {
			this.loadData();
		}

		if (translations && translations !== prevProps.translations) {
			CountActions.loadCounts();
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

	downloadCsv() {
		let url = getHost() + "/api/download/csv"

		/* istanbul ignore next */
		location.href = url;
	}

	getColumnDefs(locales) {
		// localeUtil.getMsg("ui.grid.empty")
		return [
			{
				headerName: localeUtil.getMsg("ui.common.action"),
				field: '_id',
				cellRendererFramework: ActionCellRendererHoc,
				width: 90,
				pinned: 'left',
			}, {
				headerName: localeUtil.getMsg("ui.common.applyto"),
				field: 'project',
				valueFormatter: params => params.value.map(e => getProjectName(e)).join(', '),
				pinned: 'left',
			}, {
				headerName: 'Key',
				field: 'key',
				pinned: 'left',
			}, {
				headerName: `${localeUtil.getMsg("ui.common.locales")} (${localeUtil.getMsg("ui.grid.edit")})`,
				children: locales.map(locale => ({
					headerName: locale,
					field: locale,
					editable: true,
				})),
			}, {
				headerName: localeUtil.getMsg("ui.common.desc"),
				field: 'description',
			},
		];
	}

	render() {
		const minHeight = 200,
			top = 370,
			windowHeight = this.state.windowHeight ||
						(typeof window === "undefined" ? minHeight + top : window.innerHeight);

		return (
			<ConfigContext.Consumer>
				{config => (
				<Fragment>
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
					<div
						className="ag-theme-dark"
						style={{
							marginTop: '3px',
							height: `${(windowHeight < (minHeight + top) ? minHeight : windowHeight - top)}px`
						}}
					>
						<AgGridReact
							columnDefs={this.getColumnDefs(config.locales)}
							rowData={this.props.translations || []}
							enableColResize={true}
							onCellEditingStopped={event => {
								this.props.TranslationActions.updateTranslation(event.data);
							}}
						/>
					</div>
					<Mask show={!this.props.translations}/>
				</Fragment>)}
			</ConfigContext.Consumer>
		);
	}
}
