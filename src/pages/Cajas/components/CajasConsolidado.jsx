import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import {     
  Table,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date();         
    return (
      <>
    <div className="invoice-consolidado">                    
    <h5 className="text-center"><b>Resumen de Caja</b></h5>    
    <p className="text-center"><b> Fecha Caja: <Moment format="DD/MM/YYYY">{ this.props.pcaja.createdAt }</Moment></b></p>
    
    
    <div className="soli">     
     <Table className="table-reporte">
            <tbody>
            <tr>  
                <td>Nro:</td><td>{this.props.pcaja.id}</td>                                                        
            </tr>            
            
            <tr>  
                <td>Usuario:</td><td>{this.props.pcaja.usuario.nombres}</td>                                                        
            </tr>
            <tr>  
                <td>$ Inicial:</td>                
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoInicial)}</td>                
            </tr>  
            <tr>               
                <td>$ Ingresos:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoIngreso)}</td>
            </tr>           
            <tr>
                <td>$ Egresos:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoEgreso)}</td>                
            </tr>            
            <tr>                
                <td>$ Total:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoFinal)}</td>
            </tr>
            <tr>
                <td>Feha Cierre :</td>                                                 
                <td><Moment format="DD/MM/YYYY">{ this.props.pcaja.fechaCierre }</Moment></td>
            </tr>  
            <tr>
                <td>Hora Cierre :</td>                                                 
                <td><Moment format="HH:mm:ss">{ this.props.pcaja.updatedAt }</Moment></td>
            </tr>          
            </tbody>
          </Table>  
     </div>
     <p className="mt-2">____________________________________</p>
     <p className="text-center">Firma</p>
     <p className="mt-2">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
    </div>   
    </> 
    );
  }}


function CajasConsolidado () {    
const dispatch = useDispatch()
const componentRef = useRef();   
const {item} = useSelector(state => state.cajas)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
 useEffect(() =>{        
     return () =>{                    
        dispatch({type:'CAJAS_RESET_ITEM'})  
        dispatch({type:'CAJAS_ITEMS_RESET'})  
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
        />
    </div>
     )
}


export default CajasConsolidado