import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Nav, NavItem, NavLink  } from "reactstrap";

const ListaCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)   
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc'))          
      },[])
    
    const changeHandler = (io) => {           
          let iok ={
        "almacenId": almacenId.id,
        "pagina":1,
        "num":20,
        "name":"",
        "codigo":"",
        "categoriaId":io,
        "stock":3
      } 
      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',iok))  
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {            
        };
    }, []);
    
    return (              
        <>    
        <div className="nav-sunitu" expand="lg">     
        <Nav>
        <NavItem>  
          <NavLink                
            onClick={() => changeHandler(0)}
            className="nav-link"> 
             Todos
          </NavLink>
        </NavItem>
        {data.map((item, index) => (
          <NavItem key={index}>  
          <NavLink                
            onClick={() => changeHandler(item.value)}
            className="nav-link"> 
             {item.label}
          </NavLink>
        </NavItem>             
        ))}
        </Nav>  
        </div>     
      </>                                             
    );
};
export default ListaCategoria;
