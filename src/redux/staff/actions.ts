import { StaffActionTypes } from './constants';

type StaffList = {
    outlet_id?: string;
    business_id: string;
};

type StaffDelete = {
    business_staff_id: string;
    business_id: string;
};

type StaffDetails = {
    staff_id: string;
    business_id: string;
};

export const staffList = (data: StaffList) => ({
    type: StaffActionTypes.STAFF_LIST,
    payload: { data },
});
export const staffListSuccess = (data: any) => ({
    type: StaffActionTypes.STAFF_LIST_SUCCESS,
    payload: { data },
});
export const staffListError = (error: any) => ({
    type: StaffActionTypes.STAFF_LIST_ERROR,
    payload: { error },
});

export const staffRegister = (data: any) => ({
    type: StaffActionTypes.STAFF_CREATE,
    payload: { data },
});
export const staffRegisterSuccess = (message: string) => ({
    type: StaffActionTypes.STAFF_CREATE_SUCCESS,
    payload: { message },
});
export const staffRegisterError = (error: any) => ({
    type: StaffActionTypes.STAFF_CREATE_ERROR,
    payload: { error },
});

export const staffDelete = (data: StaffDelete) => ({
    type: StaffActionTypes.STAFF_DELETE,
    payload: { data },
});
export const staffDeleteSuccess = (message: string) => ({
    type: StaffActionTypes.STAFF_DELETE_SUCCESS,
    payload: { message },
});
export const staffDeleteError = (error: any) => ({
    type: StaffActionTypes.STAFF_DELETE_ERROR,
    payload: { error },
});

export const staffUpdate = (data: any) => ({
    type: StaffActionTypes.STAFF_UPDATE,
    payload: { data },
});
export const staffUpdateSuccess = (message: string) => ({
    type: StaffActionTypes.STAFF_UPDATE_SUCCESS,
    payload: { message },
});
export const staffUpdateError = (error: any) => ({
    type: StaffActionTypes.STAFF_UPDATE_ERROR,
    payload: { error },
});

export const staffDetails = (data: StaffDetails) => ({
    type: StaffActionTypes.STAFF_DETAILS,
    payload: { data },
});
export const staffDetailsSuccess = (data: any) => ({
    type: StaffActionTypes.STAFF_DETAILS_SUCCESS,
    payload: { data },
});
export const staffDetailsError = (error: any) => ({
    type: StaffActionTypes.STAFF_DETAILS_ERROR,
    payload: { error },
});

export const staffAllocationUpdate = (data: any) => ({
    type: StaffActionTypes.STAFF_ALLOCATION_UPDATE,
    payload: { data },
});
export const staffAllocationUpdateSuccess = (data: any) => ({
    type: StaffActionTypes.STAFF_ALLOCATION_UPDATE_SUCCESS,
    payload: { data },
});
export const staffAllocationUpdateError = (error: any) => ({
    type: StaffActionTypes.STAFF_ALLOCATION_UPDATE_SUCCESS,
    payload: { error },
});

export const staffAttendanceUpdate = (data: any) => ({
    type: StaffActionTypes.STAFF_ATTENDANCE_UPDATE,
    payload: { data },
});
export const staffAttendanceUpdateSuccess = (message: string) => ({
    type: StaffActionTypes.STAFF_ATTENDANCE_UPDATE_SUCCESS,
    payload: { message },
});
export const staffAttendanceUpdateError = (error: any) => ({
    type: StaffActionTypes.STAFF_ATTENDANCE_UPDATE_SUCCESS,
    payload: { error },
});
