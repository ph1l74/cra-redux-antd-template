import { setData } from '../actions';


const getDataAux = async (url) =>
    fetch(url)
        .then(r => r.json())



export const getData = () =>
    async dispatch => {
        getDataAux()
            .then(data => {
                dispatch(setData(data));
            })
            .catch(err => console.error(err))
    }