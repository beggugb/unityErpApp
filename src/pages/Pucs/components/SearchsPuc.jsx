import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    Button, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem
  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";


const SearchsPuc = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.pucs)  
    const { items, item  } = useSelector(state => state.comprobantes)  
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');    
    const [puc, setPuc] = useState({});

    
    const [debe, setDebe] = useState(0);
    const [haber, setHaber] = useState(0);
  

    
    const changeHandler = event => {    
      const { value } = event.target        
      let prop = isNaN(value) ? 'descripcion':'codigo'      

      const name = value.toLowerCase().trim();
      if (!value) {      
        clearInput();
        return;
      }  
      setName(value)
      setOpen(true)
  
      if (name) {
        search(prop,name);
      }       
    } 
    const search = (prop,searchTerm) =>{      
  
      dispatch(crudActions.GET_LIST('PUCS_LISTA','pucs',prop,searchTerm)) 
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)      
      setDebe(0)
      setHaber(0)
    } 
    
    
    const add = () =>{  
      console.log(items)
      let ites = [...items]      
      let sDebe  = parseFloat(item.tDebe)
      let sHaber = parseFloat(item.tHaber)        
      
      let itemAsiento = {};        
        itemAsiento.pucId          = puc.id;
        itemAsiento.comprobanteId  = item.id;
        itemAsiento.codigo      = puc.codigo; 
        itemAsiento.descripcion = puc.descripcion;                        
        itemAsiento.debe        = parseFloat(debe)
        itemAsiento.haber       = parseFloat(haber)        
        ites.push(itemAsiento);           
        sDebe = parseFloat(sDebe) +parseFloat(debe)        
        sHaber = parseFloat(sHaber) +parseFloat(haber)        
        dispatch({type:'COMPROBANTES_SET_ITEMS',values:ites})  
        dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE','tDebe',sDebe))
        dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE','tHaber',sHaber))    
        clearInput()
    }

    const handleAsignar = (puc) =>{            
      setPuc(puc)  
      setName('('+puc.codigo+') - '+puc.descripcion+' ('+puc.tipo+')')    
      setOpen(false)
    }

 
    return (       
      <>             
      <Row>                
        <Col> 
         <Card>        
          <CardBody>                 
            <Row form>                      
                      <Col md={7}>
                        <FormGroup>   
                        <Label for="eNombre">Nombres o código</Label>                 
                          <Input 
                            type="text" 
                            name="name"                             
                            id="name"  
                            value={name || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>                 
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eValor">Debe</Label>                 
                          <Input 
                            type="number" 
                            name="debe"                             
                            id="debe"                                
                            value={debe}                          
                            onChange={(e) => setDebe(e.target.value)} 
                           
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eValor">Haber</Label>                 
                          <Input 
                            type="number" 
                            name="haber"                             
                            id="haber"    
                            value={haber}                          
                            onChange={(e) => setHaber(e.target.value)} />
                        </FormGroup>
                      </Col>
                                      
                      <Col md={1}>
                        <Button className={ (debe === 0 || haber === 0)  ? "btn-rd btn-disabled mt-3":"btn-rd btn-danger mt-3"}
                          onClick={() => add() }
                        >
                         <FontAwesomeIcon icon={faArrowDown} />                          
                        </Button>
                      </Col>
                    </Row>                  
                </CardBody>
              
                </Card>          
                </Col>               
              </Row> 
          
              
              { open ?              
                <Card className="resultArt">           
                  <CardBody>
                    {data &&
                    <ListGroup>
                      {data.map(item =>(
                        <ListGroupItem
                          key={item.id}
                          onClick={() => handleAsignar(item) }
                        >
                        <b>{item.codigo}</b> - {item.descripcion} - ({item.tipo})  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}                

          </>                                     
    );
};
export default SearchsPuc;
