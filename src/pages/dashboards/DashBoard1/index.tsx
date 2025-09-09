import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import StatisticsChart from './StatisticsChart';
import RevenueChart from './RevenueChart';
import Users from './Users';
import Inbox from './Inbox';
import { useRedux } from '../../../hooks';
import { useEffect } from 'react';
import { dashboardSalesReport } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import Projects from './Projects';

// dummy data
import { messages, projectDetails } from './data';
import { AppColors } from '../../../utils/Colors';

const DashBoard1 = () => {
    const { dispatch, appSelector } = useRedux();
    const selected_business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const business_id = selected_business.business_id;
    const sales = useSelector((state: any) => state?.Report?.dashboardSalesReport?.data?.data?.data);

    useEffect(() => {
        dispatch(dashboardSalesReport(business_id));
    }, [dispatch]);

    // set pagetitle
    usePageTitle({
        title: 'Reports DashBoard',
        breadCrumbItems: [
            {
                path: '/dashboard',
                label: 'DashBoard',
                active: true,
            },
        ],
    });

    return (
        <div>
            <Statistics sales={sales} />

            <Row>
                {/* <Col xl={4}>
                    <SalesChart />
                </Col> */}
                <Col xl={4}>
                    <StatisticsChart sales={sales} />
                </Col>
                <Col xl={4}>
                    <RevenueChart sales={sales} />
                </Col>
            </Row>

            {/* <Users /> */}

            {/* <Row>
                <Col xl={4}>
                    <Inbox messages={messages} />
                </Col>
                <Col xl={8}>
                    <Projects projectDetails={projectDetails} />
                </Col>
            </Row> */}
        </div>
    );
};

export default DashBoard1;
