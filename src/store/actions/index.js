import * as types from '../types';


export const setLoading = (value) => {
    return {
        type: types.SET_IS_LOADING,
        value
    }
}


export const setData = (value) => {

    let parsedData = {};

    for (const doc of value) {
        parsedData = { ...parsedData, ...doc }
    }

    return {
        type: types.SET_DATA,
        value: parsedData
    }
}
