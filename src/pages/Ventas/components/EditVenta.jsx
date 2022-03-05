import React from "react";
import { useSelector } from 'react-redux'
import {  Button, Row, Col, Card, CardBody } from "reactstrap"
import FormVenta from './FormVenta'
import SearchvArticulos from '../../Articulos/components/SearchvArticulo'
import ListaVentas from "./ListaVentas";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditVenta = ({getComponent}) => {
  const { item, cantidadTotal, sumaTotal  } = useSelector(state => state.ventas)  
  var d = new Date();
    return (              
      <>
       <Row>
      <Col md="3">
        <Card>
            <CardBody>             
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA VENTAS
               </Button>               
            </CardBody>   
        </Card>       
      </Col>  
      <Col md="9">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>VENTA Nº : </b> {item.id} </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Estado : </b> {item.estado}</h5>
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
        <Col md="4" className="cardCo">
            <Card>        
              <CardBody>
              <FormVenta/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="8" className="cardCo">
           <SearchvArticulos/>
           <ListaVentas/>
        </Col>          
      </Row>                                         
      </>  
                                                   
    );
};
export default EditVenta;
