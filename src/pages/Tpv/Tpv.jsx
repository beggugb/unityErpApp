import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TpvRouter,TpvRouters } from '../../routes'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu'
import ListaCategoria from "../Categorias/components/ListaCategoria";
import ListaArticulos from "../Articulos/components/ListaArticulos";
import ListaItems from "./components/ListaItems";
import ButtonTpv from "./components/ButtonTpv"
import FormVenta from "./components/FormVenta"
import FormVentas from "./components/FormVentas"
import FormCodigo from "./components/FormCodigo"

const Tpv = () => {
  const dispatch = useDispatch()   
  const { modalView, modalViews } = useSelector(state => state.ventas) 
  const usuario = JSON.parse(localStorage.getItem('@userUnity')) 
  
  const makeHttpRequestWithPage = useCallback(() =>{              
    dispatch(crudActions.GET_ITEM('EMPRESAS_ITEM','empresas',1))    
 },[]) 

 

  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:est})                
  };

  const toggleModalViews = () => {    
    let est = modalViews === true ? false : true;             
    dispatch({type:'VENTAS_VIEWS',view:est})                
  };

  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})  
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={usuario.isCajero ? TpvRouter: TpvRouters}/>

        <Row>
            <Col md="4" className="card-contenido">
              <Row> 
                <Col className="card-contenido-items">
                    <ListaItems/>
                </Col>
              </Row>  
              <Row> 
                  <Col md="12" className="card-contenido-botones">
                    <ButtonTpv/>
                  </Col>
              </Row>  
            </Col>
            <Col md="8" className="card-contenido">
              <FormCodigo/>              
              <Row> 
                <Col>
                  <ListaCategoria/>
                </Col>
              </Row>  
              <Row> 
                <Col md="12" className="card-contenido-productos">
                  <ListaArticulos/>
                </Col>
              </Row>  
            </Col>
        </Row>
        

        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <FormVenta/>
          </ModalBody>
        </Modal>

        <Modal isOpen={modalViews} toggle={toggleModalViews} className="modal-contents">
          <Button className="btn-view btn-danger"  onClick={() => toggleModalViews()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody >
            <FormVentas/>
          </ModalBody>
        </Modal>

      </div>
    </div>    
  )

};
export default Tpv;
