import React from 'react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import TranslationActions from '../../actions/TranslationActions'
export default class ActionCellRenderer extends React.Component {
    removeTranslation(value) {
        TranslationActions.removeTranslation(value); // cell equals _id
    }
    render() {
        const value = this.props.params.value
        console.log("cell", value, this.props.params);

        return (
            <div>
                <Glyphicon glyph="pencil" className="app-action-icon"
                    onClick={this.removeTranslation.bind(this, value)}/>
                <Glyphicon glyph="trash" className="app-action-icon"
                    onClick={this.removeTranslation.bind(this, value)}/>
            </div>
        );
    }
}

ActionCellRenderer.propTypes = {
    params: React.PropTypes.object
};
