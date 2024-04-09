import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {SELECT_COMPANIES_URL} from "src/URLS";


export function selectCompanyAction(): CRUDExecuteActionType {
    return {
        type: CRUD_EXECUTE,
        action: 'LIST',
        name: 'select_companies',
        method: 'GET',
        url: SELECT_COMPANIES_URL,
    }
}
