import {Dispatch} from "redux";
import {http} from 'src/lib';
import {PERMISSIONS_URL} from 'src/URLS';
import {PermissionsType} from 'src/types';
import {AxiosError} from "axios";
import {setStatusAction, SetStatusActionType} from "../global.actions";
import {Modal} from "antd";

export const SET_COMPANY_AND_PERMISSIONS = '[auth reducer] Set Company And Permissions';
export type CompanySelectActionType = { type: typeof SET_COMPANY_AND_PERMISSIONS, payload: { id: string, permissions: PermissionsType } }

export function companySelectAction(company: string) {
    return async (dispatch: Dispatch<CompanySelectActionType | SetStatusActionType>) => {
        try {
            const response = await http.request({url: PERMISSIONS_URL, headers: {'B-COMPANY': company}})
            dispatch({
                type: SET_COMPANY_AND_PERMISSIONS,
                payload: {id: company, permissions: response.data},
            });
            localStorage.setItem('company_and_permissions', JSON.stringify({company, permissions: response.data}));

        } catch (e) {
            const error = e as AxiosError;
            dispatch(setStatusAction(SET_COMPANY_AND_PERMISSIONS, "error"))
            Modal.error({
                title: error.response?.status === 400 ? 'اطلاعات وارد شده صحیح نمیباشد' : 'مشکل نامشخی به وجود آمده است.',
                direction: 'rtl',
                bodyStyle: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                    flexFlow: 'wrap',
                    direction: 'rtl'
                },
            });
        }

    }

}