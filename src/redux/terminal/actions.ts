// terminal.actions.ts

import { TerminalActionTypes } from './constants';

export const terminalList = (payload: { outlet_id: string }) => ({
    type: TerminalActionTypes.TERMINAL_LIST,
    payload,
});

export const terminalListSuccess = (data: any) => ({
    type: TerminalActionTypes.TERMINAL_LIST_SUCCESS,
    payload: data, // array of terminals
});

export const terminalListError = (error: any) => ({
    type: TerminalActionTypes.TERMINAL_LIST_ERROR,
    payload: error,
});

// ─────────────────────────────
// 🚀 Terminal Create
// Request payload:
// {
//   terminal_name: "Main Terminal",
//   outlet_id: "123e4567-e89b-12d3-a456-426614174000",
//   device_id: "abc123xyz",
//   fcm_token: "fcm12345abcdef",
//   session_duration: "1w",
//   device_name: "Samsung Tab A"
// }

// Response:
// {
//   message: "Terminal created successfully.",
//   data: {
//     terminal_id: "...",
//     token: "..."
//   }
// }
// ─────────────────────────────
export const terminalCreate = (payload: {
    terminal_name: string;
    outlet_id: string;
    device_id: string;
    fcm_token: string;
    session_duration: string;
    device_name: string;
}) => ({
    type: TerminalActionTypes.TERMINAL_CREATE,
    payload,
});

export const terminalCreateSuccess = (data: {
    message: string;
    data: {
        terminal_id: string;
        token: string;
    };
}) => ({
    type: TerminalActionTypes.TERMINAL_CREATE_SUCCESS,
    payload: data,
});

export const terminalCreateError = (error: any) => ({
    type: TerminalActionTypes.TERMINAL_CREATE_ERROR,
    payload: error,
});

// ─────────────────────────────
// ✏️ Terminal Update
// Request payload:
// {
//   terminal_id: "...",
//   terminal_name: "Updated Terminal",
//   session_duration: "1w",
//   is_active: true,
//   device_id: "abc123xyz"
// }

// Response:
// {
//   message: "Terminal updated successfully."
// }
// ─────────────────────────────
export const terminalUpdate = (payload: {
    terminal_id: string;
    terminal_name: string;
    session_duration: string;
    is_active: boolean;
    device_id: string;
}) => ({
    type: TerminalActionTypes.TERMINAL_UPDATE,
    payload,
});

export const terminalUpdateSuccess = (data: { message: string }) => ({
    type: TerminalActionTypes.TERMINAL_UPDATE_SUCCESS,
    payload: data,
});

export const terminalUpdateError = (error: any) => ({
    type: TerminalActionTypes.TERMINAL_UPDATE_ERROR,
    payload: error,
});

// ─────────────────────────────
// ❌ Terminal Delete
// Request payload:
// {
//   terminal_id: "..."
// }

// Response:
// {
//   message: "Terminal deleted successfully."
// }
// ─────────────────────────────
export const terminalDelete = (payload: { terminal_id: string }) => ({
    type: TerminalActionTypes.TERMINAL_DELETE,
    payload,
});

export const terminalDeleteSuccess = (data: { message: string }) => ({
    type: TerminalActionTypes.TERMINAL_DELETE_SUCCESS,
    payload: data,
});

export const terminalDeleteError = (error: any) => ({
    type: TerminalActionTypes.TERMINAL_DELETE_ERROR,
    payload: error,
});
