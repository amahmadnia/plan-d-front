import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {TASK_ASSIGNMENT_PROJECTS_URL} from "src/URLS";


export function taskAssignmentProjectGetAction
(): CRUDExecuteActionType {
    return ({
        type: CRUD_EXECUTE,
        action: 'LIST',
        name: 'task_assignment_projects',
        method: 'GET',
        url: `${TASK_ASSIGNMENT_PROJECTS_URL}`
    });
}
