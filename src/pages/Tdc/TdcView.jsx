import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import SearchTdc from './components/SearchTdc'
import TableTdc from "./components/TableTdc";
import EditTdc from "./components/EditTdc"

const TdcView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter} prop='Tdc'/>       
         <Row>
            <Col md={12}>
            <SearchTdc/>
            </Col>            
         </Row>
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditTdc/>
            </Col>
            <Col md={9} className="marco">
            <TableTdc/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default TdcView;
