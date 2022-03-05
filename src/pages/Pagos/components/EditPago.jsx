import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FormGroup,  Form, Label, Input, Button, Row, Col, Card, CardBody, Table } from "reactstrap"

import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSave, faCoins } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import Switch from 'react-switch'
const EditPago = ({getComponent}) => {  
    const dispatch = useDispatch()  
    const { compra, compraItems, cantidadTotal, sumaTotal, plan, nota, compraId  } = useSelector(state => state.pagos)   
    const d = new Date()   
    const [ efectivo, setEfectivo] = useState(true)    
    const [ cheque, setCheque] = useState('')    
    const [ nbanco, setNBanco] = useState('')    
    const [ pago, setpago] = useState({
      cuota:0,
      compraId:0,
      planId:0,
      monto:0
    })    
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))

  const asignar = (xitem) =>{
    let xpago = {
      cuota: xitem.cuota,
      compraId:compraId,
      planId: xitem.id,
      monto: xitem.monto
    }
    setpago(xpago)
  } 
  
  const pagar = event => { 
    event.preventDefault()             
    let iok = pago
    iok.usuarioId =usuario.id
    iok.proveedor = compra.proveedor.razonSocial
    iok.observaciones = compra.observaciones         
    iok.efectivo = efectivo 
    iok.banco   = nbanco
    iok.cheque   = cheque

    console.log(iok)

    dispatch(crudActions.SET_ADD('PAGOS_ADD','notas/compra',iok,'unit'))
    setpago({
      cuota:0,
      ventaId:0,
      planId:0,
      monto:0
    })
    setNBanco('')
    setCheque('')
    setEfectivo(true)
} 

useEffect(() => {      
  return () => {
    dispatch({type:'PAGOS_RESET_ITEM'})        
  };
}, []); 

    return (              
      <>
       <Row>
      <Col md="3">
        <Card>
            <CardBody>             
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA PAGOS
               </Button>               
            </CardBody>   
        </Card>       
      </Col>  
      <Col md="9">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>COMPRA Nº : </b> {compra.id} </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Estado : </b> {compra.estado}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Cantidad : </b> {cantidadTotal}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Valor Total : </b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}</h5>
               </Col> 
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>
      <Row>                  
        <Col md="6" className="cardCo">
          <Row>
            <Col>
            <Card>        
            <CardBody>
            <h4>Nota de compra</h4> 
            <Table className="table-reportesh">
            <tbody>                  
                <tr>                      
                  <td><b>Fecha compra : </b></td>
                  <td><Moment format="DD-MM-YYYY">{compra.fechaVenta}</Moment></td>                                                                                  
                  <td><b>Hora compra : </b></td>
                  <td><Moment format="HH:mm:ss">{compra.createdAt}</Moment></td>                                       
                </tr>
                <tr>                      
                  <td><b>Cod. Proveedor : </b></td>
                  <td>{compra.proveedor.codigo || ''}</td>                                                                                  
                  <td><b>Proveedor : </b></td>
                  <td>{compra.proveedor.razonSocial || ''}</td>                                       
                </tr>
                <tr>                      
                  <td><b>Tipo </b></td>
                  <td>{compra.tipo}</td>                                                                                  
                  <td><b>Nº Cuotas : </b></td>
                  <td>{nota.cuotas}</td>                                       
                </tr>              
                <tr>      
                  <td><b>Pago Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(nota.pagoTotal)}</td>                                                            
                  <td><b>Saldo Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(nota.saldoTotal)}</td>                                       
                </tr>                
              </tbody>             
            </Table> 
            </CardBody>   
          </Card>
            </Col>          
          </Row>

          <Row>
            <Col md={7}>
            <Card>        
            <CardBody>
            <h4>Pagos</h4> 
            <Table className="table-reportesh">
              <thead>
                <tr>                  
                  <th width="10%">#</th>
                  <th width="10%">Cuota</th>
                  <th width="20%">Fecha Pago</th>
                  <th width="10%">Estado</th>
                  <th width="30%">Monto</th>
                  <th width="10%"></th>                
                </tr>
              </thead>
              {plan && (
                  <tbody>
                      {plan.map((item, index) => (
                          <tr key={item.id}>                      
                            <td>{item.id}</td>
                            <td>{item.cuota}</td>
                            <td>{item.fechaPago}</td>                                                                 
                            <td>{item.estado ? 'pagado': 'pendiente' }</td>                                                
                            <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>                                             
                            <td>
                              {item.estado ?
                                <Button className="btn btn-warning" >                                
                                <FontAwesomeIcon icon={ faCoins } />
                                </Button>
                              :
                              <Button className="btn btn-danger" 
                              onClick={() => { asignar(item)}}>
                              <FontAwesomeIcon icon={ faArrowRight } />
                              </Button>
                              }                            
                            </td>
                          </tr>  
                          ))}
                  </tbody>
              )}     
            </Table> 
            </CardBody>   
          </Card>
          </Col>  
          <Col md={5}>
            <Card>        
            <CardBody>
                <Form onSubmit={ pagar}>     
                    <Row form>
                      <Col md={9}>
                        <FormGroup>   
                        <Label for="total">Total</Label>                 
                          <Input 
                            type="number" 
                            name="monto"                             
                            id="monto"  
                            value={pago.monto}                              
                            readOnly={true}/>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>   
                        <Label for="estado">Efectivo</Label>
                        <Switch                         
                          className="mt-1"                         
                          onChange={ (e) =>{setEfectivo(e)}}  
                          checked={efectivo} />                           
                        </FormGroup>
                      </Col>
                    </Row>  
                    { efectivo === false ?
                      <>
                       <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="recibido">Nº Cheque</Label>
                          <Input 
                            type="text" 
                            name="cheque"                             
                            id="cheque"  
                            value={cheque || ''}  
                            onChange={(e)=>{setCheque(e.target.value)}} 
                            />
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="cambio">Banco</Label>
                          <Input 
                            type="text" 
                            name="nbanco"                             
                            id="nbanco"  
                            value={ nbanco || ''}  
                            onChange={(e)=>{setNBanco(e.target.value)}}                             
                            />
                        </FormGroup>
                      </Col>
                    </Row> 
                      </>
                    :
                    null
                    }
                    
                    <Row>
                      <Col md={12}>
                        <Button className={(pago.monto > 0 && pago.compraId > 0) ? "btn-md btn-info mt-3": "btn-md disabled mt-3"}>
                         <FontAwesomeIcon icon={faSave} />                          
                        </Button>
                      </Col>
                    </Row>
                </Form>   
            </CardBody>
            </Card>  
          </Col>           
          </Row>          
        </Col>  
        <Col md="6" className="cardCo">
          <Card>        
            <CardBody>
            <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Compra # {compra.id}</b></h6>              
              <h5 className="text-center pio"> Fecha : {compra.fechaCompra}</h5>             
              </Col>            
            </Row>
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>
          <h4>Detalle</h4>    
            <Table className="table-reporteh mt-2">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{compra.nroItems}</td>                                                            
                  <td><b>Usuario : </b></td>
                  <td>{compra.usuario.nombres || ''} </td>
                </tr>                
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(compra.total)}</td>                     
                  <td><b>Proveedor : </b></td>
                  <td>{compra.proveedor.razonSocial || ''} </td>
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="3">{ compra.observaciones }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="20%" >Código</th>
                <th width="50%">Nombre</th>                                
                <th width="10%">Costo</th>
                <th width="10%">Cantidad</th>                
                <th width="10%">Total</th>                                             
              </tr>
          </thead>
          {compraItems && (
              <tbody>
                  {compraItems.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>                                                                                                                                      
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>                     
                        <td>{item.cantidad}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor * item.cantidad)}</td>
                      </tr>  
                      ))}
              </tbody>
          )}
            </Table>
            </Col>      
        </Row>   
        <Row>
          <Col md="4" className="mr-3">
          <h4>Nota de venta</h4>  
            <Table className="table-reportesh">
            <tbody>                  
                <tr>                      
                  <td><b>Nº </b></td>
                  <td>{nota.id}</td>                                                            
                </tr>  
                <tr>      
                  <td><b>Nº Cuotas : </b></td>
                  <td>{nota.cuotas}</td>                                       
                </tr>              
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(nota.montoTotal)}</td>                                       
                </tr>
                <tr>      
                  <td><b>Pago Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(nota.pagoTotal)}</td>                                       
                </tr>
                <tr>      
                  <td><b>Saldo Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(nota.saldoTotal)}</td>                                       
                </tr>                
              </tbody>             
            </Table>  
          </Col>
          <Col md="7">
            <h4>Pagos</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>                  
                <th width="20%">Cuota</th>
                <th width="30%">Fecha Pago</th>
                <th width="10%">Estado</th>
                <th width="40%">Monto</th>                
              </tr>
          </thead>
          {plan && (
              <tbody>
                  {plan.map((item, index) => (
                      <tr key={index}>                      
                        <td>{item.cuota}</td>
                        <td><Moment format="DD/MM/YYYY">{item.fechaPago}</Moment></td>                                                                 
                        <td>{item.estado ? 'pagado': 'pendiente' }</td>                                                
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>                                             
                      </tr>  
                      ))}
              </tbody>
          )}     
            </Table>      
          </Col>
        </Row>

        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {usuario.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{d}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  
            </CardBody>   
          </Card>
        </Col>        
      </Row>                                         
      </>  
                                                   
    );
};
export default EditPago;
