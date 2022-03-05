import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'

import {     
  Table,
  Col,
  Row,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";
import writtenNumber from 'written-number'

 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    return (
    <>
      <div className="reporte">     
        <div className="report-header">   
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-left pio"> <b>{this.props.empresa.nombre}</b></h6>                            
              </Col>            
            </Row>     
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Comprobante de {this.props.dato.tipoComprobante}</b></h6>                            
              </Col>            
            </Row>
            <Row className="crl">
              <Col md={8}>Fecha Comprobante :      
              <Moment format="DD/MM/YYYY">{this.props.dato.fechaComprobante}</Moment>                                   
              </Col>
              <Col md={4}>                           
              <b>N º {this.props.dato.numComprobante}</b>
              </Col>            
            </Row>
            <Row className="crl">
              <Col md={8}>                           
              </Col>
              <Col md={4}>                        
               <h5>Bs. {new Intl.NumberFormat().format(this.props.dato.montoTotal)}</h5>
              </Col>            
            </Row>

                      
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>           
            <Table className="table-reporteh mt-2">     
            { this.props.dato.tipoComprobante === 'Ingreso' || this.props.dato.tipoComprobante === 'Egreso' ?                     
              <tbody>                  
                <tr>                      
                  <td><b>{ this.props.dato.tipoComprobante === 'Ingreso' ? 'Recibimos de :' : 'Pagamos a :'}</b></td>                  
                  <td colSpan="3">{ this.props.dato.label} </td>    

                </tr>                
                <tr>                      
                  <td><b>La suma de :</b></td>
                  <td colSpan="3">                    
                    {writtenNumber(this.props.dato.montoTotal, {lang: 'es'})}   { this.props.dato.montoTotal.toString().split('.')[1]} / 100 Bolivianos
                  </td>                  
                </tr>                
                <tr>                      
                  <td><b>Por concepto :</b></td>
                  <td colSpan="3">{this.props.dato.glosaComprobante}</td>                  
                </tr>
                <tr>                      
                  <td><b>Cheque Nº :</b></td>
                  <td>{this.props.dato.nCheque}</td>                  
                  <td><b>Banco :</b></td>
                  <td >{this.props.dato.nBanco}</td>                  
                </tr>   
              </tbody>  
              :
              <tbody>                  
              <tr>                      
                <td><b>Son :</b></td>
                <td colSpan="3">                    
                  {writtenNumber(this.props.dato.montoTotal, {lang: 'es'})}   { this.props.dato.montoTotal.toString().split('.')[1]} / 100 Bolivianos
                </td>                  
              </tr>                
                 
            </tbody> 
            }        
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="20%">Código</th>
                <th width="50%">Cuentas Afectadas</th>                                
                <th width="15%" className="text-center">Debe</th>
                <th width="15%" className="text-center">Haber</th>                                
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
                  {this.props.data.map((item, index) => (
                      <tr key={item.id}>                      
                        <td>{item.codigo}</td>
                        <td className={(item.debe === '0' || item.debe === 0) ? "santxt": "text-left"}>{item.descripcion}</td>                                                                                                                                      
                        <td className="text-center">{new Intl.NumberFormat().format(item.debe)}</td>                                             
                        <td className="text-center">{new Intl.NumberFormat().format(item.haber)}</td>
                      </tr>  
                  ))}
                  <tr>
                  <td colSpan="2"></td>  
                  <td className="text-center">{new Intl.NumberFormat().format(this.props.dato.tDebe)}</td>
                  <td className="text-center">{new Intl.NumberFormat().format(this.props.dato.tHaber)}</td>
                  </tr>
              </tbody>
          )}

            </Table>            
            <Table className="table-simple">
            <thead>
              <tr>  
                <th width="30%" className="text-center">Confeccionó</th>
                <th width="20%" className="text-center">Contador</th>                                
                <th width="20%" className="text-center">GERENTE</th>
                <th width="30%" className="text-center">BENEFICIARIO</th>                                
              </tr>
            </thead>          
            <tbody>
                <tr>
                  <td >.</td>
                  <td >.</td>
                  <td >.</td>
                  <td >.</td>
                </tr>
            </tbody>
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
              <p>Fecha Impresión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
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
const { item, items } = useSelector(state => state.comprobantes)
const iteme = useSelector(state => state.empresas.item)  
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{       
  
     return () =>{            
        dispatch({type:'COMPROBANTES_RESET_ITEMS'}) 
        dispatch({type:'COMPROBANTES_RESET_ITEM'}) 
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
            user={usuario}
            empresa={iteme}
        />
    </div>
     )
}


export default ArticuloResumen