import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.139.151:9000/api'
});

export default apiClient;