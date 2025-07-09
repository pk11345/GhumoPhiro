import { AdminLogin, BookedHotel, BookHotelInfo, FetchHotels, FetchImg, hotelId, UserLogin } from "./action";

const initialState = {
    img:[],
    admin:{
        id:"",
        name:"",
        email:""
    },
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
                const adminId = action.payload?._id || "";
                  const name = action.payload?.name || "";
                   const email = action.payload?.email || "";
                return{
                    ...state,
                    admin:{
                        adminId,
                        name,
                        email
                    }
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