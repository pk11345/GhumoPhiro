import { AdminLogin, FetchImg } from "./action";

const initialState = {
    img:[],
    admin:""
}


export const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case FetchImg:
            return {
                ...state,
                img:action.payload
            }
            break;

            case AdminLogin:
                return{
                    ...state,
                    admin:action.payload
                }
                break;
    
        default:
            return state
            break;
    }
}