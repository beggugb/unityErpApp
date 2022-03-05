import React,{useState, useCallback, useEffect} from "react";
import TableProveedores from "./components/TableProveedores";
import SearchProveedores from "./components/SearchProveedor";
import EditProveedores from "./components/EditProveedor";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu.jsx';
import { CompraRouter } from '../../routes'
import ProveedorResumen from "./components/ProveedorResumen";

const ProveedoresView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.proveedores)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'PROVEEDORES_VIEW',view:est})   
    dispatch({type:'PROVEEDORES_INDICADOR',value:0})             
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchProveedores getComponent={getComponent}/><TableProveedores getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'PROVEEDORES_RESET_ITEM'}) 
          setComponent(<EditProveedores getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM('PROVEEDORES_ITEM','proveedores',key)) 
          setComponent(<EditProveedores getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga proveedores')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={CompraRouter} prop='Proveedores'/>         
        {component}  
        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ProveedorResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default ProveedoresView;
