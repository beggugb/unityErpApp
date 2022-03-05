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
              <h6 className="text-center pio"> <b>INFORME DE DIARIOS  </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                           
              </Col>            
            </Row>  
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="10%" className="text-dark">Nº</th>
                <th width="15%" className="text-dark">Código</th>
                <th width="45%" className="text-dark">Detalle</th>                                                                                               
                <th width="15%" className="text-dark text-center">Debe</th>                    
                <th width="15%" className="text-dark text-center">Haber</th>                 
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item,index) => (
                  <tr key={item.id}>  
                    <td>{index+1}</td>
                    <td>{item.codigo}</td>
                    <td>{item.detalle}</td>                    
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.debe)}</td>
                    <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.haber)}</td>
                  </tr>  
                ))}
                <tr>  
                    <td colSpan="3"></td>                   
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pdebito)}</b></td>
                    <td className="text-center"><b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcredito)}</b></td>
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


function Movimientos ({value1, value2}) {    
  const componentRef = useRef();   
  const { diarios, sumaDebito, sumaCredito } = useSelector(state => state.contables)  
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
            pdata={diarios}                                    
            pvalue1={value1}
            pvalue2={value2}
            puser={user}
            pdebito={sumaDebito}
            pcredito={sumaCredito}
            
        />
    </div>
     )
}


export default Movimientos