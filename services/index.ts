import { axiosInstance } from "@/config/api"

export const fetchedCustomerProfile = async () => {
    const response = await axiosInstance.get("/customers/profile")
    return response.data
}