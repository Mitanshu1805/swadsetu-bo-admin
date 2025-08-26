import { TableMappingActionTypes } from './constants';

// Generic Action Type
export interface Action<T = any> {
    type: TableMappingActionTypes;
    payload?: T;
    error?: string;
}

/* -------- AREA CREATE -------- */
export const areaCreate = (data: any): Action => ({
    type: TableMappingActionTypes.AREA_CREATE,
    payload: data,
});

export const areaCreateSuccess = (response: any): Action => ({
    type: TableMappingActionTypes.AREA_CREATE_SUCCESS,
    payload: response,
});

export const areaCreateError = (error: string): Action => ({
    type: TableMappingActionTypes.AREA_CREATE_ERROR,
    error,
});

/* -------- AREA DELETE -------- */
export const areaDelete = (id: string | number): Action => ({
    type: TableMappingActionTypes.AREA_DELETE,
    payload: id,
});

export const areaDeleteSuccess = (response: any): Action => ({
    type: TableMappingActionTypes.AREA_DELETE_SUCCESS,
    payload: response,
});

export const areaDeleteError = (error: string): Action => ({
    type: TableMappingActionTypes.AREA_DELETE_ERROR,
    error,
});

/* -------- AREA UPDATE -------- */
export const areaUpdate = (data: any): Action => ({
    type: TableMappingActionTypes.AREA_UPDATE,
    payload: data,
});

export const areaUpdateSuccess = (response: any): Action => ({
    type: TableMappingActionTypes.AREA_UPDATE_SUCCESS,
    payload: response,
});

export const areaUpdateError = (error: string): Action => ({
    type: TableMappingActionTypes.AREA_UPDATE_ERROR,
    error,
});

/* -------- AREA TABLES (Fetch) -------- */
export const areaTables = (areaId?: string | number): Action => ({
    type: TableMappingActionTypes.AREA_TABLES,
    payload: areaId,
});

export const areaTablesSuccess = (response: any): Action => ({
    type: TableMappingActionTypes.AREA_TABLES_SUCCESS,
    payload: response,
});

export const areaTablesError = (error: string): Action => ({
    type: TableMappingActionTypes.AREA_TABLES_ERROR,
    error,
});

/* -------- AREA ADD -------- */
export const areaAdd = (data: any): Action => ({
    type: TableMappingActionTypes.AREA_ADD,
    payload: data,
});

export const areaAddSuccess = (response: any): Action => ({
    type: TableMappingActionTypes.AREA_ADD_SUCCESS,
    payload: response,
});

export const areaAddError = (error: string): Action => ({
    type: TableMappingActionTypes.AREA_ADD_ERROR,
    error,
});
