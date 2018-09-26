import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ReactTable from "react-table"
import debounce from 'lodash/debounce';
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import ActionCellRenderer from './ActionCellRenderer'
import Mask from '../layout/Mask'
import { getLocales, getProjectName } from '../../configUtil'

const locales = getLocales()

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

		this.state = {
			quickFilterText: null,
			windowHeight: 0
		};

		//https://gist.github.com/Restuta/e400a555ba24daa396cc
		this.handleResize = this.handleResize.bind(this);
		this.debounceResize = debounce(this.handleResize, 150);
		this.onQuickFilterText = this.onQuickFilterText.bind(this);
		this.debounceFilter = debounce(this.handleFilter, 150);
	}

	componentDidMount() {
		window.addEventListener('resize', this.debounceResize);
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
		window.removeEventListener('resize', this.debounceResize);
	}

	loadData() {
		this.props.TranslationActions.loadTranslations();
	}

	handleResize() {
		this.setState({
			windowHeight: window.innerHeight
		});
	}

	handleFilter(quickFilterText) {
		this.setState({
			quickFilterText
		});
	}

	onQuickFilterText(event) {
		this.debounceFilter(event.target.value);
	}

	downloadCsv() {
		let url = '/api/download/csv'

		/* istanbul ignore next */
		location.href = url;
	}

	getColumnDefs() {
		return [
			{
				Header: localeUtil.getMsg("ui.common.action"),
				accessor: '_id',
				headerClassName: 'app-grid-header',
				width: 85,
				Cell: c => <ActionCellRenderer data={c.original} ComponentActions={this.props.ComponentActions} />
			}, {
				Header: localeUtil.getMsg("ui.common.applyto"),
				accessor: 'project',
				headerClassName: 'app-grid-header',
				Cell: c => c.value.map(e => getProjectName(e)).join(', '),
			}, {
				Header: 'Key',
				accessor: 'key',
				headerClassName: 'app-grid-header',
			}, ...locales.map(locale => ({
				Header: `${localeUtil.getMsg("ui.common.locale")} / ${locale}`,
				accessor: locale,
				headerClassName: 'app-grid-header',
			})), {
				Header: localeUtil.getMsg("ui.common.desc"),
				accessor: 'description',
				headerClassName: 'app-grid-header',
			}
		];
	}

	render() {
		const minHeight = 200,
			top = 370,
			translations = this.props.translations || [],
			data = this.state.quickFilterText
					? translations.filter(e => JSON.stringify(e).indexOf(this.state.quickFilterText) >= 0)
					: translations,
			windowHeight = this.state.windowHeight ||
					(typeof window === "undefined" ? minHeight + top : window.innerHeight);

		return (
			<Fragment>
				<InputGroup>
					<InputGroup.Addon className="app-search-icon">
						<i className="fas fa-search"/>
					</InputGroup.Addon>
					<FormControl type="text" className="app-search-bar"
						placeholder={localeUtil.getMsg("ui.grid.search")}
						onChange={this.onQuickFilterText}/>
					<InputGroup.Button style={{"paddingLeft": "5px"}}>
						<Button onClick={this.downloadCsv}>
							<i className="fas fa-file-export"/> CSV
						</Button>
					</InputGroup.Button>
				</InputGroup>
				<ReactTable
					data={data}
					columns={this.getColumnDefs()}
					defaultPageSize={25}
					previousText={localeUtil.getMsg("ui.pagination.previous")}
					nextText={localeUtil.getMsg("ui.pagination.next")}
					// loadingText: 'Loading...',
					noDataText={localeUtil.getMsg("ui.grid.empty")}
					pageText={localeUtil.getMsg("ui.pagination.page")}
					ofText={localeUtil.getMsg("ui.pagination.of")}
					rowsText={localeUtil.getMsg("ui.pagination.rows")}
					style={{
						height: `${(windowHeight < (minHeight + top) ? minHeight : windowHeight - top)}px`
					}}
					className='-striped -highlight'
				/>
				<Mask show={!this.props.translations}/>
			</Fragment>
		);
	}
}
