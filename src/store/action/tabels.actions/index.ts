import {CRUDExecuteActionType, CRUDSetDataActionType, CRUDSetErrorActionType} from "../global.actions";
import {LogoutTypeAction} from "../auth.actions";


export * from './feature.action';
export * from './user-type.action';
export * from './select-company.action';
export * from './task-assginmnt.action';
export * from './task-assignment-projects.action';
export * from './task-assignment-task.action';
export * from './task-assignment-staff.action';
export * from './task-assignment-file.action';
export * from './daily-report.action';
export * from './daily-report-project.action';
export * from './daily-report-history.action';
export * from './daily-report-history-file.action';

export type UserActionsType = CRUDExecuteActionType | CRUDSetDataActionType | CRUDSetErrorActionType | LogoutTypeAction;