import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button,Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faSave, faEdit,faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";


const ListasComprobantes = () => {
   const dispatch = useDispatch() 
   const {items, item }= useSelector(state => state.comprobantes)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   
   useEffect(() => {    
    return () => {
      dispatch({type:'COMPROBANTES_RESET_ITEMS'})   
    };
}, []);
  return(
    <>    
    <Row>
      <Col>
      <Card>        
              <CardBody>
      
        <Table className="table-simple">
          <thead>
              <tr>                  
                <th width="20%">Código</th>
                <th width="50">Cuentas Afectadas</th>                
                <th width="15%" className="text-center">Debe</th>            
                <th width="15%" className="text-center">Haber</th>                                                 
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={index}>                                           
                        <td>{item.codigo || ''}</td>                        
                        <td className={(item.debe === '0' || item.debe === 0) ? "text-center": "text-left"}>{item.descripcion || ''}</td>                                                                                          
                        <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.debe)}</td>                        
                        <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.haber)}</td>
                        
                   
                      </tr>  
                      ))}
                      <tr>
                        <td colSpan="2"></td>
                        <td className="text-center">
                        <b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.tDebe)}</b>
                        </td>
                        <td className="text-center">
                          <b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.tHaber)}</b>
                        </td>
                      </tr>
              </tbody>
          )}
        </Table>
        </CardBody>
   
      </Card> 
      
      </Col>         
    </Row>       
</>      
  )

};
export default ListasComprobantes;
