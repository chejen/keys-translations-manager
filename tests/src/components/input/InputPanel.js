import InputPanel from '../../../../src/components/input/InputPanel'

function setup() {
	let props = {
			messages: {},
			addTranslation: sinon.spy(),
			alertErrors: sinon.spy()
		},
		context = {
			config: config
		},
		wrapper = shallow(
			<InputPanel {...props}/>,
			{context: context}
		);

	return {
		props,
		context,
		wrapper
	}
}

describe('(component) InputPanel', () => {
	it('should render as a <div>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('div');
	});

	it('should contain an Add button', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').find('Glyphicon').props().glyph).to.eql('plus');
	});

	describe('child: Button', () => {
		it('should call props.alertErrors() if required fields are empty', () => {
			const { props, context } = setup()
			const wrapper = mount(
				<InputPanel {...props}/>,
				{context: context}
			);
			wrapper.find('Button').simulate('click');
			expect(props.alertErrors).calledOnce;
			expect(props.addTranslation.callCount).to.eql(0);
		});
	});
});
