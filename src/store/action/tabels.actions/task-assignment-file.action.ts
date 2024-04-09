import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {TASK_ASSIGNMENT_FILES_URL} from "src/URLS";


export function taskAssignmentFileAction(assignment: string, file: File): CRUDExecuteActionType {
    return ({
        data: {assignment, document: file},
        type: CRUD_EXECUTE,
        action: 'POST',
        name: 'task_assignment_file',
        method: 'POST',
        multipart: true,
        url: `${TASK_ASSIGNMENT_FILES_URL}`
    });
}
