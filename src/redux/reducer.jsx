import { FetchImg } from "./action";

const initialState = []

export const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case FetchImg:
            return action.payload
            break;
    
        default:
            return state
            break;
    }
}