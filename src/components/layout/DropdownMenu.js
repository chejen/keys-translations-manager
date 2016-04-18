/*eslint i18n/no-chinese-character: 0*/
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class DropdownMenu extends React.Component {
	static propTypes = {
		lang: React.PropTypes.string.isRequired,
		loadMessages: React.PropTypes.func.isRequired,
		showImportModal: React.PropTypes.func.isRequired
	}

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	loadMessages(lang) {
		if (lang !== this.props.lang) {
			this.props.loadMessages(lang);
		}
	}

	render() {
		return(
			<ul className="nav navbar-top-links navbar-right">
				<li className="dropdown" title={localeUtil.getMsg("ui.common.add")}>
					<a className="dropdown-toggle" href="#" onClick={(event) => {
								if (event) {
									event.preventDefault();
								}
								console.log("test");
								this.props.showImportModal();
							}}>
						<i className="fa fa-cloud-upload fa-fw fa-lg"/>
					</a>
				</li>
				<li className="dropdown" title={localeUtil.getMsg("ui.common.language")}>
					<a className="dropdown-toggle" data-toggle="dropdown" href="#">
						<i className="fa fa-language fa-fw fa-lg"/>
						<i className="fa fa-caret-down"/>
					</a>
					<ul className="dropdown-menu dropdown-user">
						<li><a href="#" onClick={(event) => {
								if (event) {
									event.preventDefault();
								}
								this.loadMessages("en-US");
							}}>
							<i className="fa fa-language fa-fw"/> English (en-US)
						</a></li>
						<li><a href="#" onClick={(event) => {
								if (event) {
									event.preventDefault();
								}
								this.loadMessages("zh-TW");
							}}>
							<i className="fa fa-language fa-fw"/> 繁體中文 (zh-TW)
						</a></li>
					</ul>
				</li>
			</ul>
		);
	}
}
