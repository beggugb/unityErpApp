import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import SearchCategoria from './components/SearchCategoria'
import TableCategorias from "./components/TableCategorias";
import EditCategoria from "./components/EditCategoria"

const CategoriasView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter} prop='Categorias'/>
         <Row>
            <Col md={12}>
            <SearchCategoria/>
            </Col>            
         </Row>
      
         <Row>
            <Col md={3} className="marco">
            <EditCategoria/>
            </Col>
            <Col md={9} className="marco">
            <TableCategorias/>
            </Col>            
         </Row>
 
      </div>
    </div>    
    </>
  )

};
export default CategoriasView;
