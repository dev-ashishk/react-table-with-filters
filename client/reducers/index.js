import { combineReducers } from "redux";
import PnrReducer from "./PnrReducer";

export default combineReducers({
    list: PnrReducer
});
