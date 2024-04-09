import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {DAILY_REPORT_FILES_URL} from "src/URLS";


export function dailyReportHistoryFileAction(report: string, file: File, title: string): CRUDExecuteActionType {
    return ({
        data: {report, document: file, attachment_title: title},
        type: CRUD_EXECUTE,
        action: 'POST',
        name: 'daily_report_history_file',
        method: 'POST',
        multipart: true,
        url: `${DAILY_REPORT_FILES_URL}`
    });
}
