import React,{useState, useEffect, useCallback} from "react";
import { FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'
import { customStyles } from '../../../helpers/customStyles'
import Select from 'react-select' 

const page =[{"value":15,"label":"15"},{"value":30,"label":"30"},{"value":50,"label":"50"}];
const niveles =[{"value":0,"label":"Nivel"},
              {"value":1,"label":"1"},
              {"value":2,"label":"2"},
              {"value":3,"label":"3"},
              {"value":4,"label":"4"},
              {"value":5,"label":"5"},
              {"value":6,"label":"6"},
              {"value":7,"label":"7"}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }      


const TablePucs = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.pucs)
   const [nivel, setnivel] = useState(0);
  

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('PUCS_DATA','pucs',page, num,0,0))      
    console.log('segui1')
  },[]) 

  const changeNivel = (pky) => {  
    const {value} = pky  
    dispatch(crudActions.GET_DATA('PUCS_DATA','pucs',1, 15,value,value))      
  };

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('PUCS_ADD','pucs',pky,'lista'))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('PUCS_ITEM','pucs',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,15)
      return () => {
        dispatch({type:'PUCS_RESET_DATA'})   
      };
  }, []);

  const changeSelect = (pky) => {        
    const {value} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
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
                  <th width="12%">Código</th>
                  <th width="48%">Descripción</th>
                  <th width="15%" className="text-center">Tipo</th>                             
                  <th width="5%">
                  <Select                 
                        styles={customStyles}                                              
                        defaultValue={page[0]}
                        name="nivel"    
                        id="nivel"                    
                        options={niveles}      
                        isClearable={false}                          
                        value={defaultVal(niveles,nivel)}    
                        onChange={ (e) => changeNivel(e)}                                             
                      />
                  </th>                             
                  <th width="15%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.codigo}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.tipo}</td>
                        <td className="text-center">{item.nivel}</td>
                        <td className="text-center">
                          <Button className="btn-tb btn-primary" 
                            onClick={() => { getItem(item.id)}}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>  
                          <Button className="btn-tb btn-danger" 
                            onClick={() => { deleteItem(item.id)}}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button> 

                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
        </CardBody>    
        <CardFooter>
        <Row>                                            
              <Col md={8} >
                  <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={paginas}
                    current= {pagina} 
                    pagina= {pag}
                  />
              </Col>          
              <Col md={2}>                  
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
export default TablePucs;
