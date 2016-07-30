import Tooltip from '../../../../src/components/vis/Tooltip'

function setup() {
	Tooltip.prototype.onMouseOver = sinon.spy()
	Tooltip.prototype.onMouseOut = sinon.spy()

	const props = {
			display: "none",
			top: 0,
			left: 0
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

		wrapper.find('span').get(0).props.onMouseOver();
		expect(Tooltip.prototype.onMouseOver).calledOnce;

		wrapper.find('span').get(0).props.onMouseOut();
		expect(Tooltip.prototype.onMouseOut).calledOnce;
	});
});
