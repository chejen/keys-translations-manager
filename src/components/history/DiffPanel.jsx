import React from 'react'
import PropTypes from 'prop-types'
import { getLocales, getProjectName } from '../../configUtil'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const locales = getLocales()

function addLeadingZeros(value) {
	return ('0' + value).slice(-2)
}

function formatDateTime(timestamp) {
	const d = new Date(timestamp)
	const MM = addLeadingZeros(d.getMonth() + 1)
	const dd = addLeadingZeros(d.getDate())
	const HH = addLeadingZeros(d.getHours())
	const mm = addLeadingZeros(d.getMinutes())
	const ss = addLeadingZeros(d.getSeconds())
	const formattedDate = `${d.getFullYear()}-${MM}-${dd}`
	const formattedTime = `${HH}:${mm}:${ss}`
	return `${formattedDate} ${formattedTime} `
}

function getActionName(action) {
	if (['ADD', 'EDIT', 'DELETE', 'IMPORT', 'MERGE'].indexOf(action) >= 0) {
		const a = action.toLowerCase()
		return localeUtil.getMsg(`ui.history.${a}`);
	}
	return action;
}

function getProjectNames(projects) {
	return projects.map(e => getProjectName(e)).join(', ')
}

function getRow(field, name, comparison) {
	const row = []
	if (comparison.original) {
		return (
			<tr key={`ori-${field}`} className="app-diff-row-ori">
				<td>{name}</td>
				<td />
				<td>{comparison.original}</td>
			</tr>
		)
	}
	if (comparison.deletion) {
		row.push(
			<tr key={`del-${field}`} className="app-diff-row-del">
				<td>{name}</td>
				<td> - </td>
				<td>{comparison.deletion}</td>
			</tr>
		)
	}
	if (comparison.addition) {
		row.push(
			<tr key={`add-${field}`} className="app-diff-row-add">
				<td>{name}</td>
				<td> + </td>
				<td>{comparison.addition}</td>
			</tr>
		)
	}
	return row
}

function getProjectRow(name, comparison) {
	const c = {}
	if (comparison.original) {
		c.original = getProjectNames(comparison.original)
	}
	if (comparison.deletion) {
		c.deletion = getProjectNames(comparison.deletion)
	}
	if (comparison.addition) {
		c.addition = getProjectNames(comparison.addition)
	}
	return getRow('project', name, c)
}

export default class DiffPanel extends React.PureComponent {
	static propTypes = {
		log: PropTypes.object.isRequired,
	}

	constructor() {
		super();
		this.state = {
			display: true,
		};
		this.displayHandler = this.displayHandler.bind(this);
	}

	displayHandler() {
		this.setState({
			display: !this.state.display
		});
	}

	render() {
		const { time, action, user, diff } = this.props.log
		const { display } = this.state

		return (
			<div className="app-diff-container">
				<div className="app-diff-title">
					<i
						className={`fas fa-chevron-${display ? 'down' : 'up'} app-diff-collapse`}
						onClick={this.displayHandler}
					/>
					<div>
						<b>{getActionName(action)}</b>
						{` ${localeUtil.getMsg('ui.history.at')} `}
						<b>{formatDateTime(time)}</b>

						{user && (
							<span style={{ color: 'gray' }}>
								{` (${localeUtil.getMsg('ui.history.modifier')}: ${user})`}
							</span>
						)}
					</div>
				</div>
				<table className="app-diff-table" style={{ display: display ? 'table' : 'none' }}>
					<tbody>
					{diff.project && getProjectRow(localeUtil.getMsg('ui.common.applyto'), diff.project)}
					{diff.key && getRow('key', 'Key', diff.key)}
					{locales.map(el =>
						diff[el] && getRow(el, el, diff[el])
					)}
					{diff.description && getRow('description', localeUtil.getMsg('ui.common.desc'), diff.description)}
					</tbody>
				</table>
			</div>
		);
	}
}
