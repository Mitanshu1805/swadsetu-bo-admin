// apicore
import { APICore } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

const INIT_STATE = {
    user: api.getLoggedInUser(),
    loading: false,
    userLoggedIn: false,
    userSignUp: false,
    userLogout: false,
    passwordReset: false,
    passwordChange: false,
    otpSent: false,
    otpVerified: false,
    error: null,
    registerError: null,
    resetPasswordSuccess: null,
};

type UserData = {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SEND_OTP
        | AuthActionTypes.VERIFY_OTP
        | AuthActionTypes.FORGOT_PASSWORD;
    payload: {
        actionType?: string;
        data?: UserData | {};
        error?: string;
    };
};

type State = {
    user?: UserData | {} | null;
    loading: boolean;
    userLoggedIn: boolean;
    userSignUp: boolean;
    userLogout: boolean;
    passwordReset: boolean;
    passwordChange: boolean;
    otpSent: boolean;
    otpVerified: boolean;
    error?: string | null;
    registerError?: string | null;
    resetPasswordSuccess?: any;
};

const Auth = (state: State = INIT_STATE, action: AuthActionType): State => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false,
                        error: null,
                    };
                }
                case AuthActionTypes.SEND_OTP: {
                    return {
                        ...state,
                        otpSent: true,
                        loading: false,
                        error: null,
                        user: action.payload.data || state.user, // Keep existing user data if needed
                    };
                }
                case AuthActionTypes.VERIFY_OTP: {
                    return {
                        ...state,
                        user: action.payload.data,
                        otpVerified: true,
                        userLoggedIn: true,
                        loading: false,
                        error: null,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        userSignUp: true,
                        loading: false,
                        registerError: null,
                    };
                }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        user: null,
                        userLoggedIn: false,
                        loading: false,
                        userLogout: true,
                        otpSent: false,
                        otpVerified: false,
                    };
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        resetPasswordSuccess: action.payload.data,
                        loading: false,
                        passwordReset: true,
                        error: null,
                    };
                }
                default:
                    return { ...state };
            }

        case AuthActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.SEND_OTP: {
                    return {
                        ...state,
                        error: action.payload.error,
                        otpSent: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.VERIFY_OTP: {
                    return {
                        ...state,
                        error: action.payload.error,
                        otpVerified: false,
                        userLoggedIn: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        registerError: action.payload.error,
                        userSignUp: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.FORGOT_PASSWORD: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        passwordReset: false,
                    };
                }
                default:
                    return { ...state };
            }

        case AuthActionTypes.LOGIN_USER:
            return {
                ...state,
                loading: true,
                userLoggedIn: false,
                error: null,
            };

        case AuthActionTypes.SEND_OTP:
            return {
                ...state,
                loading: true,
                otpSent: false,
                error: null,
            };

        case AuthActionTypes.VERIFY_OTP:
            return {
                ...state,
                loading: true,
                otpVerified: false,
                error: null,
            };

        case AuthActionTypes.SIGNUP_USER:
            return {
                ...state,
                loading: true,
                userSignUp: false,
                registerError: null,
            };

        case AuthActionTypes.LOGOUT_USER:
            return {
                ...state,
                loading: true,
                userLogout: false,
            };

        case AuthActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: null,
                registerError: null,
                userSignUp: false,
                userLoggedIn: false,
                passwordReset: false,
                passwordChange: false,
                otpSent: false,
                otpVerified: false,
                resetPasswordSuccess: null,
            };

        default:
            return { ...state };
    }
};

export default Auth;
