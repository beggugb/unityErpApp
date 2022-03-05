import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Moment from 'react-moment'
import { Table, Row, Col, Card, CardBody, CardFooter, FormGroup, Label} from "reactstrap";
import { customStyles } from '../../../helpers/customStyles'
import Pagination from '../../../components/Pagination'
import Select from 'react-select'  

const page = [{"value":15,"label":"15"},
             {"value":24,"label":"24"},
             {"value":36,"label":"36"}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            } 

function CajasItemsTable () {                
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(15); 
  const { data, pagina, paginas } = useSelector(state => state.cajasitems)
  const cajai = useSelector(state => state.cajas.item)
   
    
  const makeHttpRequestWithPage = (page, num) =>{        
    dispatch(crudActions.GET_DATA('CAJAS_ITEMS_DATA','cajasitems',page, num, cajai.id,cajai.id))     
  }

  const changeSelect = (pky) => {        
    const {value} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };
  useEffect(() =>{          
     return () =>{            
        /*dispatch(crudActions.setReset('CAJAS_ITEMS_RESET'))
        dispatch(crudActions.setReset('CAJAS_RESET_ITEM'))        */
    };
  }, []);

  

  return (    
    <>
      <Row>
      <Col>
        <Card>
          <CardBody>
            <Table className="table-simple">
              <thead>
                  <tr>                        
                  <th width="10%">#</th>
                  <th width="10%">Fecha</th>
                  <th width="50%">Label</th>
                  <th width="20%">Tipo</th>
                  <th width="20%">Monto</th>                  
                  </tr>
              </thead>
              {data && (
              <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>                      
                        <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>                           
                        <td>{item.label}</td>
                        <td>{item.tipo}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
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
  );
}

export default CajasItemsTable