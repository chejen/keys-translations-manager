import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import ReactTable from "react-table"
import debounce from 'lodash/debounce';
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import ActionCellRenderer from './ActionCellRenderer'
import Mask from '../layout/Mask'
import { getLocales, getProjectName } from '../../configUtil'
import ProjectFilter from './ProjectFilter'

const locales = getLocales()
export default class TablePanel extends React.PureComponent {
	static propTypes = {
		reloaddata: PropTypes.bool,
		messages: PropTypes.object,
		CountActions: PropTypes.object.isRequired,
		TranslationActions: PropTypes.object.isRequired,
		ComponentActions: PropTypes.object.isRequired,
		translations: PropTypes.array,
		currentRelease: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			quickFilterText: null,
			projectFilter: [],
			windowHeight: 0
		};

		//https://gist.github.com/Restuta/e400a555ba24daa396cc
		this.handleResize = this.handleResize.bind(this);
		this.debounceResize = debounce(this.handleResize, 150);
		this.onQuickFilterText = this.onQuickFilterText.bind(this);
		this.onSelectProejct = this.onSelectProejct.bind(this);
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

	onSelectProejct(selectedList) {
		const projectFilter = selectedList ? selectedList.map(el => el.value) : [];
		this.setState({ projectFilter })
	}

	downloadCsv() {
		let url = `/api/${this.props.currentRelease}/download/csv`

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
			windowHeight = this.state.windowHeight ||
					(typeof window === "undefined" ? minHeight + top : window.innerHeight);
		
		const filterByProject = this.state.projectFilter.length
							? translations.filter(e => e.project.some(p => this.state.projectFilter.includes(p)))
							: translations;

		const data = this.state.quickFilterText
					? filterByProject.filter(e => new RegExp(this.state.quickFilterText, 'i').test(JSON.stringify(e)))
					: filterByProject;
		return (
			<Fragment>
				<div className="app-toolbar">
					<div style={{flex: 2, marginRight: 4}}>
						<FormControl
							type="text"
							className="app-search-bar"
							placeholder={localeUtil.getMsg("ui.grid.search")}
							onChange={this.onQuickFilterText}
						/>
					</div>
					<div style={{flex: 2}}>
						<ProjectFilter onChange={this.onSelectProejct} />
					</div>
					<Button onClick={this.downloadCsv}>
						<i className="fas fa-download"/> CSV
					</Button>
				</div>


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
