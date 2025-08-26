import { ingredientDailyList } from './../../redux/ingredients/actions';
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
    return api.update(baseUrl, data);
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

function staffList(data: any) {
    const baseUrl = '/staff/list';
    return api.create(baseUrl, data);
}

function staffRegister(data: any) {
    const baseUrl = '/staff/register';
    return api.create(baseUrl, data);
}

function staffDelete(data: any) {
    const baseUrl = '/staff/delete';
    return api.delete(baseUrl, data);
}

function staffUpdate(data: any) {
    const baseUrl = '/staff/update';
    return api.update(baseUrl, data);
}

function staffDetails(data: any) {
    const baseUrl = '/staff/details';
    return api.create(baseUrl, data);
}

function staffAllocationUpdate(data: any) {
    const baseUrl = '/staff/allocate/update';
    return api.update(baseUrl, data);
}

function staffAttendanceUpdate(data: any) {
    const baseUrl = '/staff/attendance/update';
    return api.update(baseUrl, data);
}

export function categoryRegister(data: any) {
    return api.create('/category/register', data);
}

export function categoryUpdate(data: any) {
    return api.update('/category/update', data);
}

export function categoryDelete(data: any) {
    return api.delete('/category/delete', data);
}

export function categoryUpdateIsActive(data: any) {
    return api.update('/category/update/isactive', data);
}

export function categoryUpdateDisable(data: any) {
    return api.update('/category/update/disable', data);
}

export function categoryOutletLists(data: any) {
    const baseUrl = '/category/outlet/lists';
    return api.create(`${baseUrl}`, data);
}

export function categoryItemList(data: any) {
    const baseUrl = '/category/item/list';
    return api.create(`${baseUrl}`, data);
}

export function registerItem(data: any) {
    return api.create('/item/register', data);
}

export function updateItem(data: any) {
    return api.update('/item/update', data);
}

export function deleteItem(data: any) {
    return api.delete('/item/delete', data);
}

export function itemUpdateIsActive(data: any) {
    return api.update('/item/update/isactive', data);
}

export function itemUpdateDisable(data: any) {
    return api.update('/item/update/disable', data);
}

export function updateOutletPrice(data: any) {
    const baseUrl = '/item/update/outlet/price';
    return api.update(`${baseUrl}`, data);
}

export function recipeAdd(data: any) {
    return api.create('/recipe/add', data);
}

export function recipeUpdate(data: any) {
    return api.update('/recipe/update', data);
}

export function recipeDelete(data: any) {
    return api.delete('/recipe/delete', data);
}

export function recipeList(data: any) {
    return api.create('/recipe/list', data);
}

export function recipeIngredientAdd(data: any) {
    return api.create('/recipe/ingredient/add', data);
}

export function recipeIngredientDelete(data: any) {
    return api.delete('/recipe/ingredient/delete', data);
}

export function recipeIngredientList(data: any) {
    return api.create('/recipe/ingredient/list', data);
}

export function recipeIngredientUpdateStatus(data: any) {
    return api.update('/recipe/ingredient/update/status', data);
}

export function recipeIngredientUpdate(data: any) {
    return api.update('/recipe/ingredient/update', data);
}

export function orderList(data: any) {
    return api.create('/order/list', data);
}

export function areaCreate(data: any) {
    return api.create('/area/create', data);
}

export function areaDelete(data: any) {
    return api.create('/area/delete', data);
}

export function areaUpdate(data: any) {
    return api.create('/area/create', data);
}

export function areaTables(data: any) {
    return api.create('/area/tables', data);
}

export function areaAdd(data: any) {
    return api.create('/area/add', data);
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
    staffAllocationUpdate,
    staffDelete,
    staffDetails,
    staffList,
    staffRegister,
    staffUpdate,
    staffAttendanceUpdate,
};
