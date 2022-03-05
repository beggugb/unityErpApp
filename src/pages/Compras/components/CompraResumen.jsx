import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";

 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    return (
    <>
      <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Compra # {this.props.dato.id}</b></h6>              
              <h5 className="text-center pio"> Fecha : {this.props.dato.fechaCompra}</h5>             
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
                  <td>{this.props.dato.nroItems}</td>                                                            
                  <td><b>Usuario : </b></td>
                  <td>{this.props.dato.usuario.nombres || ''} </td>
                </tr>                
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.dato.total)}</td>                     
                  <td><b>Proveedor : </b></td>
                  <td>{this.props.dato.proveedor.razonSocial || ''} </td>
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="3">{ this.props.dato.observaciones }</td>                                       
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
          {this.props.data && (
              <tbody>
                  {this.props.data.map((item, index) => (
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
                  <td>{this.props.xnota.id}</td>                                                            
                </tr>  
                <tr>      
                  <td><b>Nº Cuotas : </b></td>
                  <td>{this.props.xnota.cuotas}</td>                                       
                </tr>              
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.xnota.montoTotal)}</td>                                       
                </tr>
                <tr>      
                  <td><b>Pago Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.xnota.pagoTotal)}</td>                                       
                </tr>
                <tr>      
                  <td><b>Saldo Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.xnota.saldoTotal)}</td>                                       
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
          {this.props.xplan && (
              <tbody>
                  {this.props.xplan.map((item, index) => (
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
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  
      
    </> 
    );
  }
}


function ArticuloResumen () {    
const dispatch = useDispatch()
const { item, items, nota, plan } = useSelector(state => state.compras)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'COMPRAS_RESET_ITEMS'}) 
        dispatch({type:'COMPRAS_RESET_ITEM'}) 
    };
  }, []);


return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            dato={item}
            data={items}
            xnota={nota}
            xplan={plan}
            user={usuario}
        />
    </div>
     )
}


export default ArticuloResumen