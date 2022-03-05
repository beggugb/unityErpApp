import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, FormGroup, Input, Label } from "reactstrap"

import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import SingleProveedor from '../../Proveedores/components/SingleProveedor'

const FormCompra = () => {
    const dispatch = useDispatch()  
    const { item, items, cantidadTotal, sumaTotal, plan } = useSelector(state => state.compras)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('COMPRAS_CHANGE',name,value))  
    }
      


    const submitHandle = () => { 
        let eItem = item                     
        eItem.usuarioId = usuario.id
        eItem.nroItems  = cantidadTotal 
        eItem.total     = sumaTotal          
        eItem.detalle   = item.observaciones +', '+item.proveedors
        let xcode ={
          item : eItem,
          items: items
        }
        dispatch(crudActions.SET_UPDATES('COMPRAS_ADD','compras',xcode,'unit')) 
          
     }


    useEffect(() => {      
      return () => {
        dispatch({type:'COMPRAS_RESET_ITEM'})        
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
              <SingleProveedor/>               
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
          <Row form>
          <Col md={7}>
            <Button
              className={item.id ?"btn-md btn-warning mt-4" : "btn-md btn-info mt-4"}
              onClick={() => submitHandle()}>
              <FontAwesomeIcon icon={faSave} />  
                {' '} {item.id ? " Actualizar" : " Guardar"}                        
            </Button>    
          </Col>                  
          </Row>
    </>
                                      
    );
};
export default FormCompra;
