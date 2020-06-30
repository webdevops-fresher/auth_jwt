import axios from 'axios';

export const registerUser=(newUser)=>{
    return dispatch=>{
        axios.post('http://localhost:3002/api/users',newUser)
        .then(response=>{
            dispatch({type:'REGISTER_SUCCESS',payload:response})
        })
        .catch(err=>{
            dispatch({type:'REGISTER_FAILED',payload:err.response.data})
        })
    }
}


export const login=(loginCredentials)=>{
    console.log(loginCredentials);
    return dispatch=>{
        axios.post('http://localhost:3002/api/auth',loginCredentials)
        .then(response=>{
            console.log(response);
            dispatch({type:'USER_LOADED',payload:response.data})
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({type:'LOGIN_FAILED',payload:err.response.data.message})
        })
    }
}


export const logout=()=>{
    return dispatch=>{
        dispatch({type:'LOGOUT_SUCCESS',payload:null})
    }
}


export const clearErrors=()=>{
    return dispatch=>{
        dispatch({type:'CLEAR_ERRORS'})
    }
}