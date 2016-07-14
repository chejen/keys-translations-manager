import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import * as ComponentActions from '../actions/components'
import * as VisActions from '../actions/vis'
import Tree from '../components/vis/Tree'

const mapDispatchToProps = (dispatch) => ({
	//ComponentActions: bindActionCreators(ComponentActions, dispatch),
	VisActions: bindActionCreators(VisActions, dispatch)
})

const mapStateToProps = (state) => ({
	treedata: state.vis.treedata
})

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
