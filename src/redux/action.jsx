import axios from "axios"

export const FetchImg = "FetchImg"

export const AdminLogin = "AdminLogin"

export const FetchHotels = "FetchHotels"

export const BookHotelInfo = "BookHotelInfo"


export const ImgFetch = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:8000/AdminDashboard", {
          withCredentials: true,
        });
        
        console.log(response.data.images)
        dispatch({
          type: FetchImg,
          payload: response.data.images,
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
        const response = await axios.get("http://localhost:8000/AdminDashboard", {
          withCredentials: true,
        });
        
        console.log(response.data.name)
        dispatch({
          type: AdminLogin,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching name:", error);
  
        dispatch({
          type: AdminLogin,
          payload: "", 
        });
      }
    };
  }


  export const isFetchingHotels = ()=>{
    return  async(dispatch)=>{
      try{
        const res = await axios.get("http://localhost:8000/getHotels", {
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

 export const UserHotelInfo = (StartDate,EndDate, Location, Guests) => ({
  type: BookHotelInfo,
  payload: {
    StartDate,
    EndDate,
    Location,
    Guests
  }
});
