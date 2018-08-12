import Axios from 'axios';
import Api from './Api';

describe('Api', () => {
    it('should create a new instance if it\'s already not created', () => {
        Api.singleInstance = undefined;

        expect(Api.singleInstance).not.toBeDefined();

        const publicInstance = Api.instance;

        expect(Api.singleInstance).toBeDefined();
        expect(Api.singleInstance).toEqual(publicInstance);
    });

    it('should use the custom axios instance passed on the constructor', () => {
        const customAxiosInstance = Axios.create();
        const api = new Api(customAxiosInstance);
        expect(api.axios).toBe(customAxiosInstance);
    });
});