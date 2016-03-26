import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ConfirmModal from './ConfirmModal'
//import EditModal from '../input/EditModal'
//import TranslationActions from '../../actions/TranslationActions'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class ActionCellRenderer extends React.Component {
	static propTypes = {
		params: React.PropTypes.object
	}
	static childContextTypes = {
		config: React.PropTypes.object
	}
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getChildContext() {
		return { config: this.props.params.context.config }
	}
	showEditModal(data) {
		//this.refs.editModal.open();
		console.log("showEditModal", data);
		this.props.params.context.showEditModal(data)
	}
	showConfirmModal(value) {
		const data = this.props.params.data;
		this.refs.confirmModal.open(
			localeUtil.getMsg("ui.common.delete"),
			localeUtil.getMsg("ui.confirm.delete", data.key),
			this.removeTranslation.bind(this, value)
		);
	}
	removeTranslation(value) {
		//TranslationActions.removeTranslation(value); // cell equals _id
		this.props.params.context.removeTranslation(value);
	}
	render() {
		const { data, value } = this.props.params
		//const { errors, updateTranslation, alertErrors, clearErrors } = this.props.params.context
		//console.log("this.props.errors-actioncellrender", errors);
		return (
			<div>
				<ConfirmModal ref="confirmModal"/>
				{/*<EditModal ref="editModal" data={data} errors={errors}
					updateTranslation={updateTranslation}
					alertErrors={alertErrors}
					clearErrors={clearErrors}/>*/}
				<Glyphicon glyph="edit" className="app-action-icon" title={localeUtil.getMsg("ui.common.edit")}
					onClick={this.showEditModal.bind(this, data)}/>
				<Glyphicon glyph="trash" className="app-action-icon" title={localeUtil.getMsg("ui.common.delete")}
					onClick={this.showConfirmModal.bind(this, value)}/>
			</div>
		);
	}
}
