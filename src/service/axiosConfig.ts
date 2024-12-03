import axios, {InternalAxiosRequestConfig, AxiosInstance} from "axios";
const apiClient:AxiosInstance = axios.create({
    baseURL: process.env.BAE_URL,
})
const axiosConfig = (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem('token')
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
}
apiClient.interceptors.request.use(axiosConfig, (error) => Promise.reject(error) )
export default apiClient;
