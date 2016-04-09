import MainPanel from '../../../../src/components/layout/MainPanel'

function setup() {
	let wrapper = render(<MainPanel>test</MainPanel>)
	return wrapper
}

describe('(component) MainPanel', () => {
	it('should render as a <div> with class "row"', () => {
		const wrapper = setup()
		const child = wrapper.children()[0]
		expect(child.name).to.eql('div');
		expect(child.attribs.class).to.eql('row');
	});

	describe('child: Col', () => {
		it('should have "col-lg-12" class', () => {
			const wrapper = setup()
			const grandchild = wrapper.children()[0].children[0]
			expect(grandchild.attribs.class).to.eql('col-lg-12');
		});
	});
});
