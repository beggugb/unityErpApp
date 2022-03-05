import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../helpers";
import {     
  Table,
  Col,
  Row,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    return (
      <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Kardex Proveedor # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.razonSocial}</h5>
             <h5 className="text-center pio"> <b>CODIGO</b> : {this.props.data.codigo}</h5> 
             <h5 className="text-center pio"> <b>NIT</b> : {this.props.data.nit}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={7} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="25%"><b>Tipo Fiscal :</b></td>
                      <td >{this.props.data.tipoFiscal}</td></tr>          
                  <tr><td><b>Dirección :</b></td>
                      <td>{this.props.data.direccion}</td></tr>    
                  <tr><td><b>Pais :</b></td>
                      <td >{this.props.data.pais}</td>
                  </tr>          

                  <tr><td><b>Ciudad :</b></td>
                      <td >{this.props.data.ciudad}</td>
                  </tr>          

                  <tr><td><b>Contacto :</b></td>
                      <td >{this.props.data.contacto}</td>
                  </tr>

                  <tr><td><b>Email :</b></td>
                      <td >{this.props.data.email}</td>
                  </tr>

                  <tr><td><b>Web :</b></td>
                      <td >{this.props.data.web}</td>
                  </tr>

                  <tr><td><b>Teléfono :</b></td>
                      <td >{this.props.data.telefono}</td>
                  </tr>          
                  <tr><td colSpan="2"><b>Observaciones :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.data.observaciones }</td></tr>                    
        </tbody>
        </Table>
          </Col>
          <Col md={5} className="report-card">
            <Row>
              <Col>
              <img alt="articulo"
            className="text-center imglg" 
            src={api + '/static/images/proveedores/lg/'+this.props.data.filename }/> 
              </Col>
            </Row>                    
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
    );
  }
}


function ProveedorResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.proveedores)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'PROVEEDORES_RESET_ITEM'}) 
    };
  }, [dispatch]);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            data={item}
            user={usuario}
        />
    </div>
     )
}


export default ProveedorResumen