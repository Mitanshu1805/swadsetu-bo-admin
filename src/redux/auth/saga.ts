import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { login as loginApi } from '../../helpers/api/auth'; // Import login API function
import { APICore, setAuthorization } from '../../helpers/api/apiCore'; // Import API helpers
import { authApiResponseSuccess, authApiResponseError } from './actions'; // Import action creators
import { AuthActionTypes } from './constants'; // Import AuthActionTypes enum
import { SagaIterator } from '@redux-saga/core'; // Import SagaIterator for typing

// Create an instance of APICore for setting the logged-in user and auth token
const api = new APICore();

// Define the type for the action
interface LoginAction {
    type: string; // The action type will be a string (e.g., LOGIN_USER)
    payload: {
        email: string;
        password: string;
    };
}

/**
 * The login saga
 */
function* login({ payload: { email, password }, type }: LoginAction): SagaIterator {
    try {
        // Call loginApi using yield
        const response = yield call(loginApi, { email, password });
        const user = response.data; // Assuming the API returns user data in response.data

        // Store the token in localStorage
        localStorage.setItem('auth_token', user.token);

        // Optionally store the user data
        api.setLoggedInUser(user);

        // Set Authorization header globally for future requests
        setAuthorization(user.token);

        // Dispatch the success action with the user data
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error: unknown) {
        // Type-cast the error to string (or adjust based on your error structure)
        yield put(
            authApiResponseError(AuthActionTypes.LOGIN_USER, error instanceof Error ? error.message : String(error))
        );

        // Optionally clear the user data on failure
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

// Watch for the LOGIN_USER action
function* watchLoginUser(): SagaIterator {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login); // Start the login saga when LOGIN_USER action is dispatched
}

// Root saga to combine all watchers
export default function* rootSaga() {
    yield all([fork(watchLoginUser)]);
}

// import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
// import { SagaIterator } from '@redux-saga/core';

// // apicore
// import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// // helpers
// import {
//     login as loginApi,
//     logout as logoutApi,
//     signup as signupApi,
//     forgotPassword as forgotPasswordApi,
// } from '../../helpers/';

// // actions
// import { authApiResponseSuccess, authApiResponseError } from './actions';

// // constants
// import { AuthActionTypes } from './constants';

// type UserData = {
//     payload: {
//         username: string;
//         password: string;
//         fullname: string;
//         email: string;
//     };
//     type: string;
// };

// const api = new APICore();

// interface LoginAction {
//     type: string; // The action type will be a string (e.g., LOGIN_USER)
//     payload: {
//         email: string;
//         password: string;
//     };
// }

// /**
//  * Login the user
//  * @param {*} payload - username and password
//  */
// // function* login({ payload: { email, password }, type }: UserData): SagaIterator {
// //     try {
// //         const response = yield call(loginApi, { email, password });
// //         const user = response.data;
// //         // NOTE - You can change this according to response format from your api
// //         api.setLoggedInUser(user);
// //         setAuthorization(user['token']);
// //         yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
// //     } catch (error: any) {
// //         yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
// //         api.setLoggedInUser(null);
// //         setAuthorization(null);
// //     }
// // }

// function* login({ payload: { email, password } }: { payload: { email: string; password: string } }): SagaIterator {
//     try {
//         // Call the login API with email and password
//         const response = yield call(loginApi, { email, password });

//         const user = response.data; // Extract user info from the response (assuming response contains 'data')

//         // Store the user and authorization token
//         api.setLoggedInUser(user);
//         setAuthorization(user.token);

//         // Dispatch success action with the user info
//         yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
//     } catch (error: any) {
//         // Handle the error, dispatch failure action
//         yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));

//         // Reset the user state and authorization token
//         api.setLoggedInUser(null);
//         setAuthorization(null);
//     }
// }

// /**
//  * Logout the user
//  */
// function* logout(): SagaIterator {
//     try {
//         yield call(logoutApi);
//         api.setLoggedInUser(null);
//         setAuthorization(null);
//         yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
//     } catch (error: any) {
//         yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
//     }
// }

// function* signup({ payload: { fullname, email, password } }: UserData): SagaIterator {
//     try {
//         const response = yield call(signupApi, { fullname, email, password });
//         const user = response.data;
//         // api.setLoggedInUser(user);
//         // setAuthorization(user['token']);
//         yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
//     } catch (error: any) {
//         yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
//         api.setLoggedInUser(null);
//         setAuthorization(null);
//     }
// }

// function* forgotPassword({ payload: { email } }: UserData): SagaIterator {
//     try {
//         const response = yield call(forgotPasswordApi, { email });
//         yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
//     } catch (error: any) {
//         yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
//     }
// }
// // export function* watchLoginUser() {
// //     yield takeEvery(AuthActionTypes.LOGIN_USER, login);
// // }
// export function* watchLoginUser(): SagaIterator {
//     yield takeEvery<AuthActionTypes.LOGIN_USER, LoginAction>(AuthActionTypes.LOGIN_USER, login); // Type the action here
// }

// export function* watchLogout() {
//     yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
// }

// export function* watchSignup(): any {
//     yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
// }

// export function* watchForgotPassword(): any {
//     yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
// }

// function* authSaga() {
//     yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)]);
// }

// export default authSaga;
