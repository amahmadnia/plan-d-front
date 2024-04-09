import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {TASK_ASSIGNMENT_PROJECT_TASKS_URL} from "src/URLS";


export function taskAssignmentTaskGetAction(project:string): CRUDExecuteActionType {
    return ({
        type: CRUD_EXECUTE,
        action: 'LIST',
        name: 'task_assignment_task',
        method: 'GET',
        url: `${TASK_ASSIGNMENT_PROJECT_TASKS_URL(project)}`
    });
}
