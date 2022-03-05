import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import SearchsCliente from '../../Clientes/components/SearchsCliente'
        

const FormPago = () => {
    const dispatch = useDispatch()  
    const { item, items, cantidadTotal, sumaTotal } = useSelector(state => state.ventas)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))    
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('VENTAS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.changeValue('VENTAS_CHANGE','tipo',value)) 
    }

    const sendPedido = () => {                     
      dispatch(crudActions.sendItem('ventas',item.id)) 
    }
    const submitHandle = () => {       
      let eItem = item          
          eItem.fechaVenta = new Date()        
          eItem.usuarioId = usuario.id
          eItem.nroItems = cantidadTotal 
          eItem.total = sumaTotal        
         let dato={
            item: eItem,
            items:items
          }          
          
          dispatch(crudActions.SET_UPDATES('VENTAS_ADD','ventas',dato,'unit'))            
        
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'VENTAS_RESET_ITEM'})        
      };
    }, []); 



  
     
    return (              
          <>                                  
                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="estado">Nro.</Label>
                        <Input type="text" name="id" id="id" 
                          value={item.id || ''}
                          readOnly={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>   
                  <Col md={9}>
                  <SearchsCliente/>                                                     
                  </Col>                                                                               
                </Row>                          
        
                <Row form>                                    
                <Col md={12}>
                    <FormGroup>
                      <Label for="observaciones">Glosa</Label>
                      <Input type="text" name="observaciones" id="observaciones" 
                          value={item.observaciones || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                    </FormGroup>   
                  </Col>
                </Row>
                <Row>  
                  <Col md={7}>
                    <Button
                        className={item.id ?"btn-md btn-warning mt-4" : "btn-md btn-info mt-4"}
                        onClick={() => submitHandle()}
                        >
                        <FontAwesomeIcon icon={faSave} />  
                        {' '} {item.id ? " Actualizar" : " Guardar"}
                        
                    </Button>    
                  </Col>                  
                </Row>
        </>


                                      
    );
};
export default FormPago;
