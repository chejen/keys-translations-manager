import CountCol from '../../../../src/components/output/CountCol'
import Col from 'react-bootstrap/lib/Col'
import { Link } from 'react-router-dom'

function setup() {
	const props = {
			projectId: 'p1',
			header: 'header',
			onClick: sinon.spy(),
			count: 5,
			desc: 'description'
		},
		wrapper = shallow(<CountCol {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) CountCol', () => {
	it('should render as a <Col>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(Col);
	});

	describe('child: heading', () => {
		it('should render with .panel-heading', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.panel-heading')).to.have.length(1);
		});

		it('should contain \'header\' with ellipsis effect', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.panel-heading').find('.app-ellipsis').props().children).to.be.equal('header');
		});

		describe('child: Glyphicon', () => {
			it('should call onClick() if it is clicked', () => {
				const { props, wrapper } = setup()
				wrapper.find('.panel-heading').find('Glyphicon').simulate('click');
				expect(props.onClick).calledOnce;
			});
		});
	});

	describe('child: count', () => {
		it('should render with .row', () => {
			const { wrapper } = setup()
			expect(wrapper.find('.row')).to.have.length(1);
		});

		it('should show text "0" if count is equal to 0', () => {
			const props = {
					projectId: 'p1',
					header: 'header',
					onClick: sinon.spy(),
					count: 0,
					desc: 'description'
				},
				wrapper = shallow(<CountCol {...props}/>);

			expect(wrapper.find('.huge').contains(
				<b>{props.count}</b>
			)).to.be.true;
		});

		it('should show count with Link if count is larger than 0', () => {
			const { props, wrapper } = setup()
			const { projectId, count } = props
			expect(wrapper.find('.huge').contains(
				<b><Link to={`/vis/${projectId}`}>{count}</Link></b>
			)).to.be.true;
		});
	});
});
