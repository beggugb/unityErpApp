import React,{useEffect} from "react";
import { Row,Col, Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt,faUser, faTags, faReceipt, faUsers, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../actions'
import { usuarioActions} from "../../actions"
import TableProcesos from '../Procesos/components/TableProcesos'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Dashboard = () => {
  const dispatch = useDispatch()   
  const { totales,comprasItem, comprasLabel, ventasT, cobrosTrue, cobrosFalse, pagosTrue, pagosFalse } = useSelector(state => state.informes)
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  
  const makeHttpRequestWithPage = () =>{
    let iok={
      "dato":1
    }
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD','consolidado',iok))      
  }
  const logoutt = () => {    
    dispatch(usuarioActions.logout())  
  };
  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      console.log('exit clients view')
    };
  }, []);

  const compras = {
    chart: {
      type: 'bar'
  },
  title: {
      text: 'Compras'
  },
  subtitle: {
      text: 'Gestión: 2020'
  },
  xAxis: {
      categories: comprasLabel,
      title: {
          text: null
      }
  },

 
  credits: {
      enabled: false
  },
  series: [{
      name: 'Compras 2020',
      data: comprasItem
    }]
  }

  const ventas = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Ventas'
  },
  subtitle: {
    text: 'Gestión: 2020'
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
  credits: {
    enabled: false
  },
  series: [{
      name: 'Unidades',
      colorByPoint: true,
      data: ventasT
  }]
  }

  const cobros ={
    chart: {
      type: 'column'
  },
  title: {
      text: 'Cobros'
  },
  subtitle: {
      text: 'Gestión: 2020'
  },
  xAxis: {
      categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
      ],
      crosshair: true
  },

  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  credits: {
    enabled: false
},
  series: [{
      name: 'Pendientes',
      data: cobrosFalse

  }, {
      name: 'Cobrados',
      data: cobrosTrue

  }]
  }
  const pagos ={
    chart: {
      type: 'column'
  },
  title: {
      text: 'Pagos'
  },
  subtitle: {
      text: 'Gestión: 2020'
  },
  xAxis: {
      categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
      ],
      crosshair: true
  },

 
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  credits: {
    enabled: false
},
  series: [{
      name: 'Pendientes',
      data: pagosFalse

  }, {
      name: 'Pagados',
      data: pagosTrue

  }]
  }

  return(
    <div className="content">     
      <div className="main-contenido">
      <Row className="barraUser">
        <Col md={8}> 
                                    
        </Col>        
        <Col md={2}>                    
          <p>Usuario: {usuario.nombres}</p>
        </Col>   
        <Col md={1}> 
        <div className="circulu">
          <FontAwesomeIcon icon={faUser} />  
        </div>                    
        </Col>   
        <Col md={1}> 
          <Button className="btn btn-danger btn-xs mt-1" onClick={() => {logoutt()}} >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Button>                            
        </Col>            
      </Row>

        
  
        <Row className="mt-1">
          <Col md={3}>
            <Card>
            <CardHeader>
              <div className="card-icono mt-1"><FontAwesomeIcon icon={faTags} /></div>
              <CardTitle className="text-dark mt-2">ARTICULOS</CardTitle>
              <p>{totales.articulosT}</p>                                    
              </CardHeader>              
            </Card>    
          </Col>  
          <Col md={3}>
          <Card>
            <CardHeader>
            <div className="card-icono mt-1"><FontAwesomeIcon icon={faUsers} /></div>
              <CardTitle className="text-dark mt-2">CLIENTES</CardTitle>                                    
              <p>{totales.clienteT}</p> 
              </CardHeader>
          </Card>    
          </Col>  
          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-icono mt-1"><FontAwesomeIcon icon={faShoppingCart} /></div>
              <CardTitle className="text-dark mt-2"> COMPRAS</CardTitle>
              <p>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(totales.compraT.suma)}</p>                                   
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-icono mt-1"><FontAwesomeIcon icon={faReceipt} /></div>
              <CardTitle className="text-dark mt-2"> VENTAS</CardTitle>
              <p>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(totales.ventaT.suma)}</p>                                    
              </CardHeader>
          </Card>    
          </Col> 
          
        </Row>  

        <Row className="mt-1">
          <Col md={4}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={compras}
                />
            </Card>    
          </Col>  
          <Col md={4}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={ventas}
                />
            </Card>    
          </Col>  
          <Col md={4}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={cobros}
                />
            </Card>    
          </Col> 
        </Row>      

        <Row className="mt-1">
          <Col md={8}>
            <Card>                       
              <CardBody>
                <h6>Comprobantes Pendientes de Aprobacion</h6>
                <TableProcesos/>
              </CardBody>
            </Card>    
          </Col>   
          <Col md={4}>
            <Card>                  
              <CardBody>
              <HighchartsReact
                  highcharts={Highcharts}
                  options={pagos}
                />
              </CardBody>
            </Card>    
          </Col>          
        </Row>
      </div>
    </div>    
  )

};
export default Dashboard;
