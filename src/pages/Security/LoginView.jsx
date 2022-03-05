import React,{useState} from 'react';
import { Form, FormGroup, Col, Button, Input, ButtonGroup  } from "reactstrap";
import { useDispatch } from 'react-redux'
import { usuarioActions } from '../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";  
export default function LoginView({setToken}) {
    const dispatch = useDispatch() 
    const [user, setUser] = useState({
      username:"",
      password:""
    })
    const handleChange = prop => event => {                         
      setUser({      
          ...user,
          [prop]: event.target.value
      })  
    } 
  
    const submitHandle = event => {       
      event.preventDefault()        
      dispatch(usuarioActions.login(user))
      
   }
   
  return(
    <div className="pos">
      <div className="contenedor">
      <img
          alt="..."
          className="avatari"
          src={require("../../assets/img/logo.png")}
        />

      <div className="login">    
    <Form className="form-login mt-3" onSubmit={submitHandle}>
    <h6>Iniciar Sessión</h6>
    <FormGroup row>
      <Col sm={2} className="io-blue">
        <FontAwesomeIcon icon={faUser} />
      </Col>
      <Col sm={10}>
        <Input
          type="text"
          name="username"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={handleChange("username")}
        />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col sm={2} className="io-blue">
        <FontAwesomeIcon icon={faKey} />
      </Col>
      <Col sm={10}>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          value={user.password}
          onChange={handleChange("password")}
        />
      </Col>
    </FormGroup>
      <div className="button-container">
        <ButtonGroup>
          <Button className="btn-info mt-5 btn-md">
            <FontAwesomeIcon icon={faLock} />
            {' '} Ingresar
          </Button>
        </ButtonGroup>
      </div>
  </Form>
  </div>   
  <div className="about">        
            <img
              alt="..."
              className="avataro"
              src={require("../../assets/img/logob.png")}
              />
            <p>beggu-bo.com</p>            
        </div> 
      </div>
    </div>    
  )
}
