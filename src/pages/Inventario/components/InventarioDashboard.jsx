import React,{useEffect} from "react";
import {  
  Row,
  Col,
  Card, CardHeader, CardTitle, CardBody, Table
} from "reactstrap"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions/crud.actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faTags } from "@fortawesome/free-solid-svg-icons";

const InventarioDashboard = () => {
  const dispatch = useDispatch()
  const { categorias } = useSelector(state => state.informes) 
  const { total, data } = useSelector(state => state.articulos)
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
    title: {
      text: ''
    },
    credits:
    {
    enabled:false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },  
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: categorias
}]
  }
  

  const getCategorias = () => {           
    const item = {}
    item.usuarioId = 0    
    dispatch(crudActions.GET_INFORMES('INFORMES_CATEGORIAS','categorias',item))                 
  }  

  const getArticulos = () => {       
    dispatch(crudActions.GET_DATA('ARTICULOS_DATA','articulos',1,15,'id','desc'))                 
  }

  useEffect(() => {
    getCategorias()
    getArticulos()
    return () => {
      console.log('descarga cliente')
    };
  }, []);
  return(
    <>
    <Row className="mt-4">
          <Col md={8}>
            <Card>
            <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faChartBar} /></div>
              <CardTitle className="text-dark">PRODUCTO x CATEGORIA</CardTitle>              
              </CardHeader>
              <CardBody>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
              </CardBody>            
            </Card>    
          </Col>  
          <Col md={4}>
          <Card>    
             <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faTags} /></div>
              <CardTitle className="text-dark"> {total} ARTICULOS</CardTitle> 
                      
              </CardHeader>    
              <CardBody>
              <Table className="table-simple">
                <thead>
                    <tr> 
                      <th width="80%">Nombre</th>                      
                      <th width="20%">Marca</th>                              
                    </tr>
                </thead>
                {data && (
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>                                                                                                     
                              <td>{item.nombre}</td>                                                
                              <td>{item.marca}</td>                                          
                            </tr>  
                            ))}
                    </tbody>
                )}
              </Table>
              </CardBody>              
            </Card>    
          </Col>            
        </Row>       
        <Row className="mt-4">
          <Col md={12}>
            <Card>
            <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faChartBar} /></div>
              <CardTitle className="text-dark">ULTIMOS MOVIMIENTOS</CardTitle>              
              </CardHeader>
              <CardBody>
              
              </CardBody>              
            </Card>    
          </Col>             
        </Row>
        </>
  )

};
export default InventarioDashboard;
