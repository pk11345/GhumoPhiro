import { AdminLogin, BookHotelInfo, FetchHotels, FetchImg } from "./action";

const initialState = {
    img:[],
    admin:"",
    hotels:[],
    userHotelInfo:[]
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

                 case FetchHotels:
                return{
                    ...state,
                    hotels:action.payload
                }
                break;

                case BookHotelInfo:
                return{
                    ...state,
                    userHotelInfo:[...state.userHotelInfo,action.payload]
                }
                break;
    
        default:
            return state
            break;
    }
}