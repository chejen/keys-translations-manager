import ImportModal from '../../../../src/components/merge/MergeModal'
import Modal from 'react-bootstrap/lib/Modal'

function setup() {
	let propsN = {
			keys: {},
			mergeable: [],
			showmergemodal: true,
			closeMergeModal: sinon.spy(),
			mergeTranslations: sinon.spy()
		},
		propsY = {
			keys: {
				"ui.common.delete": true
			},
			mergeable: [
				[{
					"_id": "56e3f81b88cbd598067d7d60",
					"key": "ui.common.delete",
					"en-US": "Delete",
					"zh-TW": "移除",
					"__v": 0,
					"project": ["p2"]
				}, {
					"_id": "56e3f7fd88cbd598067d7d5e",
					"key": "ui.common.delete",
					"en-US": "Delete",
					"zh-TW": "移除",
					"__v": 1,
					"project": ["p1"]
				}]
			],
			showmergemodal: true,
			closeMergeModal: sinon.spy(),
			mergeTranslations: sinon.spy()
		},
		wrapperN = shallow(<ImportModal {...propsN}/>),
		wrapperY = shallow(<ImportModal {...propsY}/>);

	return {
		propsN,
		wrapperN,
		propsY,
		wrapperY
	}
}

describe('(component) MergeModal', () => {
	it('should render as a <Modal>', () => {
		const { wrapperY } = setup()
		expect(wrapperY.type()).to.eql(Modal);
	});

	describe('with no keys', () => {
		it('should have no <div>s', () => {
			const { wrapperN } = setup()
			expect(wrapperN.find('div')).to.have.length(0);
		});

		it('should have 1 button', () => {
			const { wrapperN } = setup()
			expect(wrapperN.find('Button')).to.have.length(1);
		});

		describe('child: close button', () => {
			it('should call props.closeMergeModal() if clicked', () => {
				const { propsN, wrapperN } = setup()
				wrapperN.find('Button').last().simulate('click');
				expect(propsN.closeMergeModal).calledOnce;
			});
		});
	});

	describe('with keys', () => {
		it('should contain a <div>', () => {
			const { wrapperY } = setup()
			expect(wrapperY.find('div')).to.have.length(1);
		});

		it('should have 2 buttons', () => {
			const { wrapperY } = setup()
			expect(wrapperY.find('Button')).to.have.length(2);
		});

		describe('child: confirm button', () => {
			it('should call props.mergeTranslations() if clicked', () => {
				const { propsY, wrapperY } = setup()
				wrapperY.find('Button').first().simulate('click');
				expect(propsY.mergeTranslations).calledOnce;
			});
		});

		describe('child: dismiss button', () => {
			it('should call props.closeMergeModal() if clicked', () => {
				const { propsY, wrapperY } = setup()
				wrapperY.find('Button').last().simulate('click');
				expect(propsY.closeMergeModal).calledOnce;
			});
		});
	});
});
