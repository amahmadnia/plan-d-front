import {ProjectTeamType, RootStateType} from "src/types";
import {
    taskAssignmentCRUDAction,
    taskAssignmentProjectGetAction,
    taskAssignmentStaffGetAction,
    taskAssignmentTaskGetAction,
    taskAssignmentFileAction
} from "src/store/action";
import {setDataAction} from "src/store/action/global.actions";

import {connect, ConnectedProps} from "react-redux";
import {Dayjs} from "dayjs";
import {Item} from "./task-assignment-editable.cell";

const mapStateToProps = (state: RootStateType) => {
    const task_assignment = state.tablesReducer.task_assignment;
    const projects = state.tablesReducer.task_assignment_projects;
    const task = state.tablesReducer.task_assignment_task;
    const staff = state.tablesReducer.task_assignment_staff;
    const file = state.tablesReducer.task_assignment_file;
    return {task_assignment, projects, staff, task, file};
};

const mapDispatchToProps = {
    task_assignment_action: taskAssignmentCRUDAction,
    projects_action: taskAssignmentProjectGetAction,
    staff_action: taskAssignmentStaffGetAction,
    task_action: taskAssignmentTaskGetAction,
    file_action: taskAssignmentFileAction,
    set_data: setDataAction
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropType = ConnectedProps<typeof connector>;

export type StateType = {
    edit?: number,
    new: boolean,
    post?: ProjectTeamType['post'],
    project?: string,
    date: Dayjs,
    sort?: string,
    task?:string;
    maxDeadline: undefined | Dayjs
};

type ExcludeItem = { [key in Exclude<keyof Item, 'sprints' | 'deadline' | 'staff' | 'baseline_task' | 'id'>]: Item[key] extends string | number ? Item[key] : string; }
type NewItem = {
    id?: string,
    sunday: Dayjs,
    monday: Dayjs,
    tuesday: Dayjs,
    wednesday: Dayjs,
    thursday: Dayjs,
    friday: Dayjs,
    saturday: Dayjs,
    deadline: Dayjs,
}
export type  FormType = ExcludeItem & NewItem;
