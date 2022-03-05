import React,{useEffect, useState} from "react";
import { Table, Row, Col, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';

const ListaItems = () => {
   const dispatch = useDispatch() 
   const { items, cantidadTotal, sumaTotal, artId }= useSelector(state => state.ventas)   
   const [cnt, setCnt] = useState(-1);
   const [cantidad, setCantidad] = useState(0);
   
   const handleAsignar = (articuloId) => {      
    setCnt(articuloId)
    console.log(articuloId)    
   } 

   const changeHandler = (event,stock) =>{
    const { name, value } = event.target      
    if(stock >= value){
      setCantidad(value)    
    }
   }

  const submitHandle = () => {   
      if(cantidad != 0)
      {            
      let ites = [...items]
      let cTotal = cantidadTotal
      let sTotal = sumaTotal
        if (cnt !== -1 ) {
            let idBlock    = ites[cnt].cantidad
            let idSubTotal = ites[cnt].subTotal
            ites[cnt].cantidad = parseInt(cantidad) 
            ites[cnt].subTotal = parseInt(cantidad) * parseFloat(ites[cnt].valor)
            cTotal = (parseInt(cTotal) - parseInt(idBlock)) + parseInt(cantidad)
            sTotal = (parseFloat(sTotal) - parseFloat(idSubTotal)) + ites[cnt].subTotal
            

            dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, suma: sTotal})                      
            setCantidad(0)    

        } 
      }
      setCnt(-1)   
    
  }
  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
    <>    
    <Row>
    {cantidadTotal > 0 && (
      <Col>            
        <Table className="table-post">                    
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId} onClick={() => handleAsignar(index)} className={artId === index ? "check":"checki" } >                                              
                        <td width="60%">                          
                            <table>
                              <tbody>
                                <tr><td colSpan="2"><b>{item.nombre}</b></td></tr>  
                                <tr>
                                  { cnt === index ?
                                   <td>
                                     <Input 
                                      type="text" 
                                      name="cantidad"                             
                                      id="cantidad"  
                                      value={cantidad}  
                                      onChange={(e) => changeHandler(e,item.sumStock)}
                                      onDoubleClick={submitHandle}                                       
                                      /> 
                                   </td>   
                                  :
                                  <td className="detalles">{item.cantidad} {item.unidad} / 
                                  ({new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)})</td>
                                  }
                                                                    
                                </tr>  
                              </tbody>
                            </table>                          
                        </td>                                   
                        <td width="40%" className="text-center">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.subTotal)}
                        </td>                                                      
                      </tr>  
                      ))}
              </tbody>          
        </Table>
        <Table className="table-posts">                    
          <tbody>                              
            <tr>                                              
              <td width="50%"colSpan="3"></td>                                              
              <td className="text-center"><b>Total: {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}</b></td>
            </tr>                        
          </tbody>          
        </Table>        
      </Col>
      )}
    </Row>       
</>      
  )

};
export default ListaItems;
