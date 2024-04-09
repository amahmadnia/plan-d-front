import {CRUDType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {DAILY_REPORT_URL} from "src/URLS";


export function dailyReportCRUDAction
({type, id, filter, sort}: {
    type: Exclude<CRUDType, 'edit' | 'delete' | 'new'>;
    id?: string;
    filter?: { project?: string[] },
    sort?: string,
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
        if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'daily_report',
                method: 'GET',
                url: `${DAILY_REPORT_URL}?${query_params}`
            });
        else if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'daily_report',
                method: 'GET',
                url: `${DAILY_REPORT_URL}/${id}`,
            });


    }
}
