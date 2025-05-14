import axios from "axios"

export const FetchImg = "FetchImg"

export const AdminLogin = "AdminLogin"


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


  // export const isAdmin =  (id)=>({
  //   type:AdminLogin,
  //   payload:id
  // })

  export const isAdmin = ()=>{
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:8000/AdminDashboard", {
          withCredentials: true,
        });
        
        console.log(response.data.name)
        dispatch({
          type: AdminLogin,
          payload: response.data.name,
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