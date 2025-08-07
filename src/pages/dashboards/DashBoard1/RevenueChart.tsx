import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useRedux } from '../../../hooks';
import { useEffect } from 'react';
import { dashboardSalesReport } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { AppColors } from '../../../utils/Colors';
import App from '../../../App';

const RevenueChart = () => {
    const { dispatch, appSelector } = useRedux();
    const selected_business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const business_id = selected_business.business_id;
    const sales = useSelector(
        (state: any) => state?.Report?.dashboardSalesReport?.data?.data?.data?.SalesReportDetails
    );

    useEffect(() => {
        dispatch(dashboardSalesReport(business_id));
    }, [dispatch]);
    const months = sales?.map((item: any) => item.month) || [];
    const totalAmountData = sales?.map((item: any) => item.total_amount) || [];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
            stacked: false,
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: [3],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        fill: {
            type: 'solid',
            opacity: [0.5],
        },
        colors: [AppColors.primaryColor],
        xaxis: {
            categories: months,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#adb5bd' },
            },
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                style: { colors: '#adb5bd' },
            },
        },
        grid: {
            show: false,
            padding: { top: 0, bottom: 0 },
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const series = [
        {
            name: 'Total Revenue',
            type: 'area',
            data: totalAmountData,
        },
    ];

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    {/* <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle> */}
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0">Earning Statistics (Last 6 months)</h4>

                <div dir="ltr">
                    <Chart options={options} series={series} type="line" height={268} className="apex-charts mt-2" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
