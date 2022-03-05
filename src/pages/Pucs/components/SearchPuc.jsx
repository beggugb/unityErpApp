import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Card, Button  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTags, faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { customs } from '../../../helpers/customStyles'
const tipo =[{"value":'codigo',"label":'codigo'},
             {"value":'descripcion',"label":'descripcion'}];

const defaultVal = (options, valor) =>{
    return options.filter(item =>
           item.value === valor
  )}

const SearchPuc = () => {
    const dispatch = useDispatch()    
    const { total, indicador, modalView }= useSelector(state => state.pucs)
    const [prop, setProp] = useState('codigo');
    const [value, setValue] = useState();
    
    const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };
    
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      console.log(iok)
      dispatch(crudActions.GET_SEARCH('PUCS_DATA','pucs',iok))      

     }   
    return (                                        
      <Card>          
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faTags} />  
          </div>        
        </Col>        

        <Col md={7} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={2}>
                 <Select                 
                      styles={customs}                                              
                      defaultValue={tipo[0]}
                      name="prop"    
                      id="prop"                    
                      options={tipo}      
                      isClearable={false}                          
                      value={defaultVal(tipo,prop)}    
                      onChange={ (e) => changeSelect(e)}                                             
                    />
              </Col> 
              <Col md={9}>
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
        <p className="mt-3 ml-3" >{ total || 0 } CUENTAS</p>          
        </Col>   
      </Row>
      </Card>                  
    );
};
export default SearchPuc;
