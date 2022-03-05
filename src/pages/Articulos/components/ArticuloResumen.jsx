import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
    <>
     <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Resumen Articulo # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.nombres}</h5>
             <h5 className="text-center pio"> CODIGO : {this.props.data.codigoBarras}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={7} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="35%"><b>Nombre Corto :</b></td>
                      <td >{this.props.data.nombreCorto}</td></tr>          
                  
                  <tr><td><b>Categoría :</b></td>
                      <td>{this.props.data.categoria.nombre || ''}</td></tr>          

                  <tr><td><b>Marca :</b></td>
                      <td >{this.props.data.marca.nombre || ''}</td>
                  </tr>          

                  <tr><td><b>Tipo :</b></td>
                      <td >{this.props.data.tipo}</td>
                  </tr>          

                  <tr><td><b>Origen :</b></td>
                      <td >{this.props.data.origen}</td>
                  </tr>

                  <tr><td><b>Estado :</b></td>
                  <td>{ this.props.data.estado ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>
                  </tr>

                  <tr><td><b>Catálogo :</b></td>
                  <td>{ this.props.data.inCatalogo ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>              
                  </tr>

                  <tr><td><b>Oferta :</b></td>
                  <td>{ this.props.data.inOferta ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>              
                  </tr>          
                  <tr><td><b>Precio Costo :</b></td>
                      <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.data.precioCosto)}</td></tr>          
                      <tr><td><b>Precio Venta :</b></td>
                      <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.data.precioVenta)}</td></tr>  
                      <tr><td><b>% Ganancia :</b></td>
                        <td>{new Intl.NumberFormat('de-DE',{}).format(this.props.data.pGanancia)} %</td>
                  </tr>            
                  <tr><td colSpan="2"><b>Descripción :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.data.descripcion }</td></tr> 

        </tbody>
        </Table>
          </Col>
          <Col md={5} className="report-card">
            <Row>
              <Col>
              <img alt="articulo" className="text-center imglg" src={api + '/static/images/articulos/lg/'+this.props.data.filename }/>
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
    </> 
    );
  }
}

function ArticuloResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.articulos)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'ARTICULOS_RESET_ITEM'}) 
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
          data={item}
          user={usuario}
        />                
    </div>
     )
}


export default ArticuloResumen