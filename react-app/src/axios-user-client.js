import axios from "axios";

const userAxiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

userAxiosClient.interceptors.request.use((config) => {
    return config
})

userAxiosClient.interceptors.response.use((response) => {
    return response;
}), (error) => {
    throw error;
}

export default userAxiosClient;