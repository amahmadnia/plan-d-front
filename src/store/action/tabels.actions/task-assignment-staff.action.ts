import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {TASK_ASSIGNMENT_PROJECT_STAFFS_URL} from "src/URLS";


export function taskAssignmentStaffGetAction(project: string): CRUDExecuteActionType {
    return ({
        type: CRUD_EXECUTE,
        action: 'LIST',
        name: 'task_assignment_staff',
        method: 'GET',
        url: `${TASK_ASSIGNMENT_PROJECT_STAFFS_URL(project)}`
    });
}
