import React,{useState, useEffect, useCallback} from "react";
import { FormGroup, Label, Table, Row, Col, Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Pagination from '../../../components/Pagination'
import { customStyles } from '../../../helpers/customStyles'
import Select from 'react-select' 

const page =[{"value":15,"label":"15"},
             {"value":30,"label":"30"},
             {"value":50,"label":"50"}             
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            } 

const TableProveedores = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador}= useSelector(state => state.proveedores)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('PROVEEDORES_DATA','proveedores',page, num,'razonSocial','asc'))  
    console.log('segui1')
  },[]) 



  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  const setIndicador = (pky) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'PROVEEDORES_INDICADOR',value:iok}) 
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
      /*    cleanup*/
      dispatch({type:'PROVEEDORES_RESET_DATA'})
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
                  <th width="15%">Codigo</th>
                  <th width="50%">Razon Social</th>
                  <th width="15%">Tipo Fiscal</th>
                  <th width="15%">Nit</th>                                       
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}> 
                        <td >                       
                          <Input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />                       
                        </td>                      
                        <td>{item.codigo}</td>
                        <td>{item.razonSocial}</td>
                        <td>{item.tipoFiscal}</td>
                        <td>{item.nit}</td>   
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
export default TableProveedores;
