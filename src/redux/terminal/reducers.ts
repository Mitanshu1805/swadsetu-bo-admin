import { TerminalActionTypes } from './constants';

interface TerminalState {
    loading: boolean;
    error: string | null;
    success: string | null;
    data: any;
}

const initialState: TerminalState = {
    loading: false,
    error: null,
    success: null,
    data: null,
};

const Terminal = (state = initialState, action: any): TerminalState => {
    console.log(action);
    switch (action.type) {
        //Read
        case TerminalActionTypes.TERMINAL_LIST:
            return { ...state, loading: true, error: null, success: null, data: [] };
        case TerminalActionTypes.TERMINAL_LIST_SUCCESS:
            return { ...state, loading: false, data: action.payload, success: 'Terminal List successfully.' };
        case TerminalActionTypes.TERMINAL_LIST_ERROR:
            return { ...state, loading: false, error: action.payload, data: [] };

        // CREATE
        case TerminalActionTypes.TERMINAL_CREATE:
            return { ...state, loading: true, error: null, success: null };
        case TerminalActionTypes.TERMINAL_CREATE_SUCCESS:
            return { ...state, loading: false, data: action.payload, success: 'Terminal created successfully.' };
        case TerminalActionTypes.TERMINAL_CREATE_ERROR:
            return { ...state, loading: false, error: action.payload };

        // UPDATE
        case TerminalActionTypes.TERMINAL_UPDATE:
            return { ...state, loading: true, error: null, success: null };
        case TerminalActionTypes.TERMINAL_UPDATE_SUCCESS:
            return { ...state, loading: false, success: 'Terminal updated successfully.' };
        case TerminalActionTypes.TERMINAL_UPDATE_ERROR:
            return { ...state, loading: false, error: action.payload };

        // DELETE
        case TerminalActionTypes.TERMINAL_DELETE:
            return { ...state, loading: true, error: null, success: null };
        case TerminalActionTypes.TERMINAL_DELETE_SUCCESS:
            return { ...state, loading: false, success: 'Terminal deleted successfully.' };
        case TerminalActionTypes.TERMINAL_DELETE_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default Terminal;
