import ConfirmModal from '../../../../src/components/grid/ConfirmModal'
import Modal from 'react-bootstrap/lib/Modal'

function setup() {
	const props = {
			showconfirmmodal: false,
			data: {},
			closeConfirmModal: sinon.spy(),
			removeTranslation: sinon.spy(),
		},
		wrapper = shallow(<ConfirmModal {...props} />);

	return {
		props,
		wrapper
	}
}

describe('(component) ConfirmModal', () => {
	it('should render as a <Modal>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(Modal);
	});

	it('should contain a "Yes" button with "primary" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').first().props().bsStyle).to.eql('primary');
	});

	it('should contain a "No" button with "default" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').last().props().bsStyle).to.eql('default');
	});

	it('should be opened if showconfirmmodal is set true', () => {
		const { wrapper } = setup()
		wrapper.setProps({ showconfirmmodal: true });
		expect(wrapper.prop('show')).to.be.true;
	});

	describe('child: "Yes" button', () => {
		it('should call state.confirmFunc() if clicked', () => {
			const { wrapper, props } = setup()
			wrapper.find('Button').first().simulate('click');
			expect(props.removeTranslation).calledOnce;
		});
	});

	describe('child: "No" button', () => {
		it('should close Modal if clicked', () => {
			const { wrapper, props } = setup()
			wrapper.find('Button').last().simulate('click');
			expect(props.closeConfirmModal).calledOnce;
		});
	});
});
