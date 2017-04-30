import FileTypeCol from '../../../../src/components/output/FileTypeCol'
import Col from 'react-bootstrap/lib/Col'

function setup() {
	const props = {
			value: 'p',
			label: 'Properties',
			fileType: 'nj', //nested JSON is selected
			onChange: sinon.spy()
		},
		wrapper = shallow(<FileTypeCol {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) FileTypeCol', () => {
	it('should render as a <Col>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(Col);
	});

	describe('child: input', () => {
		it('should render as an <input>', () => {
			const { wrapper } = setup()
			expect(wrapper.props().children[0].type).to.eql('input');
		});

		it('should call onChange() if it is changed', () => {
			const { props, wrapper } = setup()
			wrapper.find('input[type="radio"]').last().simulate('change',{ target: { value: "p" } });
			expect(props.onChange).calledOnce;
		});
	});
});
