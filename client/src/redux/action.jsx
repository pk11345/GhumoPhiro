import axios from "axios"

export const FetchImg = "FetchImg"

export const AdminLogin = "AdminLogin"

export const FetchHotels = "FetchHotels"

export const UserLogin = "UserLogin"

export const BookHotelInfo = "BookHotelInfo"

export const hotelId = "hotelId"

export const BookedHotel = "BookedHotel" 

export const ImgFetch = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("https://ghumophiro.onrender.com/AdminDashboard", {
          withCredentials: true,
        });
        
        // console.log(response.data.admin.hotels)
        dispatch({
          type: FetchImg,
          payload: response.data.admin.hotels,
        });
      } catch (error) {
        console.error("Error fetching images:", error);
  
        dispatch({
          type: FetchImg,
          payload: [], 
        });
      }
    };
  };



  export const isAdmin = ()=>{
    return async (dispatch) => {
      try {
        const response = await axios.get("https://ghumophiro.onrender.com/AdminDashboard", {
          withCredentials: true,
        });
        
        console.log(response.data.admin.name)
        dispatch({
          type: AdminLogin,
          payload: response.data.admin,
        });
      } catch (error) {
        console.error("Error fetching name:", error);
  
        dispatch({
          type: AdminLogin,
          payload: {}, 
        });
      }
    };
  }



  export const isFetchingHotels = ()=>{
    return  async(dispatch)=>{
      try{
        const res = await axios.get("https://ghumophiro.onrender.com/getHotels", {
          withCredentials: true,
        });
        dispatch({
          type:FetchHotels,
          payload:res.data
        })
      } catch(err){
         console.error("Error fetching name:", err);
  
        dispatch({
          type: FetchHotels,
          payload: "", 
        });
      }
    }
  }

  export const isUser = ()=>{
    return async (dispatch) => {
      try {
        const response = await axios.get("https://ghumophiro.onrender.com/UserDashboard", {
          withCredentials: true,
        });
        
        console.log(response.data.name)
        dispatch({
          type: UserLogin,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching name:", error);
  
        dispatch({
          type: UserLogin,
          payload: "", 
        });
      }
    };
  }

 export const UserHotelInfo = (StartDate,EndDate, Location, Guests) => ({
  type: BookHotelInfo,
  payload: {
    StartDate,
    EndDate,
    Location,
    Guests
  }
});

export const HotelId = (id)=>({
  type:hotelId,
  payload:id
})


export const bookedHotel = (bookingInfo)=>({
  type:BookedHotel,
  payload:bookingInfo
})
