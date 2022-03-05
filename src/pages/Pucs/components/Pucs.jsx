import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Input, Card,CardBody,ListGroup, ListGroupItem } from "reactstrap"
import { crudActions } from '../../../actions'


const Pucs = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.pucs)  
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');    

    
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
      let iok ={}      
      dispatch(crudActions.GET_LIST('PUCS_LISTA','pucs',prop,searchTerm)) 
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)      
      
    } 
    
  
    const handleAsignar = (puc) => {      
        dispatch({type:'PUCS_ITEM',response:puc}) 
        setName('('+puc.codigo+') - '+puc.descripcion+' ('+puc.tipo+')')  
        setOpen(false)
    }

 
    return (       
      <>
      <Input 
          type="text" 
          name="name"                             
          id="name"  
          value={name || ''}  
          onChange={changeHandler} />
               
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
export default Pucs;
