import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT ,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAIL_RESET ,  } from '../constants/userConstants'
    import axios from "axios";

    export const login = (email,password) => async (dispatch) =>{
        try{
            dispatch({ type: USER_LOGIN_REQUEST });

            const config ={
                headers :{
                    'COntent-type' : 'application/json'
                }
            }

            const { data } = await axios.post(`/api/users/login/`, {
                'username':email,
                'password':password
            },config);
    console.log(data);

    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo',JSON.stringify(data))

        }
        catch (error) {
            dispatch(
              { type: USER_LOGIN_FAIL,payload:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message, }
             
            );
          }
    }

    export const logout = ()=>(dispatch) =>{
      localStorage.removeItem('userInfo')
      dispatch({type:USER_LOGOUT})
      dispatch({type:USER_DETAIL_RESET
    
    
    
    })
    }


    export const register = (name, email, password) => async (dispatch) => {
      try {
          dispatch({
              type: USER_REGISTER_REQUEST
          })
  
          const config = {
              headers: {
                  'Content-type': 'application/json'
              }
          }
  
          const { data } = await axios.post(
              '/api/users/register/',
              { 'name': name, 'email': email, 'password': password },
              config
          )
  
          dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: data
          })
  
          dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data
          })
  
          localStorage.setItem('userInfo', JSON.stringify(data))
  
      } catch (error) {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
          })
      }
  }


  export const getUserDetail =  (id) => async (dispatch,getState) =>{
      try{

       console.log("jayalatha this is from userAction")

        dispatch({
            type: USER_DETAIL_REQUEST
        })

        const {userLogin : {userInfo},} = getState()   //this is for to get the token from loged in user because we kept the updateUserdetail as authendicated
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization :`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/profile/`,
    
            config
        )

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })



      }
      catch (error) {
        console.log("catch the error this is from userAction")
          
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
  }
 

  export const updateUserProfile =  (user) => async (dispatch,getState) =>{
    try{

     console.log("jayalatha this is from userAction")

      dispatch({
          type: USER_UPDATE_PROFILE_REQUEST
      })

      const {userLogin : {userInfo},} = getState()   //this is for to get the token from loged in user because we kept the updateUserdetail as authendicated
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization :`Bearer ${userInfo.token}`
          }
      }

      const { data } = await axios.put(
          `/api/users/profile/update/`,
          user,
          config
      )

      dispatch({
          type: USER_UPDATE_PROFILE_SUCCESS,
          payload: data
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
    })
    localStorage.setItem('userInfo',JSON.stringify(data))



    }
    catch (error) {
      console.log("catch the error this is from userAction")
        
      dispatch({
          type: USER_UPDATE_PROFILE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}
  