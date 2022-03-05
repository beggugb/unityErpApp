import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Row,Col,Form, ButtonGroup, FormGroup, Input, Card, Button  } from "reactstrap"
import { cajaActions, crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCheck, faLock, faEdit, faPlus, faTicketAlt, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import CajasItemsDetalle from './CajasItemsDetalle'
import CajasConsolidado from "./CajasConsolidado";
import { Link } from "react-router-dom";

const EditCaja = () => {
    const dispatch = useDispatch()  
    const {total, indicador, estado }= useSelector(state => state.cajas)     
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const [view, setview] = useState(false);
    const [views, setviews] = useState(false);
    const [viewx, setviewx] = useState(false);
    const [value, setValue] = useState();

    const changeHandler = event => {    
      const { value } = event.target               
      setValue(value)
  }
      
    const submitHandle = event => {       
      event.preventDefault()    
      let dat = {}
      dat.monto = parseInt(value)
      dat.usuarioId = usuario.id
      dispatch(crudActions.SET_ADD('CAJAS_DATA','cajas',dat,'lista'))  
      dispatch({ type: 'RESET_CAJA' });        
      setValue('')      
   }
  const viewCaja = (pky) => {     
    if(pky === 'resumen'){
      let est = view === true ? false : true;             
      setview(est)
    } else{
      let est = views === true ? false : true;             
      setviews(est)
    }      
    dispatch(cajaActions.getItem('CAJAS_ITEM','cajas',indicador))
  };  
   
  const toggleModalViews = () => {        
    setviews(!views)                  
  };
  const toggleModalView = () => {        
    setview(!view)                  
  };
  const toggleModalViewx = () => {        
    setviewx(!viewx)                  
  };

  const onAprobar = () => {                
    let dato = {}
        dato.id = indicador
        dato.usuarioId = usuario.id             
        dispatch(crudActions.SET_UPDATE('CAJAS_DATA','cajas',dato))     
        setviewx(false)       
        dispatch({type:'CAJAS_INDICADOR',value:0,estado:'pendiente'})
  };
    useEffect(() => {      
      return () => {
        dispatch({type:'CAJAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
      <>             
       <Card>    
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faMoneyBill} />  
          </div>        
        </Col>    
        <Col md={4} className="cards">
          <ButtonGroup>
          <Link to={`/admin/cajasitems/${indicador}`} className={(indicador === 0 || estado === true) ? "btn bg-success text-white disabled":"btn bg-success text-white"}  >
                  <FontAwesomeIcon icon={faEdit}  />
                  </Link> 
                 <Button className={(indicador !== 0 && estado === true) ? "bts bg-defautl text-white" :"bts bg-defautl text-white disabled" } onClick={()=> viewCaja('resumen')}>
                   <FontAwesomeIcon icon={faFilePdf} /> </Button>                                
                 <Button className={(indicador !== 0 && estado === true) ? "bts bg-defautl  text-white" : "bts bg-defautl text-white disabled" } onClick={()=> viewCaja('consolidado')}>
                   <FontAwesomeIcon icon={faTicketAlt} />  </Button>               
                 <Button className={(indicador !== 0 && estado === false) ? "btr bg-danger text-white": "btr bg-danger text-white disabled"} onClick={()=> toggleModalViewx()} >
                   <FontAwesomeIcon icon={faLock} /></Button>                  
          </ButtonGroup>
        </Col>
        <Col md={1} className="cards text-right">
         
        </Col> 

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
                  <FormGroup row>                                                          
                    <Col sm={10}>
                    <Input 
                        type="text" 
                        name="value"                                 
                        id="value"  
                        value={ value || '' }  
                        onChange={changeHandler} />
                    </Col>    
                    <Button className="text-white btn-sm bg-success" sm={1}>
                    <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    </FormGroup>       
                  </Form>             
        </Col>
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } CAJAS  </p>          
        </Col>

      </Row>   
      </Card> 
      <Modal isOpen={view} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <CajasItemsDetalle/>
          </ModalBody>
        </Modal>
        <Modal isOpen={views} toggle={toggleModalViews} className="resumenBody">
          <Button className="btn-view btn-danger"  onClick={() => toggleModalViews()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody className="resumenConte">
            <CajasConsolidado/>
          </ModalBody>
        </Modal>

        <Modal isOpen={viewx} toggle={toggleModalViewx} className="deleteBody"> 
        <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea cerrar la caja ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalViewx()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onAprobar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
    </>                                             
    );
};
export default EditCaja;
