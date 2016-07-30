import Sidebar from '../../../../src/components/layout/SideBar'

function setup() {
	const wrapper = shallow(<Sidebar>test</Sidebar>)
	return wrapper
}

describe('(component) SideBar', () => {
	it('should render as a <div>', () => {
		const wrapper = setup()
		expect(wrapper.type()).to.eql('div');
	});

	describe('child: li', () => {
		it('should have "sidebar-search" class', () => {
			const wrapper = setup()
			expect(wrapper.find("li").hasClass("sidebar-search")).to.be.true;
		});
	});
});
