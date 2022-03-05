import React,{useEffect, useCallback, useState, useRef} from "react";
import { FormGroup, Label, Table, Row, Col, Button, Card, CardHeader, CardTitle, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  

         

const Tabla = ({data}) => {
    const [header, setheader] = useState([
        {"width":"5%","label":"id"},
        {"width":"40%","label":"nombres"},
        {"width":"20%","label":"apellidos"},
        {"width":"10%","label":"direccion"},
        {"width":"8%","label":"samples"}
    ]);    
    const [headerTable, setheaderTable] = useState(        
        <thead>
            <tr>
               {header.map((item,index) =>
                (
                    <th key={index} width={item.width}>
                        {item.label}    
                    </th>
                ))}
            </tr>                       
        </thead>    
    );   
           

  return(
    <Table className="table-simple">
         {headerTable}
         {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                           
                        <td >                       
                                            
                        </td>                
                        <td>{item.codigo}</td>
                        <td>{item.nombres}</td>
                        <td>{item.tipo}</td>
                        <td>{item.nit}</td>
                      </tr>  
                      ))}
              </tbody>
          )}
    </Table>
  )

};
export default Tabla;
