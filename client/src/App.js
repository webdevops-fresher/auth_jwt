import React from 'react';
import './App.css';
import {Provider,connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';



import Register from './components/register';
import Login from './components/login';
import {logout} from './actions/authActions';

class App extends React.Component{
  render(){
    return (
         <div className="App container mt-5">
           <Register/>
           <Login/>
           <Button color="dark" onClick={this.props.logoutUser} style={{marginTop:'2rem'}}>Logout</Button>
           {this.props.authReducerState.token!=null?<h1>Hello world</h1>:null}
         </div>
    );
  }
}
const mapStateToProps=state=>{
  return {
    authReducerState:state.auth
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    logoutUser:()=>dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
