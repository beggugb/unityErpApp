import React,{useEffect, useCallback, useState} from "react";
import { FormGroup, Label, Table, Row, Col,  Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Pagination from '../../../components/Pagination'
import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles } from '../../../helpers/customStyles'

const page = [{"value":15,"label":"15"},
             {"value":24,"label":"24"},
             {"value":36,"label":"36"}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }  
const TableComprobantes = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador }= useSelector(state => state.comprobantes)
  

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('COMPROBANTES_DATA','comprobantes',page, num,'id','desc'))  
    console.log('segui1')
  },[]) 

  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,15)
      dispatch(crudActions.GET_ITEM('EMPRESAS_ITEM','empresas',1)) 
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  const setIndicador = (pky,est,monto) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'COMPROBANTES_INDICADOR',value:iok,estado:est,indicadorTotal:monto}) 
  };

  return(
    <>    
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Table className="table-simple">
          <thead>
              <tr>  

                  <th width="5%"></th>
                  <th width="5%">Nro.</th>                  
                  <th width="10%">Tipo</th>
                  <th width="10%">Fecha</th>
                  <th width="10%">Sujeto</th>
                  <th width="40%">Glosa</th>                                                      
                  <th width="10%">Total</th>                  
                  <th width="10%">Estado</th>                  
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item, index) => (
                      <tr key={index}>                    
                        <td >                       
                        <Input type="checkbox" 
                        onChange={() => { setIndicador(item.id, item.estado, item.total) }} 
                        checked={ item.id === indicador ? true : false}
                        /></td>
                        <td>{item.numComprobante}</td>
                        <td>{item.tipoComprobante}</td>
                        <td><Moment format="DD-MM-YYYY">{item.fechaComprobante}</Moment></td>                        
                        <td>{item.label}</td>
                        <td>{item.glosaComprobante}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoTotal)}</td>
                        <td>{item.estado}</td>
                        
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </CardBody>    
      <CardFooter>     
    <Row>  
    <Col md={6} >
                  <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={paginas}
                    current= {pagina} 
                    pagina= {pag}
                  />
              </Col>          
              <Col md={4}>                  
              </Col>
              <Col md={2}>   
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>Mostrar</Label>
                  <Col sm={7}>
                      <Select                 
                        styles={customStyles}                                              
                        defaultValue={page[0]}
                        name="pag"    
                        id="pag"                    
                        options={page}      
                        isClearable={false}                          
                        value={defaultVal(page,pag)}    
                        onChange={ (e) => changeSelect(e)}                                             
                      />
                  </Col>
                  </FormGroup>
              </Col>  
    </Row>  
    </CardFooter> 
        </Card>  
      </Col>
    </Row>    
</>      
  )

};
export default TableComprobantes;
