import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"

import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const EditCategoria = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.categorias.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('CATEGORIAS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        event.preventDefault()    
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('CATEGORIAS_DATA','categorias',item,'lista'))            
        }else{
          dispatch(crudActions.SET_ADD('CATEGORIAS_DATA','categorias',item,'lista'))           
        }                
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CATEGORIAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
      <Row>
      <Col>
        <Card>        
            <CardBody>
            <h5>Formulario de Registro</h5>
            <Form onSubmit={ submitHandle}>
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          value={item.nombre || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                        />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombreCorto">Abreviación</Label>
                      <Input type="text" name="abreviacion" id="abreviacion"  
                        value={item.abreviacion || ''}                         
                        onChange={ (e) => changeHandler(e)}  
                        onInvalid={(e) => e.target.setCustomValidity('El campo abreviación es obligatorio !')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </FormGroup>   
                  </Col>
                </Row> 
                
                <Row form>                  
                  <Col md={5}>
                    <Button 
                    type="submit"
                    className={item.id ?"btn-md btn-primary mt-2" : "btn-md btn-primary mt-2"}>
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} {item.id ? " Actualizar" : " Guardar"}
                    </Button> 
                  </Col>
                </Row>                 
            </Form> 
            </CardBody>                      
          </Card> 
      </Col>    
    </Row>                                         
    );
};
export default EditCategoria;
