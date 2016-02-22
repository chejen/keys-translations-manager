import '../app.less';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import TranslationActions from '../actions/TranslationActions'

const TranslationTable = React.createClass({
	mixins: [PureRenderMixin],

	onAfterSaveCell(row){
		TranslationActions.updateTranslation(row);
	},

	removeTranslation(cell) {
		TranslationActions.removeTranslation(cell); // cell equals _id
	},

	idFormatter(cell) {
		return (
			<div>
				<Glyphicon glyph="pencil" className="app-action-icon"
					onClick={this.removeTranslation.bind(this, cell)}/>
				<Glyphicon glyph="trash" className="app-action-icon"
					onClick={this.removeTranslation.bind(this, cell)}/>
			</div>
		);
	},

	projectFormatter(cell) {
		var l = cell.length,
			i,
			project = [];
		for (i = 0; i < l; i++) {
			project.push( this.props.projectMapping[cell[i]] );
		}
		return project.join(", ");
	},

	render() {
		const config = this.props.config
		const locales = config.locales
		let tableHeaderColumns = [<TableHeaderColumn key="key" dataField="key" editable={false}>key</TableHeaderColumn>]

		locales.forEach(function(locale) {
			tableHeaderColumns.push(<TableHeaderColumn key={locale} dataField={locale}>{locale}</TableHeaderColumn>)
		});
		tableHeaderColumns.push(<TableHeaderColumn key="project" dataField={"project"} dataFormat={this.projectFormatter} editable={false}>apply to</TableHeaderColumn>,
								<TableHeaderColumn key="_id" dataField="_id" dataFormat={this.idFormatter} isKey={true}>actions</TableHeaderColumn>)

		return(
			<BootstrapTable data={this.props.translations}
							/*cellEdit={{
								mode: "dbclick",
								blurToSave: true,
								afterSaveCell: this.onAfterSaveCell
							}}*/
							striped={true}
							hover={true}
							condensed={true}
							search={true}
							searchPlaceholder={"Search..."}
							options={{noDataText: "No data to display"}}
							height="120">
				{tableHeaderColumns}
			</BootstrapTable>
		);
	}
})

module.exports = TranslationTable
