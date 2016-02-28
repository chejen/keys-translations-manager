import React from 'react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ConfirmModal from '../ConfirmModal'
import EditModal from '../EditModal'
import TranslationActions from '../../actions/TranslationActions'
export default class ActionCellRenderer extends React.Component {
	showEditModal() {
		this.refs.editModal.open();
	}
	showConfirmModal(value) {
		const data = this.props.params.data;
		this.refs.confirmModal.open("Are you sure you want to delete \"" + data.key + "\" ?", this.removeTranslation.bind(this, value));
	}
	removeTranslation(value) {
		TranslationActions.removeTranslation(value); // cell equals _id
	}
	render() {
		const value = this.props.params.value

		return (
			<div>
				<ConfirmModal ref="confirmModal"/>
				<EditModal ref="editModal" data={this.props.params.data} />
				<Glyphicon glyph="edit" className="app-action-icon" title="Edit"
					onClick={this.showEditModal.bind(this)}/>
				<Glyphicon glyph="trash" className="app-action-icon" title="Delete"
					onClick={this.showConfirmModal.bind(this, value)}/>
			</div>
		);
	}
}

ActionCellRenderer.propTypes = {
	params: React.PropTypes.object
};
