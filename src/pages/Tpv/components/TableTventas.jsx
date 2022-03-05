import React,{useEffect, useCallback, useState} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableTventas = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.articulos)   
   

   const makeHttpRequestWithPage = useCallback((page,num) =>{          
     dispatch(crudActions.getData('ARTICULOS_DATA','articulos',page, num ))      
  },[]) 

  const viewArticulo = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'ARTICULOS_VIEW',view:true}) 
    dispatch(crudActions.getItem('ARTICULOS_ITEM','articulos',pky))
  };

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('ARTICULOS_DATA','articulos',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
    <>    
    <Row>
      <Col>
      <div className="table-single">     
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="15%" >Código</th>
                  <th width="45%">Nombre</th>
                  <th width="15%">Categoría</th>
                  <th width="15%">Marca</th>            
                  <th width="10%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>                  
                        <td>{item.categoria.nombre}</td>
                        <td>{item.marca.nombre}</td>                  
                        <td>
                          <Button className="btn btn-success" 
                            onClick={() => { getComponent('edit',item.id)}}                           >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn btn-info" 
                            onClick={() => { viewArticulo(item.id)}}>
                            <FontAwesomeIcon icon={faFilePdf} />
                          </Button>  
                          <Button className="btn btn-danger" 
                            onClick={() => { deleteItem(item.id)}}                           >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                 
                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </div>
      <div className="navegador" >
      <Pagination
        makeHttpRequestWithPage={ makeHttpRequestWithPage }
        total={total}
        paginas={paginas}
        current= {pagina} 
        pagina= {12}
      />
      </div>

      </Col>
    </Row>       
</>      
  )

};
export default TableTventas;
