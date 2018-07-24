/*eslint i18n/no-chinese-character: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const DropdownMenu = ({ lang, loadMessages, showImportModal, findMergeable }) => {
	const loadMsg = ln => {
		if (ln !== lang) {
			loadMessages(ln);
		}
	}
	return (
		<ul className="nav navbar-top-links navbar-right">
			<li className="dropdown" title={localeUtil.getMsg("ui.common.import")}>
				<a className="dropdown-toggle" href="#" onClick={event => {
					if (event) {
						event.preventDefault();
					}
					showImportModal();
				}}>
					<i className="fa fa-file-import fa-fw fa-lg"/>
				</a>
			</li>
			<li className="dropdown" title={localeUtil.getMsg("ui.common.merge")}>
				<a className="dropdown-toggle" href="#" onClick={event => {
					if (event) {
						event.preventDefault();
					}
					findMergeable();
				}}>
					<i className="fas fa-share-alt fa-flip-horizontal fa-fw fa-lg"/>
				</a>
			</li>
			<li className="dropdown" title={localeUtil.getMsg("ui.common.language")}>
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">
					<i className="fas fa-globe fa-fw fa-lg"/>
					{' '}
					<i className="fa fa-caret-down"/>
				</a>
				<ul className="dropdown-menu dropdown-user">
					<li><a href="#" onClick={event => {
							if (event) {
								event.preventDefault();
							}
							loadMsg("en-US");
						}}>
						<i className="fas fa-globe-americas fa-fw"/> English (en-US)
					</a></li>
					<li><a href="#" onClick={event => {
							if (event) {
								event.preventDefault();
							}
							loadMsg("zh-TW");
						}}>
						<i className="fas fa-globe-asia fa-fw"/> 繁體中文 (zh-TW)
					</a></li>
				</ul>
			</li>
		</ul>
	);
};

DropdownMenu.propTypes = {
	lang: PropTypes.string.isRequired,
	loadMessages: PropTypes.func.isRequired,
	showImportModal: PropTypes.func.isRequired,
	findMergeable: PropTypes.func.isRequired
};

export default DropdownMenu
