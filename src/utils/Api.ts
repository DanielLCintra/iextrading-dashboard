import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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

  public getStocks(reqConfig?:AxiosRequestConfig) {
    return this.axios.get('/stock/market/list/gainers', reqConfig);
  }

  public getCompany(symbol:string, reqConfig?:AxiosRequestConfig) {
    return this.axios.get(`/stock/${symbol}/company`, reqConfig);
  }

  public getChart(symbol:string, reqConfig?:AxiosRequestConfig) {
    return this.axios.get(`/stock/${symbol}/chart/dynamic`, reqConfig);
  }

  public getSymbols(reqConfig?:AxiosRequestConfig) {
    return this.axios.get('/ref-data/symbols', reqConfig);
  }
}

export default Api;
