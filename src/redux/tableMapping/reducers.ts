// reducers/tableMappingReducer.ts
import { TableMappingActionTypes } from './constants';

export interface Area {
    id: string;
    name: string;
    tables?: any[]; // you can type tables properly if you know the shape
}

export interface TableMappingState {
    loading: boolean;
    error: string | null;
    areas: Area[];
}

const initialState: TableMappingState = {
    loading: false,
    error: null,
    areas: [],
};

type TableMappingAction =
    | { type: TableMappingActionTypes.AREA_CREATE }
    | { type: TableMappingActionTypes.AREA_CREATE_SUCCESS; payload: Area }
    | { type: TableMappingActionTypes.AREA_CREATE_ERROR; payload: { error: string } }
    | { type: TableMappingActionTypes.AREA_DELETE }
    | { type: TableMappingActionTypes.AREA_DELETE_SUCCESS; payload: string } // areaId
    | { type: TableMappingActionTypes.AREA_DELETE_ERROR; payload: { error: string } }
    | { type: TableMappingActionTypes.AREA_UPDATE }
    | { type: TableMappingActionTypes.AREA_UPDATE_SUCCESS; payload: Area }
    | { type: TableMappingActionTypes.AREA_UPDATE_ERROR; payload: { error: string } }
    | { type: TableMappingActionTypes.AREA_TABLES }
    | { type: TableMappingActionTypes.AREA_TABLES_SUCCESS; payload: Area[] }
    | { type: TableMappingActionTypes.AREA_TABLES_ERROR; payload: { error: string } }
    | { type: TableMappingActionTypes.AREA_ADD }
    | { type: TableMappingActionTypes.AREA_ADD_SUCCESS; payload: Area }
    | { type: TableMappingActionTypes.AREA_ADD_ERROR; payload: { error: string } };

const TableMappingReducer = (state = initialState, action: TableMappingAction): TableMappingState => {
    console.log(action);

    switch (action.type) {
        case TableMappingActionTypes.AREA_CREATE:
        case TableMappingActionTypes.AREA_DELETE:
        case TableMappingActionTypes.AREA_UPDATE:
        case TableMappingActionTypes.AREA_TABLES:
        case TableMappingActionTypes.AREA_ADD:
            return { ...state, loading: true, error: null };

        case TableMappingActionTypes.AREA_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: [...state.areas, action.payload],
            };

        case TableMappingActionTypes.AREA_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: state.areas.filter((a) => a.id !== action.payload),
            };

        case TableMappingActionTypes.AREA_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: state.areas.map((a) => (a.id === action.payload.id ? action.payload : a)),
            };

        case TableMappingActionTypes.AREA_TABLES_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: action.payload,
            };

        case TableMappingActionTypes.AREA_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                areas: [...state.areas, action.payload],
            };

        case TableMappingActionTypes.AREA_CREATE_ERROR:
        case TableMappingActionTypes.AREA_DELETE_ERROR:
        case TableMappingActionTypes.AREA_UPDATE_ERROR:
        case TableMappingActionTypes.AREA_TABLES_ERROR:
        case TableMappingActionTypes.AREA_ADD_ERROR:
            return { ...state, loading: false, error: action.payload?.error };

        default:
            return state;
    }
};

export default TableMappingReducer;
