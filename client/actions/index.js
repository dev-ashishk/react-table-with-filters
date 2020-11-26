import {
    FETCH_LIST_FAILURE,
    FETCH_LIST_PENDING,
    FETCH_LIST_SUCCESS
} from "../constants/ActionTypes";

export const fetchList = () => async (dispatch, getState, { api }) => {
    try {
        dispatch({ type: FETCH_LIST_PENDING });
        const res = await api.get("/pnr-list");
        dispatch({
            type: FETCH_LIST_SUCCESS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: FETCH_LIST_FAILURE,
            payload: {}
        });
    }
};