import {DailyReportHistorySheetsType} from "./daily-report-history-sheets.type";
import {DailyReportHistoryFileType} from "./daily-report-history-file.type";

export type  DailyReportHistoryType = {
    id?: string;
    project?: string;
    task?: string;
    responsible?: string;
    deadline?: string;
    baseline_task?: string;
    today_progress: number;
    progress?: number;
    date: string;
    sheets?: DailyReportHistorySheetsType[];
    description?: string;
    files?: DailyReportHistoryFileType[];

}