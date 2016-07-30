import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as VisActions from '../actions/vis'
import Tree from '../components/vis/Tree'

const mapDispatchToProps = (dispatch) => ({
	VisActions: bindActionCreators(VisActions, dispatch)
})

const mapStateToProps = (state) => ({
	showtooltip: state.components.showtooltip,
	tooltiptop: state.components.tooltiptop,
	tooltipleft: state.components.tooltipleft,
	treedata: state.vis.treedata
})

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
