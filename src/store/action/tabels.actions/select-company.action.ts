import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {SELECT_COMPANIES_URL} from "src/URLS";


export function selectCompanyAction():CRUDExecuteActionType {
    return {
        type: CRUD_EXECUTE,
        action: 'GET',
        name: 'company_list',
        method: 'GET',
        url: COMPANIES_URL,
    }
}
