import {ListResponseType} from 'src/types/list-response.type';
import {CRUDReducerType} from "src/types/c-r-u-d-reducer.type";
import {FeatureType} from 'src/types/feature.type';
import {UserTypeType} from 'src/types/user-type.type';
import {SelectCompaniesType} from 'src/types/select-companies-type';
import {TaskAssignmentType} from 'src/types/task-assignment.type';
import {TaskAssignmentProjectType} from 'src/types/task-assignment-project.type';
import {TaskAssignmentStaffType} from 'src/types/task-assignment-staff.type';
import {TaskAssignmentTaskType} from 'src/types/task-assignment-task.type';
import {DailyReportType} from 'src/types/daily-report.type';
import {DailyReportHistoryType} from 'src/types/daily-report-history.type';
import {DailyReportProjectType} from 'src/types/daily-report-project.type';
import {DailyReportHistoryFileType} from "src/types/daily-report-history-file.type";

export interface TablesReducerTypes {
    feature: CRUDReducerType<FeatureType, FeatureType[]>;
    user_type: CRUDReducerType<UserTypeType, UserTypeType[], UserTypeType, UserTypeType>;
    select_companies: CRUDReducerType<{}, SelectCompaniesType[]>;
    task_assignment: CRUDReducerType<{}, ListResponseType<TaskAssignmentType>, TaskAssignmentType, TaskAssignmentType>;
    task_assignment_projects: CRUDReducerType<{}, TaskAssignmentProjectType[]>;
    task_assignment_staff: CRUDReducerType<{}, TaskAssignmentStaffType[]>;
    task_assignment_task: CRUDReducerType<{}, TaskAssignmentTaskType[]>;
    task_assignment_file: CRUDReducerType<{}, {}, TaskAssignmentType>;
    daily_report: CRUDReducerType<DailyReportType, ListResponseType<DailyReportType>>;
    daily_report_history: CRUDReducerType<DailyReportHistoryType, ListResponseType<DailyReportHistoryType>, DailyReportHistoryType, DailyReportHistoryType>;
    daily_report_project: CRUDReducerType<{}, DailyReportProjectType[]>;
    daily_report_history_file: CRUDReducerType<{}, {}, DailyReportHistoryFileType>
}
