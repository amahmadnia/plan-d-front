import {UserTypeActionType} from "./user-type-action.type";

export type UserTypeType = {
    id: string;
    title: string;
    type_actions: UserTypeActionType[];
}