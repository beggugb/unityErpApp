import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { Table, Button, Col, Row  } from "reactstrap";
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
              <h6 className="text-center pio"> <b>INFORME DE EXISTENCIAS</b></h6>              
              <h5 className="text-center pio"> Almacen: {this.props.lalmacen}</h5>   
              <h5 className="text-center pio"> Categorias: {this.props.lcategoria}</h5>   
              <h5 className="text-center pio"> Artículo: {this.props.larticulo}</h5>
              <h5 className="text-center pio"> Rango : {this.props.prango}  a  {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pvrango || '0')}</h5>
              <h5 className="text-center pio"> Stock: {this.props.pstock === '2' ? "Sin Stock" : this.props.pstock === '3' ? 'Todos' : 'Con Stock' }</h5>
              
              </Col>            
            </Row>
        </div>
        <div className="report-body">                
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                  <th width="10%" className="text-dark">Almacen</th>                  
                  <th width="30%" className="text-dark">Artículo</th>
                  <th width="10%" className="text-dark">Categoría</th>
                  <th width="10%" className="text-dark">Marca</th>
                  <th width="15%" className="text-dark">$Venta</th>
                  <th width="10%" className="text-dark">Stock</th>
                  <th width="15%" className="text-dark">Σ</th>                                             
              </tr>
          </thead>

          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.almacen || ''}</td>                    
                    <td>{item.nombre || ''}</td>
                    <td>{item.categoria || ''}</td>
                    <td>{item.marca || ''}</td>                    
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.precioVenta)}</td>
                    <td>{item.stock}</td>                                                                                         
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.stock * item.precioVenta)}</td>                                       
                    </tr>  
                    ))}
            </tbody>
        )}
         
        </Table>

        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.user.nombres}</p>
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


function Existencias ({rango,vrango,stock}) {    
  const componentRef = useRef();   
  const { total, existencias, suma, labelCategoria, labelAlmacen, labelArticulo } = useSelector(state => state.informes)  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()

  
  useEffect(() =>{      
    return () =>{                   
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
            user={user}            
            pdata={existencias}
            lalmacen={labelAlmacen}
            lcategoria={labelCategoria}
            larticulo={labelArticulo}
            ptotal={total}            
            psuma={suma}
            prango={rango}
            pvrango={vrango}
            pstock={stock}

        />
    </div>
     )
}


export default Existencias