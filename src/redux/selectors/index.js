import { store } from '../store'

export function getToken(){
    try {
        return store.getState().authReducer
    } catch (error) {
    }
}