import TablePanel from '../../../../src/components/grid/TablePanel'
import Tooltip from 'react-bootstrap/lib/Tooltip'

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
				showEditModal: sinon.spy(),
				showConfirmModal: sinon.spy(),
			},
			TranslationActions: {
				loadTranslations: sinon.spy(),
				updateTranslation: sinon.spy(),
			}
		},
		wrapper = shallow(<TablePanel {...props}/>),
		wrapper2 = mount(<TablePanel {...props}/>);

	return {
		props,
		wrapper,
		wrapper2
	}
}

describe('(component) TablePanel', () => {
	it('should be wrapped by React.Fragment', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(React.Fragment);
	});

	it('should have an InputGroup and a Mask', () => {
		const { wrapper } = setup()
		expect(wrapper.find('InputGroup')).to.have.length(1);
		expect(wrapper.find('Mask')).to.have.length(1);
	});

	it('should have a Table with several columns', () => {
		const { wrapper } = setup();
		expect(wrapper.find('ReactTable')).to.have.length(1);
		expect(wrapper.find('ReactTable').prop('columns').length)
			.to.eql(configUtil.getLocales().length + 4);
	});

	it('should call loadTranslations() when component is mounted', () => {
		const props = {
				translations: [{
					"_id": "56d7037a0b70e760104ddf10",
					"en-US": "Edit",
					"key": "ui.common.edit",
					"project": ["p1"],
					"zh-TW": "編輯"
				}],
				messages: {},
				CountActions: {
					loadCounts: sinon.spy(),
				},
				ComponentActions: {
					showEditModal: sinon.spy(),
					showConfirmModal: sinon.spy(),
				},
				TranslationActions: {
					loadTranslations: sinon.spy(),
					updateTranslation: sinon.spy(),
				}
			},
			wrapper = mount(<TablePanel {...props}/>);

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
