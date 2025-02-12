import axios, {InternalAxiosRequestConfig, AxiosInstance} from "axios";
const apiClient:AxiosInstance = axios.create({
    baseURL: 'http://localhost:6969',
    timeout: 1500,
})

const axiosConfig = (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem('token')
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
}

apiClient.interceptors.request.use(axiosConfig,
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        if (response.data?.token) {
            localStorage.setItem('token', response.data.jwt)
            window.dispatchEvent(new Event("authChange"))
        }
        return response.data;

    },
    (error) => {
        return Promise.reject(error);
    },
);
export default apiClient;
