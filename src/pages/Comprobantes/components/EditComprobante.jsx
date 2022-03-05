import React,{ useState }  from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Label, FormGroup, Input, Row, Col, Card, CardBody, Button, CardFooter } from "reactstrap"

import SearchsPuc from '../../Pucs/components/SearchsPuc'
import ListaComprobantes from "./ListaComprobantes";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import writtenNumber from 'written-number'


const EditComprobante = ({getComponent}) => {
  const dispatch = useDispatch() 
  const { item } = useSelector(state => state.comprobantes)  
  const changeHandler = event => {        
    const { name, value } = event.target  
    dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE',name,value))  
}

  var d = new Date();
    return (      
      <>
      <Row>
      <Col md="3">
        <Card>
            <CardBody>             
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA COMPROBANTES
               </Button>               
            </CardBody>   
        </Card>       
      </Col>  
      <Col md="9">
      <Card>
            <CardBody>             
               Comprobante de {item.tipoComprobante}
            </CardBody>   
        </Card> 
      </Col>  
      </Row>

      <Row>
        <Col md="12" className="cardCo">
            <Card> 
              <Row>                
                <Col md={10}>
                Fecha : <Moment format="DD/MM/YYYY">{d}</Moment>
                </Col>
                <Col md={2} className="text-right">
                NRO : {item.numComprobante}
                </Col>
              </Row>                                       
              <Row>                                
                <Col md={9}>
                </Col>
                <Col md={3} className="text-right">
                  <FormGroup>
                    <Row form>    
                      <Col md={3}>                  
                        <Label for="mTotal">BS.</Label>
                      </Col>
                      <Col md={9}>                  
                        <Input type="number" name="montoTotal" id="montoTotal" 
                          value={item.montoTotal}                          
                          onChange={ (e) => changeHandler(e)} 
                          min="0.00"
                          step="0.001"
                          max="1.00"
                          presicion={2}                          
                          />
                      </Col>
                    </Row>
                  </FormGroup> 
                </Col>                
              </Row>           
              { item.tipoComprobante === 'Ingreso' || item.tipoComprobante === 'Egreso' ?    
              <>                                       
              <Row>                
                <Col md={12}>                                 
                <FormGroup>
                    <Row form>    
                      <Col md={2}>                  
                        <Label for="mTotal">{ item.tipo === 'Ingreso' ? 'Recibimos de': 'Pagamos a'} :</Label>
                      </Col>
                      <Col md={9}>                  
                        <Input type="text" name="label" id="label" 
                          value={item.label || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup> 
                  
                  <FormGroup>
                    <Row form>    
                      <Col md={2}>                  
                        <Label for="mTotal">La suma de :</Label>
                      </Col>
                      <Col md={9}>                                                                    
                      <p className="letter">{writtenNumber(item.montoTotal, {lang: 'es'})}   { item.montoTotal.toString().split('.')[1]} / 100 Bolivianos</p>                          
                       
                      </Col>
                    </Row>
                  </FormGroup> 
                  <FormGroup>
                    <Row form>    
                      <Col md={2}>                  
                        <Label for="mGlosa">Por concepto de :</Label>
                      </Col>
                      <Col md={9}>                  
                        <Input type="text" name="glosaComprobante" id="glosaComprobante" 
                          value={item.glosaComprobante || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup>               
          
                </Col>                
              </Row>   
              <Row>                
              <Col md={6}>  
                <FormGroup>
                    <Row form>    
                      <Col md={4}>                  
                        <Label for="mCheque">N º de Cheque :</Label>
                      </Col>
                      <Col md={8}>                  
                        <Input type="text" name="nCheque" id="nCheque" 
                          value={item.nCheque || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup> 
                </Col>  
                <Col md={6}>  
                <FormGroup>
                    <Row form>    
                      <Col md={4} className="text-right">                  
                        <Label for="mBanco">Banco :</Label>
                      </Col>
                      <Col md={8}>                  
                        <Input type="text" name="nBanco" id="nBanco" 
                          value={item.nBanco || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup> 
                </Col>              
              </Row> 
              </>  
              :
              <Row>                
                <Col md={12}>                                 
                  <FormGroup>
                    <Row form>    
                      <Col md={2}>                  
                        <Label for="mTotal">Son :</Label>
                      </Col>
                      <Col md={9}>                                                                    
                        <p className="letter">{writtenNumber(item.montoTotal, {lang: 'es'})}   { item.montoTotal.toString().split('.')[1]} / 100 Bolivianos</p>                          
                      </Col>
                    </Row>
                  </FormGroup> 
                </Col>                
              </Row>

              }

              
              <Row>                
                <Col md={12} >
                <SearchsPuc/>
                <ListaComprobantes/>
                </Col>                    
              </Row>                                     
            </Card>
          
        </Col>                  
      </Row>

      </>
    );
};
export default EditComprobante;
