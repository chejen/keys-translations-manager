import Tooltip from '../../../../src/components/vis/Tooltip'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'

function setup() {
	const props = {
			display: "none",
			top: 0,
			left: 0,
			ComponentActions: {
				hideTooltip: sinon.spy()
			}
		},
		wrapper = shallow(<Tooltip {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) Tooltip', () => {
	it('should render as a <span>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('span');

	});

	it('should call getTimeoutId when mouse over', () => {
		const { wrapper } = setup()
		timingUtil.getTimeoutId = sinon.spy()

		wrapper.find('span').get(0).props.onMouseOver();
		expect(timingUtil.getTimeoutId).calledOnce;
	});

	it('should call setTimeoutId when mouse out', () => {
		const { props, wrapper } = setup()
		timingUtil.setTimeoutId = sinon.spy()

		wrapper.find('span').get(0).props.onMouseOut();
		expect(timingUtil.setTimeoutId).calledOnce;
	});
});
