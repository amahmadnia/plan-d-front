export type DailyReportType = {
    id?: string;
    project: string;
    task: string;
    file: string;
    deadline: string;
    progress: number;
    note: null | string;
}