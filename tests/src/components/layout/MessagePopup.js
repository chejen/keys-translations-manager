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
	it('should render as a <div> with "app-message-popup" class', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('div');
		expect(wrapper.prop('className')).to.eql('app-message-popup');
	});

	it('should have a child with "app-message-bar" class', () => {
		const { wrapper } = setup()
		expect(wrapper.childAt(0).prop('className')).to.eql('app-message-bar');
	});

	it('should show message and contain child nodes', () => {
		const { wrapper } = setup()
		expect(wrapper.children('.app-message-bar').contains("Test Message")).to.be.true;
		expect(wrapper.children('.app-message-bar').contains(<b>clild</b>)).to.be.true;
	});

	it('should call this.props.closeMessagePopup() if the close icon clicked', () => {
		const { props, wrapper } = setup()
		wrapper.find('i').get(0).props.onClick();
		expect(props.closeMessagePopup).calledOnce;
	});

});
