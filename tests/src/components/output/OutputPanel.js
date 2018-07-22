import OutputPanel from '../../../../src/components/output/OutputPanel'

function setup() {
	OutputPanel.prototype.download = sinon.spy()
	OutputPanel.prototype.setFileType = sinon.spy()

	const props = {
			projectCounts: {
				p1: 10,
				p2: 5
			}
		},
		wrapper = shallow(<OutputPanel {...props}/>);

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

	it('should have CountCol(s)', () => {
		const { wrapper } = setup()
		expect(wrapper.find('CountCol')).to.have.length(configUtil.getProjects().length);
	});

	it('should have 5 FileTypeCols', () => {
		const { wrapper } = setup()
		expect(wrapper.find('FileTypeCol')).to.have.length(5);
	});

	describe('child: CountCol', () => {
		it('should call download() when clicked', () => {
			const { wrapper } = setup()
			wrapper.find('CountCol').get(0).props.onClick();
			expect(OutputPanel.prototype.download).calledOnce;
		});
	});

	describe('child: FileTypeCol', () => {
		it('should call setFileType() when changed', () => {
			const { wrapper } = setup()
			wrapper.find('FileTypeCol').get(0).props.onChange();
			expect(OutputPanel.prototype.setFileType).calledOnce;
		});
	});
});
