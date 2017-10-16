import ImportModal from '../../../../src/components/grid/ConfirmModal'
import Modal from 'react-bootstrap/lib/Modal'

function setup() {
	return shallow(<ImportModal/>)
}

describe('(component) ConfirmModal', () => {
	it('should render as a <Modal>', () => {
		const wrapper = setup()
		expect(wrapper.type()).to.eql(Modal);
	});

	it('should contain a "Yes" button with "primary" class', () => {
		const wrapper = setup()
		expect(wrapper.find('Button').first().props().bsStyle).to.eql('primary');
	});

	it('should contain a "No" button with "default" class', () => {
		const wrapper = setup()
		expect(wrapper.find('Button').last().props().bsStyle).to.eql('default');
	});

	it('should be opened if open() is called', () => {
		const wrapper = setup()
		wrapper.instance().open("Confirm", "Confirm Message", function(){})
		expect(wrapper.state('show')).to.be.true;
		expect(wrapper.state('confirmTitle')).to.eql("Confirm");
		expect(wrapper.state('confirmMsg')).to.eql("Confirm Message");
		expect(wrapper.state('confirmFunc')).to.be.a('function');
	});

	describe('child: "Yes" button', () => {
		it('should call state.confirmFunc() if clicked', () => {
			const wrapper = setup()
			wrapper.setState({
				show: true,
				confirmTitle: "Confirm",
				confirmMsg: "Confirm Message",
				confirmFunc: sinon.spy()
			});
			wrapper.find('Button').first().simulate('click');
			expect(wrapper.state('confirmFunc')).calledOnce;
		});
	});

	describe('child: "No" button', () => {
		it('should close Modal if clicked', () => {
			const wrapper = setup()
			wrapper.find('Button').last().simulate('click');
			expect(wrapper.state('show')).to.be.false;
		});
	});
});
