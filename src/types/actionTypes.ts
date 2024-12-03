export const SET_DATA = 'SET_DATA'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

interface SetDataAction {
    type: typeof SET_DATA;
    payload: string
}

interface FetchDataRequestAction {
    type: typeof FETCH_DATA_REQUEST
}

interface FetchDataSuccessAction {
    type: typeof FETCH_DATA_SUCCESS
    payload: string
}

interface FetchDataFailureAction {
    type: typeof FETCH_DATA_FAILURE
    error: string,
}

export type MyActionTypes =
    | SetDataAction
    | FetchDataFailureAction
    | FetchDataRequestAction
    | FetchDataSuccessAction
