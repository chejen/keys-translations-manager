import TextField from '../../../../src/components/input/TextField'
import FormGroup from 'react-bootstrap/lib/FormGroup'

function setup() {
	let props = {
		name: "key",
		label: "Key"
	}

	return props
}

describe('(component) TextField', () => {
	it('should render as a <FormGroup>', () => {
		const wrapper = shallow(
			<TextField name="key"/>
		)
		expect(wrapper.type()).to.eql(FormGroup);
	});

	describe('child: ControlLabel', () => {
		it("shouldn't have ControlLabel if 'label' prop is not set", () => {
			const label = "Key"
			const wrapper = mount(
				<TextField name="key"/>
			)
			expect(wrapper.find('ControlLabel')).to.have.length(0);
		});

		it("should have a ControlLabel if 'label' prop is set", () => {
			const label = "Key"
			const wrapper = mount(
				<TextField name="key" label={label}/>
			)
			expect(wrapper.find('ControlLabel').text()).to.be.eql(label + ":");
		});

		it("should display asterisk (*) to indicate required field", () => {
			const wrapper = mount(
				<TextField name="key" label="Key" required/>
			)
			expect(wrapper.find('ControlLabel').text().substr(0, 1)).to.be.eql("*");
		});
	});

	describe('child: FormControl', () => {
		it("shouldn't have style if 'value' prop is not set", () => {
			const wrapper = mount(
				<TextField name="key" defaultValue={"ui.test"} required/>
			)
			expect(wrapper.find('FormControl').prop('style')).to.be.empty;
		});

		it("should have a grey background if 'value' prop is set", () => {
			const wrapper = mount(
				<TextField name="key" value={"ui.test"} readOnly required/>
			)
			expect(wrapper.find('FormControl').prop('style')).to.be.eql(
				{backgroundColor: "#e7e7e7"}
			);
		});
	});
});
