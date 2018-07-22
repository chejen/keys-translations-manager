import FormPanel from '../../../../src/components/input/FormPanel'

function setup() {
	const props = {}
	return {
		props,
	}
}

describe('(component) FormPanel', () => {
	it('should render as a <form>', () => {
		const { props } = setup()
		const wrapper = shallow(<FormPanel {...props}/>)
		expect(wrapper.type()).to.eql('form');
	});

	it('should contain TextFields and checkboxes', () => {
		const { props } = setup()
		const wrapper = shallow(<FormPanel {...props}/>)
		expect(wrapper.find('TextField[required]')).to.have.length(configUtil.getLocales().length + 1);
		expect(wrapper.find('TextField[componentClass="textarea"]')).to.have.length(1);
		expect(wrapper.find('Checkbox')).to.have.length(configUtil.getProjects().length);
	});

	it('should have ".app-checkbox-options" class in create mode', () => {
		const { props } = setup()
		const wrapper = shallow(<FormPanel {...props}/>)
		expect(wrapper.find(".app-checkbox-options")).to.have.length(1);
	});

	it("should have no value set in create mode", () => {
		const { props } = setup()
		const wrapper = shallow(<FormPanel {...props}/>)
		expect(wrapper.find('TextField[name="key"]').prop("value")).to.be.undefined;
		expect(wrapper.find('TextField[name="en-US"]').prop("defaultValue")).to.be.empty;
		expect(wrapper.find('TextField[name="zh-TW"]').prop("defaultValue")).to.be.empty;
		expect(wrapper.find('TextField[name="description"]').prop("defaultValue")).to.be.undefined;
		expect(wrapper.find('Checkbox[value="p1"]').prop("checked")).to.be.false;
	});

	it("should have readonly 'key' field in edit mode", () => {
		const data = {
			"_id": "56d7037a0b70e760104ddf10",
			"description": "some description",
			"en-US": "Edit",
			"key": "ui.common.edit",
			"project": ["p2"],
			"zh-TW": "編輯"
		}
		const wrapper = shallow(<FormPanel data={data}/>)
		expect(wrapper.find('TextField[name="key"]').prop("readOnly")).to.be.true;
	});

	it("should have values set in edit mode", () => {
		const data = {
			"_id": "56d7037a0b70e760104ddf10",
			"description": "some description",
			"en-US": "Edit",
			"key": "ui.common.edit",
			"project": ["p2"],
			"zh-TW": "編輯"
		}
		const wrapper = shallow(<FormPanel data={data}/>)
		expect(wrapper.find('TextField[name="key"]').prop("value")).to.be.eql("ui.common.edit");
		expect(wrapper.find('TextField[name="en-US"]').prop("defaultValue")).to.be.eql("Edit");
		expect(wrapper.find('TextField[name="zh-TW"]').prop("defaultValue")).to.be.eql("編輯");
		expect(wrapper.find('TextField[name="description"]').prop("defaultValue")).to.be.eql("some description");
		expect(wrapper.find('Checkbox[value="p1"]').prop("checked")).to.be.false;
	});

	describe('child: input[type="checkbox"]', () => {
		it('should call onCheckboxChange() if checked/unchecked', () => {
			FormPanel.prototype.onCheckboxChange = sinon.spy()
			const wrapper = mount(<FormPanel data={null}/>)
			wrapper.find('input[type="checkbox"]').last().simulate('change',{ target: { checked: false } });
			expect(FormPanel.prototype.onCheckboxChange).calledOnce;
		});
	});
});
