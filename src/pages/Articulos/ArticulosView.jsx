import React,{useState, useCallback, useEffect} from "react";
import TableArticulos from "./components/TableArticulos";
import SearchArticulos from "./components/SearchArticulo";
import EditArticulos from "./components/EditArticulo";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import ArticuloResumen from "./components/ArticuloResumen";
import ArticuloEtiquetas from "./components/ArticuloEtiquetas";
import ArticuloQr from "./components/ArticuloQr";

const ArticulosView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView, modalViews,modalViewq } = useSelector(state => state.articulos)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'ARTICULOS_VIEW',view:est})                
  };

  const toggleModalViews = () => {    
    let est = modalViews === true ? false : true;             
    dispatch({type:'ARTICULOS_BARRAS',view:est})                
  };

  const toggleModalViewq = () => {    
    let est = modalViewq === true ? false : true;             
    dispatch({type:'ARTICULOS_QR',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchArticulos getComponent={getComponent}/><TableArticulos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'ARTICULOS_RESET_ITEM'}) 
          setComponent(<EditArticulos getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('ARTICULOS_ITEM','articulos',key)) 
          setComponent(<EditArticulos getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)
    return () => {
      console.log('descarga articulos')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">   
      <SubMenu items={InventarioRouter} prop='Inventario'/>     
        {component}  
        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ArticuloResumen/>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalViews} toggle={toggleModalViews}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalViews()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ArticuloEtiquetas/>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalViewq} toggle={toggleModalViewq}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalViewq()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ArticuloQr/>
          </ModalBody>
        </Modal>

      </div>
    </div>    
    </>
  )

};
export default ArticulosView;
