import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, FormGroup, Input, Card   } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faSearch, faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
import { customs } from '../../../helpers/customStyles'
import Select from 'react-select'  
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const page =[{"value":'observaciones',"label":'glosa'},
             {"value":'cliente',"label":'cliente'},
             {"value":'fechaVenta',"label":'fecha'},
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }


const SearchCobro = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, ventaId}= useSelector(state => state.cobros)    
    const [prop, setProp] = useState('observaciones');
    const [value, setValue] = useState("");    

   const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
      setValue('')
    };        
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop      
      dispatch(crudActions.GET_SEARCH('COBROS_DATA','notas/venta',iok))             
   }  
  
 
    return (                                      
            
        <>             
       <Card> 
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faMoneyBill} />  
          </div>        
        </Col>
        <Col md={4} className="cards">
        <ButtonGroup>
          <Button className={indicador === 0 ? "btl bg-defaults text-white disabled": " btl bg-defaults text-white"}  onClick={()=> getComponent('edit',ventaId)}>
            <FontAwesomeIcon icon={faCoins}/> 
          </Button>                                         
        </ButtonGroup>
        </Col>

        <Col md={1} className="cards text-right">
          <Select                 
                styles={customs}                                              
                defaultValue={page[0]}
                name="prop"    
                id="prop"                    
                options={page}      
                isClearable={false}                          
                value={defaultVal(page,prop)}    
                onChange={ (e) => changeSelect(e)}                                             
          />
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
        <p className="mt-3 ml-3" >{ total || 0 } COBROS</p>          
        </Col>
      </Row>  
      
    </Card> 
      

      

      
    </>                    
    );
};
export default SearchCobro;
