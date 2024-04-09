import {TaskAssignmentTaskType} from './task-assignment-task.type';
import {TaskAssignmentProjectType} from "./task-assignment-project.type";
import {TaskAssignmentStaffType} from "./task-assignment-staff.type";
import {SprintType} from "./sprint.type";

export type TaskAssignmentType = {
    id?: string;
    weight: number;
    note: string;
    deadline: string;
    task_obj?: TaskAssignmentTaskType;
    project_obj?: TaskAssignmentProjectType;
    responsible_obj?: TaskAssignmentStaffType;
    sprints: SprintType[];
    baseline_task?: string;
    staff?: string;
    file?: string;
}