import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import * as ComponentActions from '../actions/components'
import * as TranslationActions from '../actions/translations'
import TablePanel from '../components/grid/TablePanel'

const mapDispatchToProps = (dispatch) => ({
	//ComponentActions: bindActionCreators(ComponentActions, dispatch),
	TranslationActions: bindActionCreators(TranslationActions, dispatch)
})

const mapStateToProps = (/*state*/) => ({
//	translations: state.translations
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePanel)
