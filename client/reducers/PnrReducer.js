import {
    FETCH_LIST_FAILURE,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_PENDING
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    error: false,
    data: [],
    loading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case FETCH_LIST_PENDING:
        return {
            ...state,
            error: false,
            loading: true
        };

    case FETCH_LIST_SUCCESS:
        return {
            ...state,
            error: false,
            loading: false,
            data: payload
        };

    case FETCH_LIST_FAILURE:
        return {
            ...state,
            error: true,
            loading: false
        };
    default:
        return state;
    }
};
