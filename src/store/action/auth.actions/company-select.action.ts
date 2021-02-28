export const COMPANY_SELECT = '[auth reducer] Company Select';
export type CompanySelectActionType = { type: typeof COMPANY_SELECT, payload: string }

export function companySelectAction(company: string): CompanySelectActionType {
    localStorage.setItem('company', company)
    return {
        type: COMPANY_SELECT,
        payload: company,
    }
}