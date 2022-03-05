import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../actions'

import ClienteImagen from './ClienteImagen'
import { locations, ciudades } from "../../../helpers/locations";
import { custom } from '../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"personal","label":"personal"},
                   {"value":"empresa","label":"empresa"},];
                     
const EditClientes = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.clientes)   
    const [citys, setcitys] = useState([]);
    
    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE',name,value))  
    }
      
    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''   
      console.log(value)           
      console.log(indice)           
      dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE','pais',value))   
      let datc = ciudades.filter(d => (d.indice === indice) )  
      setcitys(datc)
  }
    const changesCiudades = event => {                  
      const {value} = event ? event : ''               
      dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE','ciudad',value))   
      
    }

    const changesHandler = event => {            
        console.log(event)       
        const {value} = event ? event : ''        
        dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE','tipo',value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('CLIENTES_ADD','clientes',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('CLIENTES_ADD','clientes',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CLIENTES_RESET_ITEM'})        
      };
    }, []); 

     
    return (              
      <>
      <Row>
      <Col>
        <Card>
            <CardBody>
             <Row>
               <Col md="7">
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA CLIENTES
               </Button>
               </Col> 
               
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>
      <Row>
        <Col>
            <Card>        
              <CardBody>
               <Row>
                 <Col md="8" className="cardCo">
                    <Form onSubmit={ submitHandle}>   
                      <Row form>
                        <Col md={8}>
                          <FormGroup>
                            <Label for="codigo">
                              Código
                            </Label>
                            <Input
                              id="codigo"
                              name="codigo"                    
                              type="text"
                              value={item.codigo || ''}
                              onChange={ (e) => changeHandler(e)}                                 
                              onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required 
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tipo">
                              Tipo
                            </Label>
                              <Select                                                               
                                defaultValue={tipos[0]}
                                styles={custom} 
                                name="tipo"    
                                id="tipo"                    
                                options={tipos}      
                                isClearable={false}                          
                                value={defaultVal(tipos,item.tipo)}
                                onChange={ (e) => changesHandler(e)}      
                                
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={8}>
                          <FormGroup>
                            <Label for="nombres">
                              Nombres
                            </Label>
                            <Input
                              id="nombres"
                              name="nombres"                    
                              type="text"
                              value={item.nombres || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo nombres es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col>   
                        <Col md={4}>
                          <FormGroup>
                            <Label for="nit">
                              NIT
                            </Label>
                            <Input
                              id="nit"
                              name="nit"                    
                              type="text"
                              value={item.nit || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo nit es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col>         
                      </Row>
                      <Row form>
                      <Col md={8}>
                          <FormGroup>
                            <Label for="web">
                              WEB
                            </Label>
                            <Input
                              id="web"
                              name="web"                    
                              type="text"
                              value={item.web || ''}
                              onChange={ (e) => changeHandler(e)}
                            />
                        </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="telefono">
                              Teléfono
                            </Label>
                            <Input
                              id="telefono"
                              name="telefono"                    
                              type="text"
                              value={item.telefono || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo teléfono es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                              placeholder="(591)-000000"
                            />
                          </FormGroup>
                        </Col>            
                      </Row>
                      <FormGroup>
                        <Label for="direccion">
                          Dirección
                        </Label>
                        <Input
                          id="direccion"
                          name="direccion"
                          type="text"
                          value={item.direccion || ''}
                          onChange={ (e) => changeHandler(e)}      
                          onInvalid={(e) => e.target.setCustomValidity('El campo dirección es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                          required  
                                
                        />
                      </FormGroup>            
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Pais">
                            Pais
                          </Label>   
                            <Select                                                               
                              defaultValue={locations[0]}
                              styles={custom} 
                              name="pais"    
                              id="pais"                    
                              options={locations}      
                              isClearable={true}                          
                              value={defaultVal(locations,item.pais)}   
                              onChange={ (e) => changesPaises(e)}                                               
                            />                
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="ciudad">
                            Ciudad
                          </Label>
                          <Select                                                               
                            defaultValue={citys[0]}
                            styles={custom} 
                            name="ciudad"    
                            id="ciudad"                    
                            options={citys}      
                            isClearable={true}                          
                            value={defaultVal(ciudades,item.ciudad)}     
                            onChange={ (e) => changesCiudades(e)}                                             
                          />                   
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Cod/Postal">
                            Código postal
                          </Label>
                          <Input
                            id="codpostal"
                            name="codpostal"
                            type="text"
                            value={item.codpostal || ''}
                            onChange={ (e) => changeHandler(e)}                
                          />                  
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="observaciones">
                        Observaciones
                      </Label>
                      <Input
                        id="observaciones"
                        name="observaciones"
                        type="text"
                        value={item.observaciones || ''}
                        onChange={ (e) => changeHandler(e)}                
                      />
                    </FormGroup> 

                    <Row form>
                      <Col md={4}>            
                          <Button 
                            type="submit"
                            className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                            <FontAwesomeIcon icon={faSave} />  
                            {' '} {item.id ? " Actualizar" : " Guardar"}
                          </Button>
                      </Col>
                    </Row>              
            </Form>
            </Col>
            <Col md="4" className="cardCo">
              <h6 className="text-center">Imagen NIT</h6>
              <ClienteImagen/>
            </Col>
          </Row>
        </CardBody>   
      </Card>
        </Col>          
      </Row>
    </>
    );
};
export default EditClientes;
