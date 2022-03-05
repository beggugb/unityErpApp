import React,{useEffect, useCallback, useState} from "react";
import { Table, Row, Col, Card, CardBody,  CardFooter, FormGroup, Label, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Pagination from '../../../components/Pagination'
import { customStyles } from '../../../helpers/customStyles'
import Select from 'react-select'  
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

const TableArticulos = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador}= useSelector(state => state.articulos)   
   const makeHttpRequestWithPage = useCallback((page,num) =>{          
     dispatch(crudActions.GET_DATA('ARTICULOS_DATA','articulos',page, num,'nombre','ASC' ))      
  },[]) 

 
  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  const setIndicador = (pky) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'ARTICULOS_INDICADOR',value:iok}) 
  };
  useEffect(() => {
      makeHttpRequestWithPage(1,pag)
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      dispatch({type:'ARTICULOS_RESET_DATA'})
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
                <th width="15%" >Código</th>
                <th width="40%">Nombre</th>
                <th width="20%">Categoría</th>
                <th width="20%">Marca</th>                              
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
                        <td>{item.nombre}</td>                  
                        <td>{item.categoria}</td>
                        <td>{item.marca}</td>                                          
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
export default TableArticulos;
