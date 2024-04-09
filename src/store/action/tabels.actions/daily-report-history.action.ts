import {CRUDType, DailyReportHistoryType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {DAILY_REPORT_HISTORY_URL, DAILY_REPORT_HISTORY_CREATE_URL} from "src/URLS";


export function dailyReportHistoryCRUDAction
({type, id, filter, sort, data}: {
    type: CRUDType;
    id?: string;
    filter?: { project?: string[] },
    sort?: string,
    data?: DailyReportHistoryType,
}) {
    let query_params = "";
    if (filter?.project)
        filter.project.forEach((project, index) => {
            if (index)
                query_params += "&";
            query_params += `project=${project}`
        })
    if (sort)
        query_params += `${query_params === "" ? '' : '&'}ordering=${sort}`;
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'daily_report_history',
                method: 'GET',
                url: `${DAILY_REPORT_HISTORY_URL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'daily_report_history',
                method: 'GET',
                url: `${DAILY_REPORT_HISTORY_URL}?${query_params}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'daily_report_history',
                method: 'POST',
                url: DAILY_REPORT_HISTORY_CREATE_URL(id!),
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'daily_report_history',
                method: 'PATCH',
                url: `${DAILY_REPORT_HISTORY_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'daily_report_history',
                method: 'DELETE',
                url: `${DAILY_REPORT_HISTORY_URL}/${id}`,
                data: id!,
            });


    }
}
