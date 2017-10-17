import TablePanel from '../../../../src/components/grid/TablePanel'
import ConfirmModal from '../../../../src/components/grid/ConfirmModal'
import Mask from '../../../../src/components/layout/Mask'
import Modal from 'react-bootstrap/lib/Modal'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


function setup() {
	TablePanel.prototype.onQuickFilterText = sinon.spy()
	TablePanel.prototype.showEditModal = sinon.spy()

	const props = {
			translations: [{
				"_id": "56d7037a0b70e760104ddf10",
				"en-US": "Edit",
				"key": "ui.common.edit",
				"project": ["p1"],
				"zh-TW": "編輯"
			}],
			messages: {},
			CountActions: {},
			ComponentActions: {
				showEditModal: sinon.spy()
			},
			TranslationActions: {
				loadTranslations: sinon.spy(),
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

	it('should have an InputGroup, a ConfirmModal, and a Mask', () => {
		const { wrapper } = setup()
		expect(wrapper.find('InputGroup')).to.have.length(1);
		expect(wrapper.find('ConfirmModal')).to.have.length(1);
		expect(wrapper.find('Mask')).to.have.length(1);
	});

	it('should have a BootstrapTable and several TableHeaderColumns', () => {
		const { wrapper, context } = setup(),
			locales = context.config.locales;
		expect(wrapper.find('BootstrapTable')).to.have.length(1);
		expect(wrapper.find('TableHeaderColumn')).to.have.length(locales.length + 5);
	});

	// it('should have a Tooltip with required id "tooltip-locales" on TableHeaderColumn "LOCALES"', () => {
	// 	const { wrapper, context } = setup(),
	// 		locales = context.config.locales;
	// 	expect(wrapper.find('BootstrapTable')).to.have.length(1);
	// 	expect(wrapper.find('TableHeaderColumn')).to.have.length(locales.length + 5);
	// });

	it('should call loadTranslations() when component is mounted', () => {
		const props = {
				translations: [],
				messages: {},
				CountActions: {
					loadCounts: sinon.spy()
				},
				ComponentActions: {},
				TranslationActions: {
					updateTranslation: sinon.spy(),
					loadTranslations: sinon.spy()
				}
			},
			context = {
				config: config
			},
			wrapper = mount(
				<TablePanel {...props}/>,
				{context: context}
			);

		expect(props.TranslationActions.loadTranslations).calledOnce;

		wrapper.setProps({ reloaddata: true, translations: [] });
		expect(props.TranslationActions.loadTranslations).calledTwice;
		expect(props.CountActions.loadCounts).calledOnce;
	});

	describe('child: InputGroup', () => {
		it('should call onQuickFilterText() if input value changed', () => {
			const { wrapper } = setup()
			wrapper.find('InputGroup').find('FormControl').first().simulate('change',{ target: { value: "test" } });
			expect(TablePanel.prototype.onQuickFilterText).calledOnce;
		});
	});
});
