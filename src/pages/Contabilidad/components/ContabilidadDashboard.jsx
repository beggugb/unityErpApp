import React,{useEffect} from "react";
import { Row,Col,Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import TableProcesos from '../../Procesos/components/TableProcesos'
import TableAprobados from '../../Procesos/components/TableAprobados'

const ContabilidadDashboard = () => {    
  return(   
      <Row className="mt-4">
        <Col md={7}>
          <Card>
            <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faChartBar} /></div>
              <CardTitle className="text-dark">COMPROBANTES PENDIENTES DE APROBACION</CardTitle>              
              </CardHeader>
              <CardBody>
                <TableProcesos/>
              </CardBody>            
          </Card>     
        </Col>  
        <Col md={5}>
          <Card>    
             <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faChartBar} /></div>
              <CardTitle className="text-dark">ULTIMOS COMPROBANTES APROBADOS</CardTitle>                       
              </CardHeader>    
              <CardBody>
              <TableAprobados/>
              </CardBody>              
          </Card>    
        </Col>            
      </Row>          
  )
};
export default ContabilidadDashboard;
