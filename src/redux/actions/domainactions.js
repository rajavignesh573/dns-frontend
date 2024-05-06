import api from '../../config/axiosconfig'
import { FETCH_DOMAINS, ADD_DOMAIN, DELETE_DOMAIN } from '../actions/types'

export const fetchdomains = () => async (dispatch) => {
    try {
        const res = await api.get('/api/hostedzones')
        console.log("res.data", res.data)
        dispatch({ type: FETCH_DOMAINS, payload: res.data })
    } catch (error) {
        console.log("res")
        console.error(error)
    }
}

export const adddomain = (data) => async (dispatch) => {
    try {
        const res = await api.post('/api/hostedzones', data)
        console.log("res.data", res.data)
        dispatch({ type: ADD_DOMAIN, payload: res.data })
    } catch (error) {
        console.log("res")
        console.error(error)
    }
}

export const deletedomain = (data) => async (dispatch) => {
    // console.log("data", data.Id)
    try {
        const res = await api.delete(`/api/hostedzones/${data.Id}`)
        // console.log("res.data", res.data)
        dispatch({ type: DELETE_DOMAIN, payload: data.Id })
    } catch (error) {
        console.log("res")
        console.error(error)
    }
}
