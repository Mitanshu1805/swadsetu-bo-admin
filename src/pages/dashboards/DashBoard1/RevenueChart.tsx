import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useRedux } from '../../../hooks';
import { AppColors } from '../../../utils/Colors';

type Sale = {
    month: string;
    total_amount: number;
};

type RevenueChartProps = {
    sales: {
        SalesReportDetails: Sale[];
    };
};

const RevenueChart: React.FC<RevenueChartProps> = ({ sales: salesProps }) => {
    const { dispatch } = useRedux();
    const selected_business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const business_id = selected_business.business_id;

    const sales = salesProps?.SalesReportDetails || [];
    const months = sales.map((item) => item.month) || [];
    const totalAmountData = sales.map((item) => item.total_amount) || [];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: { show: false },
            stacked: false,
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth',
            width: [3],
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        fill: { type: 'solid', opacity: [0.5] },
        colors: [AppColors.primaryColor],
        xaxis: {
            categories: months,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#adb5bd' } },
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                style: { colors: '#adb5bd' },
                formatter: (val: number) => val.toLocaleString(), // <-- add commas
            },
        },
        grid: { show: false, padding: { top: 0, bottom: 0 } },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val: number) => val.toLocaleString(), // <-- format tooltip numbers
            },
        },
    };

    const series = [
        {
            name: 'Total Revenue',
            type: 'area',
            data: totalAmountData,
        },
    ];

    // Optional: display total revenue above chart
    const totalRevenue = totalAmountData.reduce((sum, amt) => sum + amt, 0);

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

                <h4 className="header-title mt-0">Earning Statistics (Last 6 months)</h4>

                {/* Total Revenue Display */}
                {/* <div
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: '10px',
                        color: AppColors.primaryColor,
                    }}>
                    Total Revenue: ₹{totalRevenue.toLocaleString()}
                </div> */}

                <div dir="ltr">
                    <Chart options={options} series={series} type="line" height={268} className="apex-charts mt-2" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
