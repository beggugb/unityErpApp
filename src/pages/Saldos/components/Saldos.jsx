import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { Table, Row, Col, Button } from "reactstrap";
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
              <h6 className="text-center pio"> <b>BALANCE DE SUMAS Y SALDOS  </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                           
              </Col>            
            </Row>  
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>
            <Table className="table-reportesh mt-2">            
          {this.props.pdata && (
            <tbody>
              <tr>
                <td rowSpan="2">Código</td>
                <td rowSpan="2">Código</td>
                <td rowSpan="2">Cuentas</td>
                <td colSpan="2">SUMAS</td>
                <td colSpan="2">SALDOS</td>
              </tr>
              <tr>
                <td>Debitos</td>
                <td>Créditos</td>

                <td>Deudor</td>
                <td>Acreedor</td>
              </tr>
  
                {this.props.pdata.map((item,index) => (
                  <tr key={index}>  
                    <td>{index+1}</td>
                    <td>{item.codigo}</td>
                    <td>{item.descripcion}</td>                    
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.sumaDebito)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.sumaCredito)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.deudor)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.acreedor)}</td>
                  </tr>  
                ))}
                <tr>  
                    <td colSpan="3"></td>                   
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pdebito)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcredito)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pdeudor)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pacreedor)}</b></td>
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


function Saldos ({value1, value2}) {    
  const componentRef = useRef();   
  const { saldos, totalAcreedor, totalCreditos, totalDebitos, totalDeudor } = useSelector(state => state.contables)  
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
            pdata={saldos}                                    
            pvalue1={value1}
            pvalue2={value2}
            puser={user}
            pdebito={totalDebitos}
            pcredito={totalCreditos}
            pacreedor={totalAcreedor}
            pdeudor={totalDeudor}
            
        />
    </div>
     )
}


export default Saldos