import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, FormGroup, Input, Modal, ModalBody, Card } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleCarry, faFileExport, faCheck, faSearch, faPlus, faCopy, faTrash, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { customs } from '../../../helpers/customStyles'

const page =[{"value":'razonSocial',"label":'nombre'},
             {"value":'nit',"label":'nit'}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }


const SearchProveedores = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, modalView }= useSelector(state => state.proveedores )
    const [prop, setProp] = useState('razonSocial');
    const [value, setValue] = useState("");
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
      dispatch(crudActions.GET_SEARCH('PROVEEDORES_DATA','proveedores',iok))              
   } 

   const toggleModalView = () => {        
    setview(!view)                  
  };

  const viewArticulo = () => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'PROVEEDORES_VIEW',view:est}) 
    dispatch(crudActions.GET_ITEM('PROVEEDORES_ITEM','proveedores',indicador))
  };  

  const onCopiar = () => {                  
    dispatch(crudActions.SET_COPIAR('PROVEEDORES_DATA','proveedores',indicador)) 
    dispatch({type:'PROVEEDORES_INDICADOR',value:0})
  };

  const onBorrar = () => {            
    dispatch(crudActions.GET_DELETE('PROVEEDORES_DATA','proveedores',indicador,'lista'))      
    dispatch({type:'PROVEEDORES_INDICADOR',value:0})
    setview(false)

  };
    return (              
      <>             
      <Card> 
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faPeopleCarry} />  
          </div>        
        </Col>
        <Col md={4} className="cards">
        <ButtonGroup>
          <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": " btl bg-defaults text-white"}  onClick={()=> getComponent('new',1)}><FontAwesomeIcon icon={faPlus}/> </Button>                 
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
            <FontAwesomeIcon icon={faFileExport} /></Button>
          <Button className={indicador === 0 ? "bts bg-default disabled text-white": "bts bg-default text-white"} onClick={()=> onCopiar()}>
            <FontAwesomeIcon icon={faCopy} /> </Button>
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> toggleModalView()}>
            <FontAwesomeIcon icon={faTrash} /> </Button>                                
          <Button className={indicador === 0 ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> viewArticulo()}>
            <FontAwesomeIcon icon={faFilePdf} /> </Button>               
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
        <p className="mt-3 ml-3" >{ total || 0 } PROVEEDORES</p>          
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
export default SearchProveedores;
