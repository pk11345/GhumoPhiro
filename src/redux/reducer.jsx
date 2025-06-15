import { AdminLogin, BookedHotel, BookHotelInfo, FetchHotels, FetchImg, hotelId, UserLogin } from "./action";

const initialState = {
    img:[],
    admin:"",
    user:"",
    hotels:[],
    userHotelInfo:[],
    hotelID :"",
    Bookedhotel:[]
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
                case UserLogin:
                    return{
                        ...state,
                        user:action.payload
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
                    userHotelInfo: [action.payload],
                    
                }
                
                break;

                case hotelId:
                    return  {
                        ...state,
                        hotelID:action.payload
                    }
                    break;

                    case BookedHotel:
                    return  {
                        ...state,
                       Bookedhotel: [...state.Bookedhotel, action.payload],
                    }
                    break;
               
    
        default:
            return state
            break;
    }
}