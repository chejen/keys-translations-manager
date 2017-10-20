import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/lib/Alert'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'

const getProjectName = configUtil.getProjectName
const num = 3

const AlertPanel = ({ clearErrors, errors, action }) => {
	const len = errors.length;
	let err,
		errMsg = [],
		cmp,
		i,
		counter = 0;

	for (i=0; i<len; i++) {
		err = errors[i];
		if (err.action !== action) {
			break;
		}

		switch (err.type) {
			case 'equals':
				errMsg.push(localeUtil.getMsg("ui.err.equals", err.params.key,
					err.match.map(function(e){
						return `"${getProjectName(e)}"`
					}).join(", ")
				));
				break;
			case 'contains':
				errMsg.push(localeUtil.getMsg("ui.err.contains", err.params.key, err.key,
					err.match.map(function(e){
						return `"${getProjectName(e)}"`
					}).join(", ")
				));
				break;
			case 'belongsTo':
				errMsg.push(localeUtil.getMsg("ui.err.belongsTo", err.params.key, err.key,
					err.match.map(function(e){
						return `"${getProjectName(e)}"`
					}).join(", ")
				));
				break;
			case 'emptyfield':
				errMsg.push(localeUtil.getMsg("ui.err.emptyfield",
					err.match.map(function(e){
						return `"${e}"`
					}).join(", ")
				));
				break;
			case 'accept':
				errMsg.push(
					localeUtil.getMsg("ui.file.accept",
						err.match.map(function(e){
						return `*.${e}`
					}).join(` ${localeUtil.getMsg("ui.common.or")} `)
				));
				break;
			case 'iequals':
			case 'iconflicts':
				errMsg.push(
					<span>
						{localeUtil.getMsg("ui.err." + err.type)}
						&nbsp;
						<OverlayTrigger placement="top" overlay={<Tooltip id={"tooltip" + i}>{localeUtil.getMsg("ui.tip." + err.type)}</Tooltip>}>
							<i className="fa fa-info-circle" style={{color:"black"}}/>
						</OverlayTrigger>
						<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{err.key.length >= (num + 2)
							? `${err.key.slice(0, num).join(", ")} ${localeUtil.getMsg("ui.common.others", err.key.length - num)}`
							: err.key.join(", ")
						}
					</span>
				);
				break;
			default:
				errMsg.push(err.type);
				break;
		}
	}

	cmp = (errMsg.length > 0) ? (<Alert bsStyle="danger" onDismiss={clearErrors}>
			{errMsg.map(function(e){
				return <p key={counter++}><Glyphicon glyph="alert"/> {e}</p>
			})}
		</Alert>) : (action === "c" ? <br/> : null);

	return cmp;
}

AlertPanel.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	errors: PropTypes.array,
	action: PropTypes.string.isRequired
};

export default AlertPanel
