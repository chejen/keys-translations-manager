import InputPanel from '../../../../src/components/input/InputPanel'

function setup() {
	const props = {
			messages: {},
			addTranslation: sinon.spy(),
			alertErrors: sinon.spy()
		},
		wrapper = shallow(<InputPanel {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) InputPanel', () => {
	it('should be wrapped by React.Fragment', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(React.Fragment);
	});

	it('should contain an Add button', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').find('Glyphicon').props().glyph).to.eql('plus');
	});

	describe('child: Button', () => {
		it('should call props.alertErrors() if required fields are empty', () => {
			const { props } = setup()
			const wrapper = mount(<InputPanel {...props}/>);
			wrapper.find('Button').simulate('click');
			expect(props.alertErrors).calledOnce;
			expect(props.addTranslation.callCount).to.eql(0);
		});
	});
});
