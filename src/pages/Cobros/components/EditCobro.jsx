import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FormGroup,  Form, Label, Input, Button, Row, Col, Card, CardBody, Table } from "reactstrap"

import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSave, faCoins } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import Switch from 'react-switch'
const EditCobro = ({getComponent}) => {  
  const dispatch = useDispatch()  
  const { venta, ventaItems, cantidadTotal, sumaTotal, plan, nota, ventaId  } = useSelector(state => state.cobros)  
  const d = new Date()
  const [ efectivo, setEfectivo] = useState(true)    
  const [ cheque, setCheque] = useState('')    
  const [ nbanco, setNBanco] = useState('')    
  const [ pago, setpago] = useState({
    cuota:0,
    ventaId:0,
    planId:0,
    monto:0
  })    
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))


  const asignar = (xitem) =>{
    let xpago = {
      cuota: xitem.cuota,
      ventaId:ventaId,
      planId: xitem.id,
      monto: xitem.monto
    }
    setpago(xpago)
  } 
  
  const pagar = event => {       
    event.preventDefault()    
    let iok = pago
    iok.usuarioId =usuario.id
    iok.cliente = venta.cliente.nombres
    iok.observaciones = venta.observaciones         
    iok.efectivo = efectivo 
    iok.banco   = nbanco
    iok.cheque   = cheque
    
    dispatch(crudActions.SET_ADD('COBROS_ADD','notas/venta',pago,'unit')) 
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
    dispatch({type:'COBROS_RESET_ITEM'})        
  };
}, []); 

    return (              
      <>
       <Row>
      <Col md="3">
        <Card>
            <CardBody>             
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA COBROS
               </Button>               
            </CardBody>   
        </Card>       
      </Col>  
      <Col md="9">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>VENTA Nº : </b> {venta.id} </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Estado : </b> {venta.estado}</h5>
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
        <Col md="7" className="cardCo">
          <Row>
            <Col>
            <Card>        
            <CardBody>
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
                        <Button className={(pago.monto > 0 && pago.ventaId > 0) ? "btn-md btn-info mt-3": "btn-md disabled mt-3"}>
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
        <Col md="5" className="cardCo">
          <Card>        
            <CardBody>
            <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Venta # {venta.id}</b></h6>              
              <h5 className="text-center pio"> Fecha Venta : <Moment format="DD-MM-YYYY">{venta.fechaVenta}</Moment></h5>             
              <h5 className="text-center pio"> Hora Venta : <Moment format="HH:mm:ss">{venta.createdAt}</Moment></h5>             
              </Col>            
            </Row>
        </div>
        <div className="report-body">    
          <Row >
          <Col md={12}>
          <h4>Detalle</h4>  
          <Table className="table-reporteh">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{venta.nroItems}</td>                                          
                  <td><b>Tipo : </b></td>
                  <td>{venta.tipo}</td>
                </tr>                
                <tr>      
                  <td><b>Vendedor : </b></td>
                  <td>{venta.usuario.nombres || ''}</td> 
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(venta.total)}</td>                                        
                </tr>
                <tr>                        
                  <td><b>Cliente : </b></td>
                  <td colSpan="3">{venta.cliente.nombres || ''} </td>
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="3">{ venta.observaciones }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            <h4>Items</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>  
              <th width="15%">Código</th>
                <th width="45%">Nombre</th>                                
                <th width="10%">Precio</th>
                <th width="10%">Cantidad</th>
                <th width="20%">Sub-Total</th>                                          
              </tr>
          </thead>
          {ventaItems && (
              <tbody>
              {ventaItems.map((item, index) => (
                  <tr key={item.articuloId}>                      
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>                                                                                     
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>                     
                    <td className="text-center">{item.cantidad}</td>
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor * item.cantidad)}</td>
                  </tr>  
                  ))}
          </tbody>
          )}
            </Table>
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
export default EditCobro;
