import React  from "react";
import { useSelector} from 'react-redux'
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import FormCompra from './FormCompra'
import SearchsArticulos from '../../Articulos/components/SearchsArticulo'
import ListaCompras from "./ListaCompras";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const EditCompra = ({getComponent}) => {
  const { item, cantidadTotal, sumaTotal  } = useSelector(state => state.compras)  

  var d = new Date();
    return (      
      <>
      <Row>
      <Col md="3">
        <Card>
            <CardBody>             
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA COMPRAS
               </Button>               
            </CardBody>   
        </Card>       
      </Col>  
      <Col md="9">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>COMPRA Nº : </b> {item.id} </h5>
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
              <FormCompra/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="8" className="cardCo">
           <SearchsArticulos/>
           <ListaCompras/>
        </Col>          
      </Row>

      </>
    );
};
export default EditCompra;
