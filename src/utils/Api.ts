import Axios, { AxiosInstance } from 'axios';
import config from './config';

class Api {
    public static singleInstance?: Api
    public axios: AxiosInstance

    static get instance(): Api {
        if (!this.singleInstance) {
            this.singleInstance = new Api();
        }

        return this.singleInstance;
    }

    constructor(axios?: AxiosInstance) {
        if (!axios) {
            this.axios = Axios.create({
                baseURL: config.IEX_API_URL,
            });
        } else {
            this.axios = axios;
        }
    }

    public getStocks() {
        return this.axios.get('/stock/market/list/gainers');
    }
}

export default Api;