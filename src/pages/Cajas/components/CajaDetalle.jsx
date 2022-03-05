import React from 'react';
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Table,Row,Col,Card,CardBody } from "reactstrap";

function CajaDetalle() {              
 


  const item  = useSelector(state => state.cajas.item)
  

  return (    
    <Row>
    <Col>
      <Card>     
        <CardBody>
          <p>Resumen Caja</p>
          <Table className="table-simple">
          <tbody>
          <tr>  
              <th>Num:</th>
              <td>{item.id}</td>
              <th>Fecha:</th>                
              <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>                                     
          </tr>
          <tr>  
              <th>$ Inicial:</th>                
              <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
              <th>$ Ingresos:</th>
              <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
          </tr>            
          <tr>
              <th>$ Egresos:</th>
            <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
              <th>$ Total:</th>
            <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>
          </tr>            
          </tbody>
          </Table>  
        </CardBody>    
        
      </Card>  
    </Col>
  </Row> 
  );
}

export default CajaDetalle