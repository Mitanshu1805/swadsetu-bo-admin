import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';
import { useRedux } from '../../../hooks';
import { AppColors } from '../../../utils/Colors';

type Sale = {
    month: string;
    total_orders: number;
};

type StatisticsChartProps = {
    sales: {
        SalesReportDetails: Sale[];
    };
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({ sales: salesProps }) => {
    const { dispatch } = useRedux();
    const selected_business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const business_id = selected_business.business_id;

    const sales = salesProps?.SalesReportDetails || [];

    const months = sales.map((item) => item.month) || [];
    const orderCounts = sales.map((item) => item.total_orders) || [];

    const apexOpts: ApexOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        plotOptions: { bar: { columnWidth: '40%', borderRadius: 10 } },
        dataLabels: { enabled: false },
        stroke: { show: false },
        xaxis: {
            categories: months,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#adb5bd' } },
        },
        yaxis: {
            labels: {
                style: { colors: '#adb5bd' },
                formatter: (val: number) => val.toLocaleString(), // <-- commas
            },
        },
        grid: { show: false, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
        fill: { opacity: 1 },
        colors: [AppColors.primaryColor],
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val: number) => val.toLocaleString(), // <-- commas
            },
        },
    };

    const apexData = [
        {
            name: 'Total Orders',
            data: orderCounts,
        },
    ];

    // Optional total display above chart
    const totalOrders = sales.reduce((sum, item) => sum + item.total_orders, 0);

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Another Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0">Order Statistics (Last 6 months)</h4>

                {/* Total Orders Display */}
                {/* <div
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: '10px',
                        color: AppColors.primaryColor,
                    }}>
                    Total Orders: {totalOrders.toLocaleString()}
                </div> */}

                <div dir="ltr">
                    <Chart options={apexOpts} series={apexData} type="bar" height={268} className="apex-charts mt-2" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatisticsChart;
