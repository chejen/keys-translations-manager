import TablePanel from '../../../../src/components/grid/TablePanel'
import ConfirmModal from '../../../../src/components/grid/ConfirmModal'
import Mask from '../../../../src/components/layout/Mask'
import Modal from 'react-bootstrap/lib/Modal'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Row from 'react-bootstrap/lib/Row'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


function setup() {
	TablePanel.prototype.onQuickFilterText = sinon.spy()
	TablePanel.prototype.showEditModal = sinon.spy()

	let props = {
			translations: [],
			messages: {},
			CountActions: {},
			ComponentActions: {},
			TranslationActions: {
				updateTranslation: sinon.spy()
			}
		},
		context = {
			config: config
		},
		wrapper = shallow(
			<TablePanel {...props}/>,
			{context: context}
		);

	return {
		props,
		context,
		wrapper
	}
}

describe('(component) TablePanel', () => {
	it('should render as a <div>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('div');
	});

	it('should have an InputGroup, a Row, a ConfirmModal, and a Mask', () => {
		const { wrapper } = setup()
		expect(wrapper.find('InputGroup')).to.have.length(1);
		expect(wrapper.find('Row')).to.have.length(1);
		expect(wrapper.find('ConfirmModal')).to.have.length(1);
		expect(wrapper.find('Mask')).to.have.length(1);
	});

	it('should have a BootstrapTable and several TableHeaderColumns', () => {
		const { wrapper, context } = setup(),
			locales = context.config.locales;
		expect(wrapper.find('BootstrapTable')).to.have.length(1);
		expect(wrapper.find('TableHeaderColumn')).to.have.length(locales.length + 4);
	});

	describe('child: InputGroup', () => {
		it('should call onQuickFilterText() if input value changed', () => {
			const { wrapper } = setup()
			wrapper.find('InputGroup').find('FormControl').first().simulate('change',{ target: { value: "test" } });
			expect(TablePanel.prototype.onQuickFilterText).calledOnce;
		});
	});

});
