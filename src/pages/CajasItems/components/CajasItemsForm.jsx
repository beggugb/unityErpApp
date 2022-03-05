import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { crudActions, cajaActions} from '../../../actions'
import { Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import { custom } from '../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos =  [                                
                {"value":"ingreso","label":"ingreso"},
                {"value":"egreso","label":"egreso"},                                              
                ];



function CajasItemsForm () {     
  const dispatch = useDispatch()  
  const caja = useSelector(state => state.cajas.item)   
  const item = useSelector(state => state.cajasitems.item)
  const changeHandler = event => {    
  const { name, value } = event.target  
   dispatch(crudActions.SET_CHANGE('CAJAS_ITEMS_CHANGE',name,value))  
 }

 const changesHandler = prop => event => {                     
    const { value } = event ? event : '' 
    dispatch(crudActions.SET_CHANGE('CAJAS_ITEMS_CHANGE',prop,value))  
    
 }

const submitHandle = event => {       
    event.preventDefault()           
    
    let dat = {}
    dat.monto = parseInt(item.monto)
    dat.tipo = item.tipo
    dat.label = item.label
    dat.cajaId = caja.id    
    dispatch(cajaActions.setAdd('cajasitems',dat))      
       
 }
        
  return (    
    <Row>
    <Col>
      <Card>
          <CardBody>
          <p>Registro de Caja</p>
          <Form onSubmit={ submitHandle}> 
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Label>Monto :</Label>
                <Input
                  id="monto"
                  type="number"
                  name="monto"                                                        
                  value={item.monto}
                  onChange={changeHandler}                                                   
                />
              </FormGroup>  
            </Col>  
            <Col md={2}>
              <FormGroup>
              <Label for="web">Tipo:</Label>
              <Select                                                               
               defaultValue={tipos[0]}
               name="tipo"    
               id="tipo"                    
               options={tipos}                                       
               value={defaultVal(tipos,item.tipo)}                                                                                                                                
               onChange={ changesHandler('tipo')}       
               styles={custom}                     
               />
              </FormGroup>  
            </Col>  
            <Col md={6}>
              <FormGroup>
              <Label for="web">Glosa:</Label>
              <Input
                 id="label"
                 type="text"
                 name="label"                                                        
                 value={item.label}
                 onChange={changeHandler}                                                   
               />
              </FormGroup>  
            </Col>
            <Col md={2}>
              <FormGroup>
              <Button type="submit" className={item.monto > 0 ? "btn-md btn-info mt-3" : "btn-md btn-danger disabled mt-3"}>
             <FontAwesomeIcon icon={faSave} />  
               {' '} Registrar 
           </Button>
              </FormGroup>  
            </Col>  
          </Row>  
          </Form>          
          </CardBody>   
      </Card>       
    </Col>  
    </Row>                           
  );
}

export default CajasItemsForm