import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import SearchMarca from './components/SearchMarca'
import TableMarcas from "./components/TableMarcas";
import EditMarca from "./components/EditMarca"

const MarcasView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter} prop='Marcas'/>       
         <Row>
            <Col md={12}>
            <SearchMarca/>
            </Col>            
         </Row>
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditMarca/>
            </Col>
            <Col md={9} className="marco">
            <TableMarcas/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default MarcasView;
