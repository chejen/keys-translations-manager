/*eslint i18n/no-chinese-character: 0*/
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//import LangActions from '../../actions/LangActions'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class DropdownMenu extends React.Component {
	static propTypes = {
		switchLang: React.PropTypes.func.isRequired
	}

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { switchLang } = this.props;
		return(
			<ul className="nav navbar-top-links navbar-right" title={localeUtil.getMsg("ui.common.language")}>
				<li className="dropdown">
					<a className="dropdown-toggle" data-toggle="dropdown" href="#">
						<i className="fa fa-language fa-fw fa-lg"/>
						<i className="fa fa-caret-down"/>
					</a>
					<ul className="dropdown-menu dropdown-user">
						<li><a href="#" onClick={(event) => {
								event.preventDefault();
								//LangActions.switch("en-US");
								switchLang("en-US");
							}}>
							<i className="fa fa-language fa-fw"/> English (en-US)
						</a></li>
						<li><a href="#" onClick={(event) => {
								event.preventDefault();
								//LangActions.switch("zh-TW");
								switchLang("zh-TW");
							}}>
							<i className="fa fa-language fa-fw"/> 繁體中文 (zh-TW)
						</a></li>
					</ul>
				</li>
			</ul>
		);
	}
}
