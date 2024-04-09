import {AuthReducerType} from "./auth-reducer.types";
import {PermissionsType} from "src/types";

type CAP = { permissions: PermissionsType, company: string };

export const authReducerInit = (): AuthReducerType => {
    const storage: any = localStorage.getItem('auth_data');
    let cap: string | CAP | null = localStorage.getItem('company_and_permissions');
    const initData: AuthReducerType = storage ? {status: 'ok', ...JSON.parse(storage)} : {
        status: undefined,
    };
    if (cap) {
        cap = <CAP>JSON.parse(cap);
        initData['company'] = cap.company;
        initData['permissions'] = cap.permissions
    }

    return initData
}