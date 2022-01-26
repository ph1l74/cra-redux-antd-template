import * as types from '../types';


export const setData = (value) => {
    return {
        type: types.SET_DATA,
        value
    }
}
