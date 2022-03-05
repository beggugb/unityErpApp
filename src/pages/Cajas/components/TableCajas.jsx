import React,{useEffect, useState, useCallback} from "react";
import { Table, Row, Col, Button, Card, CardBody, CardFooter, FormGroup, Label, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import Pagination from '../../../components/Pagination'
import Moment from 'react-moment'
import { customStyles } from '../../../helpers/customStyles'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

} 
const page = [{"value":15,"label":"15"},
             {"value":25,"label":"25"},
             {"value":35,"label":"35"},
             {"value":45,"label":"45"},
            ];

const TableCajas = () => {
   const dispatch = useDispatch() 
   const {data,pagina,paginas, indicador }= useSelector(state => state.cajas)
   const [pag, setpag] = useState(15);  
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('CAJAS_DATA','cajas',1,12, usuario.id,0))
    console.log('segui1')
  },[]) 


 const changeSelect = (pky) => {        
  const {value} = pky
  setpag(value)
  makeHttpRequestWithPage(1,value)
};

const setIndicador = (pky,est) => {            
  let iok = pky === indicador  ? 0 : pky
  dispatch({type:'CAJAS_INDICADOR',value:iok,estado:est}) 
};

  
  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'CAJAS_RESET_DATA'})   
      };
  }, []);




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
                <th width="10%">Fecha</th>
                <th width="20%">Usuario</th>
                <th width="10%">$ Inicial</th>
                <th width="10%">$ Ingreso</th>
                <th width="10%">$ Egreso</th>
                <th width="15%">$ Final</th>
                <th width="10%">Estado</th>   
                <th width="10%">F.Cierre</th>                                       
              </tr>
          </thead>
          {data && (
            <tbody>
            {data.map((item) => (
             <tr key={item.id}>  
                <td >                       
                <Input type="checkbox" 
                onChange={() => { setIndicador(item.id, item.estado) }} 
                checked={ item.id === indicador ? true : false}
                /></td>                      
               <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>     
               <td>{item.usuario.nombres}</td>     
<td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
<td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
<td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
<td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>
               
               <td className="text-center">{item.estado ? 
                 <Button className={"btn-tb btn-danger"}>
                   <FontAwesomeIcon icon={faLock} />
                 </Button>  
                 : 
                 <Button className={"btn-tb btn-success"}>
                   <FontAwesomeIcon icon={faLockOpen} />
                 </Button>  
               }</td>
               <td>
               {item.fechaCierre ? 
                 <Moment format="DD/MM/YYYY">{item.fechaCierre}</Moment>
                 :
                 <span>abierto</span>
               }                      
               </td>  
                  
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
export default TableCajas;
