import OutputPanel from '../../../../src/components/output/OutputPanel'

function setup() {
	const props = {
			projectCounts: {
				p1: 10,
				p2: 5
			}
		},
		context = {
			config: config
		},
		wrapper = shallow(
			<OutputPanel {...props}/>,
			{context: context}
		);

	return {
		props,
		wrapper
	}
}

describe('(component) OutputPanel', () => {
	it('should render as a <Well>', () => {
		const { wrapper } = setup()
		expect(wrapper.props().bsClass).to.eql('well');
	});

	it('should have 3 radio buttons', () => {
		const { wrapper } = setup()
		expect(wrapper.find('input[type="radio"]')).to.have.length(3);
	});
});
