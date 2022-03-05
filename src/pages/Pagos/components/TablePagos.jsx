import React,{useEffect, useCallback, useState} from "react";
import { CardBody, CardFooter,  Table, Row, Col, Input, FormGroup, Label, Card  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Pagination from '../../../components/Pagination'

import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles } from '../../../helpers/customStyles'

const page = [{"value":12,"label":"12"},
             {"value":24,"label":"24"},
             {"value":36,"label":"36"}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            } 


const TablePagos = ({getComponent}) => {
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(12);
  const {data,pagina,paginas,indicador }= useSelector(state => state.pagos)
  

  const makeHttpRequestWithPage = useCallback((page, num) =>{
   dispatch(crudActions.GET_DATA('PAGOS_DATA','notas/pagos',page, num,'fechaPago','desc'))     
   console.log('segui1')
 },[]) 

 const changeSelect = (pky) => {        
   const {value} = pky
   setpag(value)
   makeHttpRequestWithPage(1,value)
 };

 useEffect(() => {
     makeHttpRequestWithPage(1,12)
     return () => {
     /*    cleanup*/
     console.log('clean table inventario')
     };
 }, []);

 const setIndicador = (pky,est,compra) => {            
   let iok = pky === indicador  ? 0 : pky
   dispatch({type:'PAGOS_INDICADOR',value:iok,estado:est,compra:compra}) 
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
                <th width="10%">Id</th>                                
                <th width="35%">Glosa</th>
                <th width="10%">Fecha Pago</th>
                <th width="10%">Cuota</th>                  
                <th width="10%">Monto</th>
                <th width="10%">Estado</th>                
                <th width="10%">Nº Compra</th>                
                <th width="10%">Finan</th>                
                
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} >                                                                  
                      <td >                       
                      <Input type="checkbox" 
                      onChange={() => { setIndicador(item.id, item.estado, item.compraId) }} 
                      checked={ item.id === indicador ? true : false}
                      /></td>                      
                      <td>{item.id}</td>                      
                      <td>{item.glosa}</td>
                      <td><Moment format="DD-MM-YYYY">{item.fechaPago}</Moment></td>                                 
                      <td>{item.cuota }</td>             
                      <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>                      
                      <td>{item.estado}</td>              
                      <td>{item.compraId}</td>                                                                                   
                      <td>{item.est ? "pagado":"pendiente"}</td>
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
export default TablePagos;
