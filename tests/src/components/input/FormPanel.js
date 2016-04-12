import FormPanel from '../../../../src/components/input/FormPanel'

function setup() {
	let props = {},
		context = {
			config: config
		};

	return {
		props,
		context
	}
}

describe('(component) FormPanel', () => {
	it('should render as a <form>', () => {
		const { props, context } = setup()
		const wrapper = shallow(
			<FormPanel {...props}/>,
			{context: context}
		)
		expect(wrapper.type()).to.eql('form');
	});

	it('should contain <input>s', () => {
		const { props, context } = setup()
		const wrapper = shallow(
			<FormPanel {...props}/>,
			{context: context}
		)
		expect(wrapper.find('Input[type="text"]')).to.have.length(context.config.locales.length + 1);
		expect(wrapper.find('Input[type="checkbox"]')).to.have.length(context.config.projects.length);
	});

	it('should have ".app-checkbox-options" class in create mode', () => {
		const { props, context } = setup()
		const wrapper = shallow(
			<FormPanel {...props}/>,
			{context: context}
		)
		expect(wrapper.find(".app-checkbox-options")).to.have.length(1);
	});

	it('should have "background-color" style in edit mode', () => {
		const data = {
			"_id": "56d7037a0b70e760104ddf10",
			"en-US": "Edit",
			"key": "ui.common.edit",
			"project": ["p1"],
			"zh-TW": "編輯"
		}
		const { context } = setup()
		const wrapper = shallow(
			<FormPanel data={data}/>,
			{context: context}
		)
		expect(wrapper.find('Input').first().html().indexOf("background-color") > 0).to.be.true;
	});

	describe('child: Input[type="text"], key="key" (edit mode)', () => {
		it('should call onInputChange() if text changed', () => {
			FormPanel.prototype.onInputChange = sinon.spy()
			const data = {
				"_id": "56d7037a0b70e760104ddf10",
				"en-US": "Edit",
				"key": "ui.common.edit",
				"project": ["p1"],
				"zh-TW": "編輯"
			}
			const { context } = setup()
			const wrapper = mount(
				<FormPanel data={data}/>,
				{context: context}
			)
			wrapper.find('input[type="text"]').first().simulate('change',{ target: { value: "ui.test" } });
			expect(FormPanel.prototype.onInputChange).calledOnce;
		});
	});

	describe('child: textarea, key="description"', () => {
		it('should call onInputChange() if text changed', () => {
			FormPanel.prototype.onInputChange = sinon.spy()
			const data = {
				"_id": "56d7037a0b70e760104ddf10",
				"en-US": "Edit",
				"description": "edit",
				"key": "ui.common.edit",
				"project": ["p1"],
				"zh-TW": "編輯"
			}
			const { context } = setup()
			const wrapper = mount(
				<FormPanel data={data}/>,
				{context: context}
			)
			expect(wrapper.find('textarea').first().text()).to.eql('edit');
		});
	});

	describe('child: Input[type="checkbox"]', () => {
		it('should call onCheckboxChange() if checked/unchecked', () => {
			FormPanel.prototype.onCheckboxChange = sinon.spy()
			const { context } = setup()
			const wrapper = mount(
				<FormPanel data={null}/>,
				{context: context}
			)
			wrapper.find('input[type="checkbox"]').last().simulate('change',{ target: { checked: false } });
			expect(FormPanel.prototype.onCheckboxChange).calledOnce;
		});
	});
});
