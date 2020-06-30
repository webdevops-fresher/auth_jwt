import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Label,
  Input,
  Container,
  Form,
  FormGroup,
  Alert
} from "reactstrap";
import React from "react";
import {connect} from 'react-redux';



import {registerUser,clearErrors} from '../actions/authActions';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      open: false,
      msg:''
    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open });
    this.props.clearErrorMsgs();
  };
  onChange=(event)=>{
      this.setState({[event.target.name]:event.target.value});
  }
  onSubmit=(event)=>{
      event.preventDefault();
      const newUser={email:this.state.email,password:this.state.password};
      this.props.register(newUser);
  }



  render() {
    const { open } = this.state;
    const {error}=this.props.authState
    return (
      <div className="container">
        <Button color="dark" onClick={this.toggle}>
          Register
        </Button>
        <Modal isOpen={open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
              {error!=null?<Alert>{error.message}</Alert>:null}
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                onChange={this.onChange}
                placeholder="enter email"
              />

              <Label for="password">password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.onChange}
                placeholder="enter password"
              />
              <Button style={{marginTop:'2rem'}} color="dark">Register</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps=state=>{
    return {
        authState:state.auth
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        register:(newUser)=> dispatch(registerUser(newUser)),
        clearErrorMsgs:()=>dispatch(clearErrors())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);

