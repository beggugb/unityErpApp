import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import {     
  Table, Row, Col,   
  Button } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'


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
              <h6 className="text-center pio"> <b>INFORME DE DIARIOS  </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                           
              </Col>            
            </Row>  
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>
          <h4>Detalle</h4>    
            <Table className="table-reporteh mt-2">                      
              <tbody>                  
                <tr>                      
                  <td><b>{this.props.pcuenta.codigo}</b></td>
                  <td><b>CUENTA</b></td>
                  <td><b>{this.props.pcuenta.descripcion}</b></td>
                </tr>                                               
              </tbody>          
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>                                  
                <th width="15%" className="text-dark">Fecha</th>
                <th width="30%" className="text-dark">Detalle</th>
                <th width="10%" className="text-dark">Asiento Nº</th>
                <th width="15%" className="text-dark text-center">Debe</th>                    
                <th width="15%" className="text-dark text-center">Haber</th>                 
                <th width="15%" className="text-dark text-center">Saldo</th>  
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item,index) => (
                  <tr key={item.id}>                      
                    <td><Moment format="DD-MM-YYYY">{item.fechaAsiento}</Moment></td>                    
                    <td>{item.detalle}</td>                    
                    <td>{item.id}</td>     
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.debito)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.credito)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.saldo)}</td>
                  </tr>  
                ))}
                <tr>  
                    <td colSpan="3"></td>                   
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pdebito)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcredito)}</b></td>
                </tr>
                <tr>  
                    <td colSpan="2"></td>                   
                    <td >Cierre de gestión</td>                   
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.cdebito)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.ccredito)}</b></td>
                </tr>
            </tbody>
        )}
            </Table>
            </Col>      
        </Row>   
        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.puser.nombres}</p>
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


function Mayores ({value1, value2}) {    
  const componentRef = useRef();   
  const { mayores, cuenta, debitoCierre, creditoCierre, sumaDebito, sumaCredito } = useSelector(state => state.contables)  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  useEffect(() =>{      
    return () =>{             
      /*dispatch(crudActions.setReset('INFORMES_RESET'))               */
      dispatch({type:'CONTABLES_RESET'}) 

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
            pdata={mayores}                                    
            pvalue1={value1}
            pvalue2={value2}
            puser={user}
            pdebito={sumaDebito}
            pcredito={sumaCredito}
            cdebito={debitoCierre}
            ccredito={creditoCierre}
            pcuenta={cuenta}
            
        />
    </div>
     )
}


export default Mayores