import React,{useState} from "react";
import { Row,Col,Form, FormGroup, Input, Card, Button  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux'

const SearchCategoria = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total }= useSelector(state => state.categorias)
    const [prop, setProp] = useState('nombre');
    const [value, setValue] = useState();

    
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      dispatch(crudActions.GET_SEARCH('CATEGORIAS_DATA','categorias',iok))      
     }   

    return (              
      
      <Card>          
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faTags} />  
          </div>        
        </Col>        

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={11}>
                <Input 
                    type="text" 
                    name="value"                                 
                    id="value"  
                    value={ value || '' }  
                    onChange={ (e) => {setValue(e.target.value)}} />   
                    {
                      value ? 
                      <Button className="volatil" onClick={(e) => {setValue('')}}>
                        <FontAwesomeIcon icon={faTimes}   />
                      </Button>
                      : null
                    } 
              </Col>
              <Col md={1}>
                <Button className="btn-primary btn-search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>  
              </Col>              
          </FormGroup>       
          </Form>               
        </Col> 
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } CATEGORIAS</p>          
        </Col>   
      </Row>
      </Card>                     
               
    );
};
export default SearchCategoria;
