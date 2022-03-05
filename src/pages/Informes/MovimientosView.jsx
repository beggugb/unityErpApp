import React,{useState, useEffect} from "react";
import { crudActions } from '../../actions'
import { Form, Label, FormGroup, Row, Col, Button, Card, CardBody, Input  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu.jsx';
import { InformeRouter } from '../../routes'
import DatePicker, { registerLocale } from  "react-datepicker";
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import Movimientos  from './Movimientos';
import { customi } from '../../helpers/customStyles'
import es from 'date-fns/locale/es';
registerLocale('es', es)

const tipos   =  [{"value":"compras","label":"Compras"},{"value":"ventas","label":"Ventas"}];
const estados =  [{"value":"todas","label":"--Todas--"},{"value":"pagado","label":"Pagados"},{"value":"saldo","label":"Pedientes"}];
const rangos   =  [{"value":"mayor","label":"Mayor/Igual a"},{"value":"menor","label":"Menor/Igual a"}];
              const defaultVal = (options, valor) =>{
                return options.filter(item =>
                    item.value === valor
                  )
              
              }
const MovimientosView = () => {
  const dispatch = useDispatch() 
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());
  const [tipo, setTipo] = useState("compras"); 
  const [estado, setEstado] = useState("todas"); 
  const [rango, setRango] = useState("mayor");
  const [vrango, setVrango] = useState(0);
  
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {}
    item.desde = value1
    item.hasta = value2  
    item.tipo = tipo    
    item.estado = estado  
    item.rango = rango
    item.vrango = vrango 
    dispatch(crudActions.GET_INFORMES('INFORMES_MOVIMIENTOS','movimientos',item))                 
    
  }
  

  useEffect(() => {
    return () => {
      console.log('descarga cliente')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InformeRouter}/>
        <Row>
        <Col md="3">
          <Card>        
              <CardBody>
              <Form onSubmit={ submitHandle}>
                <Row form>
                 <Col>FILTRO DE BUSQUEDA</Col>
                </Row>
                <Row form>
                  <Col md="12">
                  <FormGroup >
                    <Label for="eDesde">Desde :</Label>                    
                    <DatePicker locale="es"selected={value1} onChange={(date) => onChange1(date)} />
                  </FormGroup> 
                  </Col>
                </Row>
                <Row form>            
                  <Col md="12">
                  <FormGroup >
                    <Label for="eHasta">Hasta : </Label>
                    <DatePicker locale="es"selected={value2} onChange={(date) => onChange2(date)} />
                  </FormGroup>  
                  </Col>
                </Row>

                <Row form>
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eHasta">Tipo : </Label>                 
                    <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipo"    
                          id="tipo"                    
                          options={tipos}                                                    
                          value={defaultVal(tipos,tipo)} 
                          onChange={ (e)=> { setTipo(e.value)}}      
                          styles={customi}                   
                          />
                  </FormGroup>
                  </Col>  
                </Row>  
                <Row form> 
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eEstado">Estado Financiero: </Label>                 
                    <Select         
                          defaultValue={ estados[0]}
                          name="estado"    
                          id="estado"                    
                          options={estados}                                                    
                          value={defaultVal(estados,estado)} 
                          onChange={ (e)=> { setEstado(e.value)}}        
                          styles={customi}                   
                          />
                  </FormGroup>
                  </Col>                                                                                 
                </Row>

                <Row form>                  
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eRango">Rango de Monto: </Label>                 
                    <Select         
                          defaultValue={rango[0]}
                          name="rango"    
                          id="rango"                    
                          options={rangos}                                                    
                          value={defaultVal(rangos,rango)} 
                          onChange={ (e)=> { setRango(e.value)}} 
                          styles={customi}                   
                          />
                  </FormGroup>
                  </Col>                                                                                                                        
                </Row>

                <Row form>                  
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eRango">Valor de Rango: </Label>                 
                  <Input  id="vrango"
                          name="vrango"                    
                          type="number"
                          value={vrango}
                          onChange={ (e) => setVrango(e.value)}
                          required
                  /> 
                  </FormGroup>
                  </Col>                                                                                                                                   
                </Row>
              
                <Row form>                  
                  <Col md="5">
                  <FormGroup> 
                  <Button 
                      type="submit"
                      className="btn-md btn-info mt-4">
                      <FontAwesomeIcon icon={faSave} />  
                      {' '} Generar
                  </Button>
                  </FormGroup> 
                  </Col>                                                                   
                </Row>
               </Form>   
              </CardBody>                        
            </Card>         
        </Col>            
        <Col md="9">
          <Movimientos
            tipo={tipo}
            value1={value1}
            value2={value2}
            estado={estado}
            rango={rango}
            vrango={vrango}
          />
        </Col>
      </Row> 
      </div>    
    </div>    
    </>
  )

};
export default MovimientosView;
