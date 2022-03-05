import React, { useRef, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment';
import { Table, Button, Col, Row } from "reactstrap";
import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    return (
    <>
    <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Resumen de Caja # {this.props.pcaja.id}</b></h6>              
              <h5 className="text-center pio"> Fecha Caja: <Moment format="DD/MM/YYYY">{ this.props.pcaja.fechaCaja }</Moment></h5>             
              </Col>            
            </Row>
        </div>
        <div className="report-body">      
            <Table className="table-reporteh mt-2">                      
              <tbody>                  
              <tr>        
                <td width="20%" ><b>Total Inicial</b></td>     
                <td width="30%" >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoInicial)}</td>                
                <td width="20%" ><b>Total Ingresos</b></td>     
                <td width="30%" >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoIngreso)}</td>                
                </tr>                     
                <tr>        
                    <td width="20%" ><b>Total Egreso</b></td>     
                    <td width="30%" >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoEgreso)}</td>                
                    <td width="20%" ><b>Monto Final</b></td>     
                    <td width="30%" >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoFinal)}</td>                
                </tr>  
                <tr>        
                <td width="20%" ><b>Usuario :</b></td>     
                <td width="30%" >{this.props.pcaja.usuario.nombres || ''}</td>  
                <td width="20%" ><b>Feha Cierre :</b></td>     
                <td width="30%" ><Moment format="DD/MM/YYYY">{ this.props.pcaja.fechaCierre }</Moment></td>                              
                </tr>                                     
              </tbody>          
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="10%" className="text-dark">#</th>
                <th width="10%" className="text-dark">Fecha</th>
                <th width="50%" className="text-dark">Detalle</th>
                <th width="10%" className="text-dark">Tipo</th>
                <th width="20%" className="text-dark text-center">Monto</th>                                          
              </tr>
          </thead>
          {this.props.pdata && (
              <tbody>
                  {this.props.pdata.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>                      
                        <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>                           
                        <td>{item.label}</td>
                        <td>{item.tipo}</td>    
                        <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
                    </tr>  
                ))}
              </tbody>
          )}
            </Table>

        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.puser.nombres || ''}</p>
            </Col>
            <Col md="6">           
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  

    
    </> 
    );
  }}


function CajasItemsDetalle () {    
const dispatch = useDispatch()
const {item} = useSelector(state => state.cajas)
const { data } = useSelector(state => state.cajasitems)
const componentRef = useRef();   
const usuario = JSON.parse(localStorage.getItem('@userUnity'))

useEffect(() =>{        
     return () =>{                    
        dispatch({type:'CAJAS_RESET_ITEM'})  
        /*dispatch({type:'CAJAS_ITEMS_RESET'})  */
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}          
            puser={usuario}
            pcaja={item}
            pdata={data}
        />
    </div>
     )
}


export default CajasItemsDetalle