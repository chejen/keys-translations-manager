import React from 'react'
import PropTypes from 'prop-types'
import { getLocales, getProjectName } from '../../configUtil'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const locales = getLocales()

function formatDateTime(timestamp) {
	const d = new Date(timestamp)
	const formattedDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
	const formattedTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
	return `${formattedDate}, ${formattedTime} `
}

function getActionName(action) {
	switch (action) {
		case 'ADD':
			return localeUtil.getMsg('ui.common.add');
		case 'EDIT':
			return localeUtil.getMsg('ui.common.edit');
		case 'DELETE':
			return localeUtil.getMsg('ui.common.delete');
		case 'IMPORT':
			return localeUtil.getMsg('ui.common.import');
		case 'MERGE':
			return localeUtil.getMsg('ui.common.merge');
		default:
			return action;
	}
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
						{' at '}
						<b>{formatDateTime(time)}</b>

						{user && (
							<span>
								{' by '}
								{user}
								jkporqwenpobnqepoihqerhourgnopbobhpghqre@gmail.com
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
