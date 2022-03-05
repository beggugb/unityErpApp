import React,{useState} from "react";
import { Modal, ModalBody, Card, ButtonGroup, Row,Col,Button, Form, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faQrcode, faCheck, faSearch, faPlus, faBarcode, faFileExport, faCopy, faTrash, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { customs } from '../../../helpers/customStyles'

const page =[{"value":'codigoBarras',"label":'codigo'},
             {"value":'nombre',"label":'nombre'},             
             {"value":'descripcion',"label":'descripcion'}
            ];

const defaultVal = (options, valor) =>{
    return options.filter(item =>
           item.value === valor
  )}



const SearchArticulos = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, modalView, modalViews,modalViewq }= useSelector(state => state.articulos)
    const [prop, setProp] = useState('nombre');
    const [value, setValue] = useState();
    const [view, setview] = useState(false);

    const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };

        
    const submitHandle = event => {       
        event.preventDefault()  
        let iok = {}               
        iok.value = value
        iok.prop  = prop
        dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','articulos',iok))              
     }  
 
    const onCopiar = () => {                  
      dispatch(crudActions.SET_COPIAR('ARTICULOS_DATA','articulos',indicador)) 
      dispatch({type:'ARTICULOS_INDICADOR',value:0})
    };
  
    const onBorrar = () => {            
      dispatch(crudActions.GET_DELETE('ARTICULOS_DATA','articulos',indicador,'lista'))      
      dispatch({type:'ARTICULOS_INDICADOR',value:0})
      setview(false)

    };

    const viewArticulo = (pky) => {        
      /*if(pky === 'pdf'){
        let est = modalView === true ? false : true;             
        dispatch({type:'ARTICULOS_VIEW',view:est})         
      }else{
        let est = modalViews === true ? false : true;                     
        dispatch({type:'ARTICULOS_BARRAS',view:est}) 
      } */
      let est = false
      switch(pky) 
      {
        case 'pdf':
          est = modalView === true ? false : true;             
          dispatch({type:'ARTICULOS_VIEW',view:est})
          break;
        case 'barras':
          est = modalViews === true ? false : true;                     
          dispatch({type:'ARTICULOS_BARRAS',view:est}) 
          break;
        case 'qr':
          est = modalViewq === true ? false : true;                     
          dispatch({type:'ARTICULOS_QR',view:est}) 
          break;      
        default:
          break;
      }    


      dispatch(crudActions.GET_ITEM('ARTICULOS_ITEM','articulos',indicador))
    };   
    
    const toggleModalView = () => {        
      setview(!view)                  
    };

    
  return (              
    <> 
    <Card>             
    <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faTags} />  
          </div>        
        </Col> 
        <Col md={4} className="cards">
        <ButtonGroup>
          <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": "btl bg-defaults text-white"}  onClick={()=> getComponent('new',1)}><FontAwesomeIcon icon={faPlus}/> </Button>                 
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
                 <FontAwesomeIcon icon={faFileExport} /></Button>    
          <Button className={indicador === 0 ? "bts bg-default disabled text-white": "bts bg-default text-white"} onClick={()=> onCopiar()}>
                 <FontAwesomeIcon icon={faCopy} /> </Button>             
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> toggleModalView()}>
                 <FontAwesomeIcon icon={faTrash} /> </Button>                                
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> viewArticulo('pdf')}>
                 <FontAwesomeIcon icon={faFilePdf} /> </Button>  
          <Button className={indicador === 0 ? "bts bg-default disabled text-white": "bts bg-default text-white"} onClick={()=> viewArticulo('barras')}>
                 <FontAwesomeIcon icon={faBarcode} /> </Button>    
          <Button className={indicador === 0 ? "btr bg-default disabled text-white": "btr bg-default text-white"} onClick={()=> viewArticulo('qr')}>
                 <FontAwesomeIcon icon={faQrcode} /> </Button>              
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
        <p className="mt-3 ml-3" >{ total || 0 } ARTICULOS</p>          
        </Col>
    </Row>
    </Card>   

    <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea borra el registro ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalView()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onBorrar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>
    </>    
              
                         
    );
};
export default SearchArticulos;
