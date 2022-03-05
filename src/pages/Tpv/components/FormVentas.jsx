import React,{useEffect} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment'
import SingleCliente from '../../Clientes/components/SingleCliente'
import QRCode from 'qrcode.react'


const FormVentas = () => {
  const dispatch = useDispatch() 
  const { items, cantidadTotal, item, sumaTotal }= useSelector(state => state.ventas)
  const iteme = useSelector(state => state.empresas.item)    
  const fechaHoy = new Date()
  const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
 
  const handlePreAprobar = () => {                 
    let it = {              
          "fechaVenta": fechaHoy,
          "tipo":'contado',
          "nroItems":cantidadTotal,
          "total": sumaTotal,
          "observaciones":'terminal punto de venta',
          "estado": false,
          "usuarioId": usuario.id,
          "clienteId": item.clienteId,
          "estf": "Pendiente de pago",
          "forma": "vendedor"          
          }
      let dato = {
        item :it,
        items: items,
        almacenId: almacenId.id
      }    
    dispatch(crudActions.VENTA_DIRECTA('ARTICULOS_LISTA','tpv',dato,'lista'))           
    
  } 

  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
    <div className="card-recibos">    
    <Row>    
      <Col md={12} className="card-recibo">
      <div className="drecibo"> 
        <div className="dempresa">           
           <p>{iteme.nombre}</p>
           <p>{iteme.direccion}</p>
           <p>NIT: {iteme.nit}</p>           
        </div>    
        <div className="dcliente">
          <p>FECHA: <Moment format="YYYY/MM/DD" >{ fechaHoy }</Moment></p>          
          <p>HORA: <Moment format="HH:mm" >{ fechaHoy }</Moment></p>
          <p>SR(A): </p>
        </div>    
        <div className="dconcepto">
        <Table className="table-simple">                    
              <tbody>
                <tr>                                              
                  <th width="10%">CANT.</th>
                  <th width="50%">CONCEPTO</th>
                  <th width="15%">P.U.</th>
                  <th width="25%">IMPORTE</th>                                                           
                </tr>  
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                                              
                        <td>{item.cantidad}</td>
                        <td>{item.nombre}</td>                        
                        <td>{item.valor}</td>
                        <td>{item.subTotal}</td>                                                           
                      </tr>  
                   ))}
              </tbody>          
        </Table>
        <Table className="table-simple">                    
              <tbody>                              
                <tr>                                              
                  <td >TOTAL</td>                                    
                  <td width="60%"> 
                  {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}</td>                                                           
                </tr>                  
              </tbody>          
        </Table>
        <div className="qr"> 
          <QRCode className="code" value={iteme.id} />         
        </div>        
        </div>           
        </div>      
      </Col>            
    </Row>       
    <Row>
      <Col md="12">
      <SingleCliente/>
        <Button 
          className="btn-md btn-info mt-3"
          onClick={() => handlePreAprobar()}>
          <FontAwesomeIcon icon={faSave} />                          
        </Button>
      </Col>
    </Row>
</div>      
  )

};
export default FormVentas;
