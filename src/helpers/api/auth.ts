import { APICore } from './apiCore';
import { Axios } from 'axios';

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
    const baseUrl = '/login/';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function sendOtp(data: any) {
    const baseUrl = '/users/otp';
    return api.create(baseUrl, data);
}

function verifyOtp(data: any) {
    const baseUrl = '/users/login';
    return api.create(baseUrl, data);
}

function usersBusinesses() {
    const baseUrl = '/users/businesses';
    return api.get(baseUrl);
}

function outletList(data: any) {
    const baseUrl = '/outlet/list';
    return api.create(baseUrl, data);
}

function terminalList(data: any) {
    const baseUrl = '/terminal/list';
    return api.create(baseUrl, data);
}

function terminalUpdate(data: any) {
    const baseUrl = '/terminal/update';
    return api.create(baseUrl, data);
}

function terminalDelete(data: any) {
    const baseUrl = '/terminal/delete';
    return api.delete(baseUrl, data);
}

function terminalCreate(data: any) {
    const baseUrl = '/terminal/create';
    return api.create(baseUrl, data);
}

function dashboardEarningReport(data: any) {
    const baseUrl = '/order/sales/report/date';
    return api.create(baseUrl, data);
}

function dashboardSalesReport(data: any) {
    const baseUrl = '/order/sales/report/year';
    return api.create(baseUrl, data);
}

function orderReportList(data: any) {
    const baseUrl = '/order/daily/report';
    return api.create(baseUrl, data);
}

function ingredientReportList(data: any) {
    const baseUrl = '/recipe/ingredient/daily/list';
    return api.create(baseUrl, data);
}

export {
    login,
    logout,
    signup,
    forgotPassword,
    sendOtp,
    verifyOtp,
    usersBusinesses,
    outletList,
    terminalCreate,
    terminalDelete,
    terminalList,
    terminalUpdate,
    dashboardEarningReport,
    dashboardSalesReport,
    orderReportList,
    ingredientReportList,
};
