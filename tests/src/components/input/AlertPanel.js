import AlertPanel from '../../../../src/components/input/AlertPanel'

function setup() {
	let props = {
			action: "c",
			clearErrors: sinon.spy(),
			errors: [{
				action: "c",
				key: "ui.common.add",
				match: ["p1"],
				origin: null,
				params: {
					"en-US": "Add",
					"key": "ui.common.add",
					"project": ["p1"],
					"zh-TW": "新增"
				},
				type: "equals"
			}]
		},
		wrapper = shallow(<AlertPanel {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) AlertPanel', () => {
	it('should render as a <Alert> with "danger" class', () => {
		const { wrapper } = setup()
		expect(wrapper.props().bsClass).to.eql('alert');
		expect(wrapper.props().bsStyle).to.eql('danger');
	});

	it('should call clearErrors() while dismiss', () => {
		const { props, wrapper } = setup()
		wrapper.props().onDismiss();
		expect(props.clearErrors).calledOnce;
	});

	it('should show error messages', () => {
		const { props, wrapper } = setup()
		expect(wrapper.find('p')).to.have.length(props.errors.length);
	});

	it('should include <br> if the errors caused by creation', () => {
		const props = {
			action: "c",
			clearErrors: sinon.spy(),
			errors: []
		}
		const wrapper = shallow(<AlertPanel {...props}/>)
		expect(wrapper.find('br')).to.have.length(1);
	});
});
