import Tree from '../../../../src/components/vis/Tree'
import Tooltip from '../../../../src/components/vis/Tooltip'
import ConfirmModal from '../../../../src/components/grid/ConfirmModal'
import Mask from '../../../../src/components/layout/Mask'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

function setup() {
	Tree.prototype.showConfirmModal = sinon.spy();
	Tree.prototype.goBack = sinon.spy();
	Tree.prototype.reset = sinon.spy();

	const props = {
			params: {
				projectId: "p1"
			},
			messages: {},
			translations: [],
			TranslationActions: {},
			ComponentActions: {
				showEditModal: sinon.spy()
			},
			CountActions: {},
			VisActions: {
				loadTreeData: sinon.spy()
			},
			treedata: [],
			reloaddata: false
		},
		wrapper = shallow(<Tree {...props}/>);

	return { props, wrapper }
}

describe('(component) Tree', () => {
	it('should render as a <div> with id "vis_tree"', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('div');
		expect(wrapper.prop('id')).to.eql('vis_tree');
	});

	it('should have a Tooltip, a ConfirmModal, a Mask, and a ButtonGroup', () => {
		const { wrapper } = setup();
		expect(wrapper.find('Tooltip')).to.have.length(1);
		expect(wrapper.find('ConfirmModal')).to.have.length(1);
		expect(wrapper.find('Mask')).to.have.length(1);
		expect(wrapper.find('ButtonGroup')).to.have.length(1);
	});

	describe('child: Tooltip', () => {
		it('should contain title, content, and footer', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.app-tooltip-title')).to.have.length(1);
			expect(wrapper.find('.app-tooltip-content')).to.have.length(1);
			expect(wrapper.find('.app-tooltip-footer')).to.have.length(1);
		});

		it('should contain title, content, and footer', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.app-tooltip-title')).to.have.length(1);
			expect(wrapper.find('.app-tooltip-content')).to.have.length(1);
			expect(wrapper.find('.app-tooltip-footer')).to.have.length(1);
		});

		it('should contain description if state.desc exists', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.app-tooltip-desc')).to.have.length(0);

			wrapper.setState({ "desc": "This is a description." });
			expect(wrapper.find('.app-tooltip-desc')).to.have.length(1);
		});

		it('should contain "trash" Glyphicon if state.data exists', () => {
			const { wrapper } = setup()
			expect(wrapper.find('Glyphicon[glyph="edit"]')).to.have.length(1);
			expect(wrapper.find('Glyphicon[glyph="trash"]')).to.have.length(0);

			wrapper.setState({ "data": {} });
			expect(wrapper.find('Glyphicon[glyph="trash"]')).to.have.length(1);
		});

		describe('child: "edit" Glyphicon', () => {
			it('should call showEditModal() if clicked', () => {
				const { props, wrapper } = setup()
				wrapper.find('Glyphicon[glyph="edit"]').first().simulate('click');
				expect(props.ComponentActions.showEditModal).calledOnce;
			});
		});

		describe('child: "trash" Glyphicon', () => {
			it('should call showConfirmModal() if clicked', () => {
				const { wrapper } = setup();
				wrapper.setState({ "data": {} });
				wrapper.find('Glyphicon[glyph="trash"]').first().simulate('click');
				expect(Tree.prototype.showConfirmModal).calledOnce;
			});
		});
	});

	describe('child: "Go back" Button', () => {
		it('should call goBack() if clicked', () => {
			const { wrapper } = setup()
			expect(wrapper.find('Button')).to.have.length(1);

			wrapper.find('Button').first().simulate('click');
			expect(Tree.prototype.goBack).calledOnce;
		});
	});

	describe('child: "Reset" Button', () => {
		it('should call reset() if clicked', () => {
			const { wrapper } = setup()
			wrapper.setState({ isTranslatedOrScaled: true });
			expect(wrapper.find('Button')).to.have.length(2);

			wrapper.find('Button').last().simulate('click');
			expect(Tree.prototype.reset).calledOnce;
		});
	});
});
