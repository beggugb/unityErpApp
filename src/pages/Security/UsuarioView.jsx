import React,{useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { usuarioActions} from "../../actions"

const UsuarioView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  
  useEffect(() => {
  
    return () => {
      console.log('descarga proveedores')
    };
  }, []);
  const logoutt = () => {    
    dispatch(usuarioActions.logout())  
  };
  return(
    <>    
    <div className="user">     
        <div className="fauser">
            <div className="fausere">
                <FontAwesomeIcon icon={faUser} className="fauseri"/>    
            </div>
        </div>        
        <p>Nombre: {usuario.username}</p>        
        <p>Sucursal: {usuario.sucursal.nombre}</p>
        <p>Rol: {usuario.rol.nombre}</p>        
        <Button className="btn btn-danger btn-md" onClick={() => {logoutt()}} >
          Salir <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>       
    </div>    
    </>
  )

};
export default UsuarioView;
