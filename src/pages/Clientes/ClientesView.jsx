import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../actions'
import ClienteResumen from "./components/ClienteResumen";
import TableClientes from "./components/TableClientes";
import SearchCliente from "./components/SearchCliente";
import EditCliente from "./components/EditCliente";

const ClienteView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.clientes)  
 
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'CLIENTES_VIEW',view:est})  
                 
  };

  const getComponent = useCallback((io, key) =>{        
      switch(io){
        case 'data':
          setComponent(<><SearchCliente getComponent={getComponent}/><TableClientes getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'CLIENTES_RESET_ITEM'}) 
          setComponent(<EditCliente getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM('CLIENTES_ITEM','clientes',key)) 
          setComponent(<EditCliente getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)
    return () => {
      console.log('exit clients view')
    };
  }, []);

  return(
    <>    
    <div className="content">        
      <div className="main-contenido">             
          {component}          
        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ClienteResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default ClienteView;
