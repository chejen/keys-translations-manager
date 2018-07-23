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
					<i className="fa fa-cloud-upload fa-fw fa-lg"/>
				</a>
			</li>
			<li className="dropdown" title={localeUtil.getMsg("ui.common.merge")}>
				<a className="dropdown-toggle" href="#" onClick={event => {
					if (event) {
						event.preventDefault();
					}
					findMergeable();
				}}>
					<i className="fa fa-code-fork fa-flip-vertical fa-fw fa-lg"/>
				</a>
			</li>
			<li className="dropdown" title={localeUtil.getMsg("ui.common.language")}>
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">
					<i className="fa fa-language fa-fw fa-lg"/>
					<i className="fa fa-caret-down"/>
				</a>
				<ul className="dropdown-menu dropdown-user">
					<li><a href="#" onClick={event => {
							if (event) {
								event.preventDefault();
							}
							loadMsg("en-US");
						}}>
						<i className="fa fa-language fa-fw"/> English (en-US)
					</a></li>
					<li><a href="#" onClick={event => {
							if (event) {
								event.preventDefault();
							}
							loadMsg("zh-TW");
						}}>
						<i className="fa fa-language fa-fw"/> 繁體中文 (zh-TW)
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
