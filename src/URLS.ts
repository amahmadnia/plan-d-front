export const LOGIN_URL = '/api/login';
export const SELF_URL = '/api/self';
export const PERMISSIONS_URL = '/api/permissions'
export const SELECT_COMPANIES_URL = '/api/select-companies';

export const TASK_ASSIGNMENTS_URL = '/api/task-assignment';
export const TASK_ASSIGNMENT_PROJECTS_URL = '/api/task-assignment/projects';
export const TASK_ASSIGNMENT_PROJECT_TASKS_URL = (project_id: string) => `/api/task-assignment/${project_id}/tasks`;
export const TASK_ASSIGNMENT_PROJECT_STAFFS_URL = (project_id: string) => `/api/task-assignment/${project_id}/staffs`;
export const TASK_ASSIGNMENT_FILES_URL = '/api/task-assignment/file';

export const DAILY_REPORT_URL = '/api/daily-report';
export const DAILY_REPORT_HISTORY_URL = '/api/daily-report-history';
export const DAILY_REPORT_HISTORY_CREATE_URL = (task_assignment_id: string) => `/api/daily-report-history/${task_assignment_id}/create`;
export const DAILY_REPORT_PROJECT_NAME_LIST_URL = '/api/daily-report/projects-name'
export const DAILY_REPORT_FILES_URL = '/api/daily-report-history/file';

export const FEATURE_URL = '/api/feature';
export const USER_TYPE_URL = '/api/user_type';