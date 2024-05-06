import api from '../../config/axiosconfig'
import { FETCH_NOTIFICATIONS } from '../actions/types'

export const fetchnotifications = () => async (dispatch) => {
    try {
        const res = await api.get('/api/notifications')
        console.log("res.data", res.data)
        dispatch({ type: FETCH_NOTIFICATIONS, payload: res.data })
    } catch (error) {
        console.log("res")
        console.error(error)
    }
}