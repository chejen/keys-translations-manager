import MessagePopup from '../../../../src/components/layout/MessagePopup'

function setup() {
	let props = {
			msg: 'Test Message',
			showmessagepopup: true,
			closeMessagePopup: sinon.spy()
		},
		wrapper = shallow(
			<MessagePopup {...props}>
				<b>clild</b>
			</MessagePopup>
		);

	return {
		props,
		wrapper
	}
}

describe('(component) MessagePopup', () => {
	it('should render as a <div>', () => {
		const { wrapper } = setup()
		console.log(wrapper);
		expect(wrapper.type()).to.eql('div');
	});

	it('should call this.props.closeMessagePopup() if the close icon clicked', () => {
		const { props, wrapper } = setup()
		wrapper.find('i').get(0).props.onClick();
		expect(props.closeMessagePopup).calledOnce;
	});
});
