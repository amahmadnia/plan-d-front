import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {DAILY_REPORT_PROJECT_NAME_LIST_URL} from "src/URLS";


export function dailyReportProjectListGetAction(): CRUDExecuteActionType {
    return ({
        type: CRUD_EXECUTE,
        action: 'LIST',
        name: 'daily_report_project',
        method: 'GET',
        url: `${DAILY_REPORT_PROJECT_NAME_LIST_URL}`
    });
}
