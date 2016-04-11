import EditModal from '../../../../src/components/input/EditModal'
import Modal from 'react-bootstrap/lib/Modal'

function setup() {
	EditModal.prototype.updateTranslation = sinon.spy()
	let props = {
			showeditmodal: true,
			closeEditModal: sinon.spy(),
			data: {
				"_id": "56d7037a0b70e760104ddf10",
				"en-US": "Edit",
				"key": "ui.common.edit",
				"project": ["p1"],
				"zh-TW": "編輯"
			},
			errors: [],
			updateTranslation: sinon.spy(),
			alertErrors: sinon.spy(),
			clearErrors: sinon.spy()
		},
		context = {
			config: config
		},
		wrapper = shallow(
			<EditModal {...props}/>,
			{context: context}
		);

	return {
		props,
		context,
		wrapper
	}
}

describe('(component) EditModal', () => {
	it('should render as a <Modal>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(Modal);
	});

	it('should contain <AlertPanel>', () => {
		const { wrapper } = setup()
		expect(wrapper.find('AlertPanel')).to.have.length(1);
	});

	it('should contain <FormPanel>', () => {
		const { wrapper } = setup()
		expect(wrapper.find('FormPanel')).to.have.length(1);
	});

	it('should contain a Confirm button with "primary" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').first().props().bsStyle).to.eql('primary');
	});

	it('should contain a Dismiss button with "default" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').last().props().bsStyle).to.eql('default');
	});

	describe('child: confirm button', () => {
		it('should call updateTranslation() if clicked', () => {
			const { props, wrapper } = setup()
			wrapper.find('Button').first().simulate('click');
			expect(EditModal.prototype.updateTranslation).calledOnce;
		});
	});

	describe('child: dismiss button', () => {
		it('should call props.closeEditModal() if clicked', () => {
			const { props, wrapper } = setup()
			wrapper.find('Button').last().simulate('click');
			expect(props.closeEditModal).calledOnce;
		});
	});
});
