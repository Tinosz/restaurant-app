import axios from "axios";


const adminAxiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

adminAxiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ADMIN_ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

adminAxiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
        const {response} = error;
        if (response.status === 401) {
            localStorage.removeItem('ADMIN_ACCESS_TOKEN')  
        }
    throw error;
})

export default adminAxiosClient;