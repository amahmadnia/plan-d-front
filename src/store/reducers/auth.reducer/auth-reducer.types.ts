import {ErrorMessageType, PermissionsType, PermissionType, StatusType, UserType} from "src/types";

export interface AuthReducerType {
    message?: ErrorMessageType;
    status?: StatusType;
    token?: string;
    user?: UserType;
    permissions?: PermissionsType;
    company?: string;
}