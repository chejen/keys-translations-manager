import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
//import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class MergeModal extends React.Component {
	static propTypes = {
		keys: React.PropTypes.object.isRequired,
		mergeable: React.PropTypes.array.isRequired,
		showmergemodal: React.PropTypes.bool.isRequired,
		closeMergeModal: React.PropTypes.func.isRequired,
		mergeTranslations: React.PropTypes.func.isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	submit() {
		this.props.mergeTranslations(this.props.mergeable)
	}

	close() {
		this.props.closeMergeModal()
	}

	render() {
		console.log("mergerecord", this.props.keys);
		const num = 10;
		const k = Object.keys(this.props.keys).map(key => key)

		return (
			<Modal show={this.props.showmergemodal} onHide={this.close.bind(this)}>
				<Modal.Body>
					{k.length > 0
						? (<div>
							{"The following key(s) will be merged:"}
							<br/><br/><b>
							{k.length >= (num + 2)
								? `${k.slice(0, num).join(", ")} ${localeUtil.getMsg("ui.common.others", k.length - num)}`
								: k.join(", ")}
							</b><br/><br/>
							{"Are you sure you want to continue?"}
							</div>)
						: "No mergeable records found"
					}
				</Modal.Body>
				{k.length > 0 ?
					<Modal.Footer>
						<Button bsSize="small" bsStyle="primary" onClick={this.submit.bind(this)}>
							{localeUtil.getMsg("ui.common.import")}
						</Button>
						<Button bsSize="small" onClick={this.close.bind(this)}>
							{localeUtil.getMsg("ui.common.cancel")}
						</Button>
					</Modal.Footer> :
					<Modal.Footer>
						<Button bsSize="small" bsStyle="primary" onClick={this.close.bind(this)}>
							Close
						</Button>
					</Modal.Footer>
				}
			</Modal>
		);
	}
}
