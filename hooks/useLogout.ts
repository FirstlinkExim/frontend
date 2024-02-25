import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import { AxiosError } from 'axios'
import { handleApiError } from '@/utils/handleApiError'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { removeFromLocalStorage } from '@/config/localstorage'
import { useAppDispatch } from '@/redux/hooks'
import { logOut } from '@/redux/slices/customerSlice'

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const logout = async () => {
    try {
      await axiosPrivate.post('/customers/logout')
      removeFromLocalStorage("firstlinks_access_token")
      dispatch(logOut())
      toast.success("Logged out successfully")
      router.push("/login");
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message)
    }
  }
  return logout
}

export default useLogout