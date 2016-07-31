import OutputPanel from '../../../../src/components/output/OutputPanel'
import CountCol from '../../../../src/components/output/CountCol'

function setup() {
	OutputPanel.prototype.download = sinon.spy()
	OutputPanel.prototype.setFileType = sinon.spy()

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
		config,
		wrapper
	}
}

describe('(component) OutputPanel', () => {
	it('should render as a <Well>', () => {
		const { wrapper } = setup()
		expect(wrapper.props().bsClass).to.eql('well');
	});

	it('should have CountCol(s)', () => {
		const { wrapper, config } = setup()
		expect(wrapper.find('CountCol')).to.have.length(config.projects.length);
	});

	it('should have 3 radio buttons', () => {
		const { wrapper } = setup()
		expect(wrapper.find('input[type="radio"]')).to.have.length(3);
	});

	describe('child: CountCol', () => {
		it('should call download() when clicked', () => {
			const { wrapper } = setup()
			wrapper.find('CountCol').get(0).props.onClick();
			expect(OutputPanel.prototype.download).calledOnce;
		});
	});

	describe('child: input', () => {
		it('should call setFileType() when clicked', () => {
			const { wrapper } = setup()
			wrapper.find('input[type="radio"]').last().simulate('change',{ target: { value: "p" } });
			expect(OutputPanel.prototype.setFileType).calledOnce;
		});
	});
});
