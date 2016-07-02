import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Tree extends React.Component {
	static propTypes = {
		translations: React.PropTypes.array
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		console.log("test", this.props, this.props.translations);
		return (
			<div>Coming soon ...</div>
		);
	}
}
