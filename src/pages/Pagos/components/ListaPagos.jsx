import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button, Card, CardBody  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";


const ListaPagos = () => {
   const dispatch = useDispatch() 
   const {items, cantidadTotal, sumaTotal}= useSelector(state => state.ventas)


   const removeItem = (index) => {     
    var array = [...items];          
    let cc    = cantidadTotal      
    cc = cc - parseFloat(array[index].cantidad);
    let sTotal = sumaTotal
    sTotal = sTotal - parseFloat((array[index].cantidad * array[index].valor));
    array.splice(index, 1);
    /*addItem(array, tt, cc); */
    dispatch({type:'VENTAS_SET_ITEMS',values:array, cantidad: cc, suma: sTotal})     
      
    } 

 
   
   useEffect(() => {    
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})   
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
                <th width="15%" >Código</th>
                <th width="40%">Nombre</th>                
                <th width="10%">Marca</th>
                <th width="10%">Valor</th>
                <th width="10%">Cantidad</th>                
                <th width="10%">SubTotal</th>            
                <th width="5%"></th>                   
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>      
                        <td>{item.marca}</td>                        
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>
                        <td>{item.cantidad}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(parseInt(item.cantidad) * parseInt(item.valor))}</td>

                        <td>
                          <Button className="btn btn-danger" 
                            onClick={() => { removeItem(index)}}                           >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                                           
                        </td>
                      </tr>  
                      ))}
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
export default ListaPagos;
