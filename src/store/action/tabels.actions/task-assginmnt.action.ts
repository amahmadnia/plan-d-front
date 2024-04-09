import {CRUDType, TaskAssignmentType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {TASK_ASSIGNMENTS_URL} from "src/URLS";


export function taskAssignmentCRUDAction
({data, type, id, filter, sort}: {
    type: Exclude<CRUDType, 'one'>;
    data?: TaskAssignmentType & { id?: string };
    id?: string;
    filter?: { sprints_date_gt?: string, sprints_date_lt?: string },
    sort?: string,
}) {
    let query_params = "";
    if (filter?.sprints_date_gt && filter.sprints_date_lt)
        query_params = `sprint_start=${filter.sprints_date_gt}&sprint_end=${filter.sprints_date_lt}`
    if (sort)
        query_params += `${query_params === "" ? '?' : '&'}ordering=${sort}`;
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'task_assignment',
                method: 'GET',
                url: `${TASK_ASSIGNMENTS_URL}?${query_params}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'task_assignment',
                method: 'POST',
                url: `${TASK_ASSIGNMENTS_URL}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'task_assignment',
                method: 'PATCH',
                url: `${TASK_ASSIGNMENTS_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'task_assignment',
                method: 'DELETE',
                url: `${TASK_ASSIGNMENTS_URL}/${id}`,
                data: id,
            });


    }
}
