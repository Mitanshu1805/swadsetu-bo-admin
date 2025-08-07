import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { dashboardSalesReport } from '../../../redux/actions';
import { ReportActionTypes } from '../../../redux/report/constants';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { AppColors } from '../../../utils/Colors';

const StatisticsChart = () => {
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
    const orderCounts = sales?.map((item: any) => item.total_orders) || [];

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
            labels: { style: { colors: '#adb5bd' } },
        },
        grid: {
            show: false,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
        fill: { opacity: 1 },
        colors: [AppColors.primaryColor],
        tooltip: { theme: 'dark' },
    };

    const apexData = [
        {
            name: 'Total Orders',
            data: orderCounts,
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

                <h4 className="header-title mt-0">Order Statistics (Last 6 months)</h4>

                <div dir="ltr">
                    <Chart options={apexOpts} series={apexData} type="bar" height={268} className="apex-charts mt-2" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatisticsChart;
