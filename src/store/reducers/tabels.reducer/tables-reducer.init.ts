import {TablesReducerTypes} from "./tables-reducer.types";

export const tablesReducerInit = (): TablesReducerTypes => ({
        feature: {},
        user_type: {},
        select_companies: {},
        task_assignment: {},
        task_assignment_projects: {},
        task_assignment_staff: {},
        task_assignment_task: {},
        task_assignment_file: {},
        daily_report: {},
        daily_report_history: {},
        daily_report_project: {},
        daily_report_history_file: {}
    }
)