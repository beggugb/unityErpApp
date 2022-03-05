import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select' 
import { customStyles } from '../../../helpers/customStyles'

const tipos =[              
              {"label":"Activo","value":"Activo"},
              {"label":"Pasivo","value":"Pasivo"},
              {"label":"Capital","value":"Capital"},
              {"label":"Ingresos","value":"Ingresos"},
              {"label":"Costos","value":"Costos"},
              {"label":"Gastos","value":"Gastos"},              
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }   

const EditPuc = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.pucs.item)  
    
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('PUCS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        event.preventDefault()            
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('PUCS_ADD','pucs',item,'lista'))            
        }else{
          dispatch(crudActions.SET_ADD('PUCS_ADD','pucs',item,'lista'))           
        }   
        
        
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PUCS_RESET_ITEM'})        
      };
    }, []); 

    const changeHandlers = event => {    
      const { name, value } = event      
      dispatch(crudActions.SET_CHANGE('PUCS_CHANGE','tipo',value))  
  }
     
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
                      <Label for="ecodigo">Código</Label>
                        <Input type="text" name="codigo" id="ecodigo" 
                          value={item.codigo || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="edescripcion">Descripción</Label>
                      <Input type="text" name="descripcion" id="descripcion"  
                        value={item.descripcion || ''} 
                        required={true}
                        onChange={ (e) => changeHandler(e)}  />
                    </FormGroup>   
                  </Col>
                </Row> 
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enivel">Tipo</Label>
                      <Select                 
                        styles={customStyles}                                              
                        defaultValue={tipos[0]}
                        name="tipo"    
                        id="tipo"                    
                        options={tipos}      
                        isClearable={false}                          
                        value={defaultVal(tipos,item.tipo)}    
                        onChange={ (e) => changeHandlers(e)}  
                      />
                    </FormGroup>   
                  </Col>
                </Row>
                
                <Row form>                  
                  <Col md={5}>
                    <Button 
                    type="submit"
                    className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
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
export default EditPuc;
