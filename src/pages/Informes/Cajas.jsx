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
              <h6 className="text-center pio"> <b>INFORME DE CAJAS  </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                           
              <h5 className="text-center pio"> Usuario  </h5>
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
                  <td><b>Nº Cajas : </b></td>
                  <td>{this.props.ptotal}</td>                     
                  <td><b>Suma Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.psuma || '0')}</td>                                       
                </tr>               
              </tbody>          
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="10%" className="text-dark">Nº</th>
                <th width="30%" className="text-dark">Usuario</th>
                <th width="10%" className="text-dark">F.Caja</th>
                <th width="10%" className="text-dark">M.Inicial</th>
                <th width="10%" className="text-dark">M.Ingreso</th>
                <th width="10%" className="text-dark">M.Egreso</th>
                <th width="10%" className="text-dark">M.Final</th>                                    
                <th width="10%" className="text-dark">F.Cierre</th>
                
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.id}</td>
                    <td>{item.usuario}</td>                                                                    
                    <td><Moment format="DD-MM-YYYY">{item.fechaCaja}</Moment></td>                              
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>
                    <td><Moment format="DD-MM-YYYY">{item.fechaCierre}</Moment></td>                              
                    </tr>  
                    ))}
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


function Cajas ({value1, value2}) {    
  const componentRef = useRef();   
  const { total, cajas, suma } = useSelector(state => state.informes)  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  useEffect(() =>{      
    return () =>{             
      /*dispatch(crudActions.setReset('INFORMES_RESET'))               */
      dispatch({type:'INFORMES_RESET'}) 

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
            puser={user}            
            pdata={cajas}                        
            ptotal={total}            
            psuma={suma}
            pvalue1={value1}
            pvalue2={value2}            
        />
    </div>
     )
}


export default Cajas