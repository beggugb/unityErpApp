import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import Switch from 'react-switch'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import ArticuloImagen from './ArticuloImagen'
import SelectCategoria from '../../Categorias/components/SelectCategoria'
import SelectMarca from '../../Marcas/components/SelectMarca'
import { custom } from '../../../helpers/customStyles'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const unidades = [{"value":"bolsa","label":"bolsa"},
                  {"value":"caja","label":"caja"},
                  {"value":"paquete","label":"paquete"},
                  {"value":"unidad","label":"unidad"}                                    
                ];                                 

const EditArticulos = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.articulos)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','unidad',value))            
    }

    const changeCatalogo = (checked) => {                  
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','inCatalogo',checked))  
    }
    const changeOferta = (checked) => {                  
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','inOferta',checked))  
    }
    const changeEstado = (checked) => {                  
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','estado',checked))  
    }



    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('ARTICULOS_ADD','articulos',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('ARTICULOS_ADD','articulos',item,'unit'))           
        }    
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'ARTICULOS_RESET_ITEM'})        
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
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA ARTICULOS
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
                 <Col md="9" className="cardCo">
                 <Form onSubmit={submitHandle}>
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Label for="codigoBarras">Código Barras</Label>
                        <Input type="text" name="codigoBarras" id="codigoBarras"
                          placeholder="codigo"  value={item.codigoBarras || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo código barras es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                        />    
                    </FormGroup>    
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Label for="codigo">Código Ref.</Label>
                        <Input type="text" name="codigo" id="codigo" 
                          placeholder="codigo"  value={item.codigo || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                          />    
                    </FormGroup>    
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="estado">Estado</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ changeEstado }  
                        checked={item.estado} />
                    </FormGroup>   
                  </Col>                 
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          placeholder="nombre"  value={item.nombre || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                        />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombreCorto">Nombre Corto</Label>
                      <Input type="text" name="nombreCorto" id="enombreCorto"  value={item.nombreCorto || ''} 
                          onChange={ (e) => changeHandler(e)}  />
                    </FormGroup>   
                  </Col>
                </Row> 

                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eId">Categoría</Label>
                      <SelectCategoria/>  
                    </FormGroup>    
                  </Col>                  
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eEstado">Marca</Label>
                      <SelectMarca/>  
                    </FormGroup>   
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eModelo">Modelo</Label>
                      <Input type="text" name="modelo" id="modelo" 
                          placeholder="modelo"  value={item.modelo || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>   
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eEstado">Unidad</Label>
                        <Select                                                               
                          defaultValue={unidades[0]}
                          name="unidad"    
                          id="unidad"                    
                          options={unidades}     
                          styles={custom} 
                          isClearable={true}                          
                          value={defaultVal(unidades,item.unidad)}  
                          onChange={ (e) => changesHandler(e)}                                               
                        />
                    </FormGroup>   
                  </Col>                  
                </Row> 

                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="edescripcion">Descripción</Label>
                        <Input type="text" name="descripcion" id="edescripcion" 
                          placeholder="descripcion"  value={item.descripcion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einCatalogo">Catálogo</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ changeCatalogo }
                        checked={item.inCatalogo} />
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einOferta">Oferta</Label>
                      <Switch
                        className="mt-3"                         
                        onChange={ changeOferta }  
                        checked={item.inOferta} />
                    </FormGroup>   
                  </Col>
                </Row> 
                <h6>Costos/Ventas</h6> 
                <Row form>                                 
                  <Col md={4}>
                    <FormGroup>
                      <Label for="precioVenta">Precio Venta</Label>
                      <Input type="number" name="precioVenta" id="precioVenta"  value={item.precioVenta || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo precio venta es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                          />
                    </FormGroup>   
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <Label for="estockMinimo">Stock Mínimo</Label>
                        <Input type="number" name="stockMinimo" id="stockMinimo" 
                          value={item.stockMinimo || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo stock mínimo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                        /> 
                         
                    </FormGroup>  
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="estockTiempo">Tiempo Reposición(días)</Label>
                      <Input type="number" name="stockTiempo" id="stockTiempo"  value={item.stockTiempo || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo stock mínimo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                          />
                    </FormGroup>   
                  </Col>
                </Row>  
                      
                <Row form>
                  <Col md={4}>
                    <Button 
                      type="submit"
                      className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                      <FontAwesomeIcon icon={faSave} />  {' '} {item.id ? 'Actualizar': 'Guardar'} 
                    </Button>
                  </Col>
                </Row>
            </Form> 
            </Col>
            <Col md="3" className="cardCo">
              <h6 className="text-center">Imagen Articulo</h6>
              <ArticuloImagen/>
            </Col>
          </Row>
        </CardBody>   
      </Card>
        </Col>          
      </Row>
    </>                                            
    );
};
export default EditArticulos;
