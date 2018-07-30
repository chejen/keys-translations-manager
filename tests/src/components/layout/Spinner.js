import Spinner from '../../../../src/components/layout/Spinner'

function setup() {
	const wrapper = shallow(<Spinner/>)
	return wrapper
}

describe('(component) Spinner', () => {
	it('should render as a styled <div>', () => {
		const wrapper = setup()
		expect(wrapper.type()).to.eql('div');
		expect(wrapper.prop('style')).to.have.property('textAlign');
	});

	describe('child: i', () => {
		it('should have an icon font', () => {
			const wrapper = setup()
			expect(wrapper.find("i").hasClass("fa-spinner")).to.be.true;
		});
	});
});
