import {LoginType} from './login.action'
import {LogoutTypeAction} from './logout.action'
import {SetStatusActionType} from "../global.actions";
import {CompanySelectActionType} from "./company-select.action";

export * from './login.action';
export * from './logout.action';
export * from './company-select.action';

export type AuthActionType = LoginType | SetStatusActionType | LogoutTypeAction | CompanySelectActionType