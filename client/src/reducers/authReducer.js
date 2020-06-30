const initialState={
    token:localStorage.getItem('token'),
    isLoading:false,
    isAuthenticated:false,
    user:null,
    error:null
}


const authReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    console.log(payload);
    switch(type){
        case 'USER_LOADING':
            return {...state,isLoading:true}
        case 'USER_LOADED':
            localStorage.setItem('token',payload.token);
            return {...state,isLoading:false,isAuthenticated:true,user:action.payload.user,token:payload.token,error:{message:'Logged In'}}
        case 'REGISTER_SUCCESS':
            return {...state,isLoading:false,isAuthenticated:true,...action.payload,error:{message:'Successfully Registered'}}
        case 'LOGIN_FAILED':
        case 'REGISTER_FAILED':
        case 'AUTH_ERROR':
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('token');
            return {...state,isLoading:false,isAuthenticated:false,token:null,error:{message:payload}};
        case 'CLEAR_ERRORS':
            return {...state,error:null}
        default:
            return state;
    }
}


export default authReducer;