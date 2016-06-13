import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
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
		const num = 10
		const k = Object.keys(this.props.keys).map(key => key)

		return (
			<Modal show={this.props.showmergemodal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						{localeUtil.getMsg("ui.common.merge")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{k.length > 0
						? (<div>
								<b>{localeUtil.getMsg("ui.merge.match")} </b>
									{k.length >= (num + 2)
									? `${k.slice(0, num).join(", ")} ${localeUtil.getMsg("ui.common.others", k.length - num)}`
									: k.join(", ")}
								<br/><br/>
								<b>{localeUtil.getMsg("ui.confirm.continue")}</b>
							</div>)
						: localeUtil.getMsg("ui.merge.nomatch")
					}
				</Modal.Body>
				{k.length > 0 ?
					<Modal.Footer>
						<Button bsSize="small" bsStyle="primary" onClick={this.submit.bind(this)}>
							{localeUtil.getMsg("ui.confirm.yes")}
						</Button>
						<Button bsSize="small" onClick={this.close.bind(this)}>
							{localeUtil.getMsg("ui.confirm.no")}
						</Button>
					</Modal.Footer> :
					<Modal.Footer>
						<Button bsSize="small" bsStyle="primary" onClick={this.close.bind(this)}>
							{localeUtil.getMsg("ui.common.close")}
						</Button>
					</Modal.Footer>
				}
			</Modal>
		);
	}
}
