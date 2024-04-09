import {AuthReducerType} from "./auth-reducer.types";
import {authReducerInit} from "./auth-reducer.init";
import {AuthActionType, LOGIN, LOGOUT, SET_COMPANY_AND_PERMISSIONS} from "../../action";
import {SET_STATUS} from "../../action/global.actions";


export function authReducer(state: AuthReducerType = authReducerInit(), action: AuthActionType): AuthReducerType {

    switch (action.type) {
        case LOGIN:
            return {...action.payload, status: 'ok'};
        case LOGOUT:
            return authReducerInit();
        case SET_COMPANY_AND_PERMISSIONS:
            return {...state, company: action.payload.id, permissions: action.payload.permissions};
        case SET_STATUS:
            switch (action.action) {
                case LOGIN:
                    return {...state, status: action.payload};
            }
        default :
            return state;
    }
}