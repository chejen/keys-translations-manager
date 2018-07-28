import TablePanel from '../../../../src/components/grid/TablePanel'

function setup() {
	window.removeEventListener = sinon.spy()
	TablePanel.prototype.showEditModal = sinon.spy()

	const props = {
			translations: [{
				"_id": "56d7037a0b70e760104ddf10",
				"en-US": "Edit",
				"key": "ui.common.edit",
				"project": ["p1"],
				"zh-TW": "編輯"
			}, {
				"_id": "56d7037a0b70e760104ddf11",
				"en-US": "Delete",
				"key": "ui.common.delete",
				"project": ["p1"],
				"zh-TW": "刪除"
			}],
			messages: {},
			CountActions: {
				loadCounts: sinon.spy(),
			},
			ComponentActions: {
				showEditModal: sinon.spy(),
				showConfirmModal: sinon.spy(),
				showHistoryModal: sinon.spy(),
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
		const { props } = setup();
		props.TranslationActions.loadTranslations.resetHistory();
		props.CountActions.loadCounts.resetHistory();

		const wrapper = mount(<TablePanel {...props}/>);

		expect(props.TranslationActions.loadTranslations).calledOnce;

		wrapper.setProps({ reloaddata: true, translations: [] });
		expect(props.TranslationActions.loadTranslations).calledTwice;
		expect(props.CountActions.loadCounts).calledOnce;
	});

	it('should remove listener when the component is about to unmount', () => {
		const { wrapper } = setup()
		wrapper.unmount();
		expect(window.removeEventListener).calledOnce;
	});

	describe('child: InputGroup', () => {
		it('should call onQuickFilterText() if input value changed', () => {
			const { wrapper } = setup()
			const inputValue = 'test'
			wrapper.find('InputGroup').find('FormControl').first().simulate('change',{ target: { value: inputValue } });

			expect(wrapper.state('quickFilterText')).not.to.eql(inputValue);
			setTimeout(() => {
				expect(wrapper.state('quickFilterText')).to.eql(inputValue);
			}, 300);
		});

		it('should filter data if input value changed', () => {
			const { wrapper } = setup()
			const inputValue = 'delete'
			wrapper.find('InputGroup').find('FormControl').first().simulate('change',{ target: { value: inputValue } });

			expect(wrapper.find('ReactTable').prop('data')).to.have.length(2);
			setTimeout(() => {
				expect(wrapper.find('ReactTable').prop('data')).to.have.length(1);
			}, 300);
		});
	});
});
