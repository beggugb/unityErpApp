import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Card, Row, Col, Modal, ModalBody, Button, ListGroup, ListGroupItem  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash, faHome } from "@fortawesome/free-solid-svg-icons";
import {toastr} from 'react-redux-toastr'
import { api } from "../../../helpers";
const ListaArticulos = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.articulos)  
    const { items, cantidadTotal, sumaTotal } = useSelector(state => state.ventas)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
    


    const handleAsignar = (articulo) => {   
      console.log(articulo)
      if(articulo.stock > 0)
      {
        let ites = [...items]
        let cTotal = cantidadTotal
        let sTotal = sumaTotal
        let repeat = false

        ites.map((item, index) =>{                              
          if(item.articuloId === articulo.articuloId && item.stock < articulo.stock)
            { 
              ites[index].cantidad = parseFloat(ites[index].cantidad) + 1 
              ites[index].subTotal = ites[index].subTotal + parseInt(articulo.valor)        
              ites[index].stock = ites[index].stock + 1
              cTotal = parseInt(cTotal) + 1;    
              sTotal = parseInt(sTotal) + parseInt(articulo.valor) 
              repeat = true;
            }
            if(item.articuloId === articulo.articuloId)
            {                        
              repeat = true;
            }
          return null
        })

        if(!repeat)
          {
          let itemVenta = {};
            itemVenta.cantidad = 1;          
            itemVenta.articuloId = articulo.articuloId;        
            itemVenta.valor = articulo.valor;
            itemVenta.unidad = articulo.unidad;
            itemVenta.stock = 1;
            itemVenta.subTotal = parseInt(1) * parseInt(articulo.valor);        
            itemVenta.nombre = articulo.nombreCorto;  
            itemVenta.sumStock = articulo.stock;  
            ites.push(itemVenta);   
            cTotal = parseInt(cTotal) +parseInt(1);    
            sTotal = parseInt(sTotal) +parseInt(itemVenta.subTotal)          
          }
          dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, suma: sTotal})
          }else{
            toastr.error(articulo.nombreCorto, 'Sin Stock') 
          }
    }  


    const makeHttpRequestWithPage = useCallback((page,num) =>{          
      let iok ={
        "almacenId": almacenId.id,
        "pagina":page,
        "num":num,
        "name":"",
        "codigo":"",
        "categoriaId":0,
        "stock":3
      } 
      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',iok))          

     },[]) 
   
    
    useEffect(() => {
        makeHttpRequestWithPage(1,12)
        return () => {   
            dispatch({type:'ARTICULOS_RESET_DATA'})          
        };
    }, []);


    return (              
        <>             
        {data.map((item,index) => (
        <Card key={index} className="articulo" onClick={() => handleAsignar(item) }>
          <div className="precio">
          {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}  
          </div>            
            <img
            alt="artículo"
            className="img-articulo"
            src={api + "/static/images/articulos/md/" + item.filename}
            />          
          <div className="nombre">{item.nombreCorto}</div>
          <div className={item.stock > 0 ?"stocki" :"stock"}>{item.stock}</div>            
        </Card>
        ))}        
        </>                                             
    );
};
export default ListaArticulos;
