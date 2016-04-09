import Header from '../../../../src/components/layout/Header'

function setup() {
	let wrapper = shallow(<Header/>)
	return wrapper
}

describe('(component) Header', () => {
	it('should render as a <div> with class "navbar-header"', () => {
		const wrapper = setup()
		expect(wrapper.type()).to.eql('div');
		expect(wrapper.hasClass("navbar-header")).to.be.true;
	});

	describe('child: a', () => {
		it('should have "navbar-brand" class', () => {
			const wrapper = setup()
			expect(wrapper.find("a").hasClass("navbar-brand")).to.be.true;
		});
	});
});
