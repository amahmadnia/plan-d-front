import {default as axios, AxiosRequestConfig, AxiosResponse} from 'axios';
import {rootStore} from 'src/store';

export default {
    headers() {
        const {
            authReducer: {
                token,
                status,
                company,
            },
        } = rootStore.getState();
        const header: any = {};
        if (token && status === 'ok') {
            header.Authorization = 'JWT ' + token;
        }
        if (company)
            header['B-COMPANY'] = company;
        return header;
    },

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        config = {...config, headers: {...(config.headers ? config.headers : {}), ...this.headers()}};
        return axios.request(config);
    },
};
