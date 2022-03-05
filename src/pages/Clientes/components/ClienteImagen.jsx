import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Input, Row, Col, FormGroup, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import { api } from "../../../helpers";


const ClienteImagen = () =>{
    const dispatch = useDispatch()
    const { item } = useSelector(state => state.clientes) 
    const [file,setFile] = useState('');
    const [imagePreviewUrl,setImagePreviewUrl] = useState('');    
    
    const handleSubmit = (e) =>{                     
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        dispatch(crudActions.SET_UPLOAD_IMAGEN(
          "cliente",          
          formData,
          item.id
        ));           
    }

    const handleImageChange = (e) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file)
        setImagePreviewUrl(reader.result)    
      };    
      reader.readAsDataURL(file);      
    }



return(
  <>      
      <div className="sub-form">  
      <Row className="perfilPreview">
        <Col>
        {imagePreviewUrl ? 
          <img alt="preview" className="img-perfil" src={imagePreviewUrl} />
        :
        <img          
          className="img-perfil"
          src={api + "/static/images/clientes/md/" + item.filename}
        />}
        </Col>
      </Row>
      { item.id ?
        <Row className="perfilSave">        
        <Col md="6">
         <FormGroup className="frmp mt-1">
           <Input
             type="file"
             id="file"
             name="formData"
             onChange={(e) => handleImageChange(e)}/>
           <FontAwesomeIcon icon={faImage} />  
         </FormGroup>
        </Col> 
        <Col md="6">
         <ButtonGroup>
           <Button
             className={
                         file
                           ? "submitButton btn-success btn-md"
                           : "submitButton disabled btn-md"
                       }
             type="submit"
             onClick={(e) => handleSubmit(e)}>
             <FontAwesomeIcon icon={faUpload} /> 
           </Button>
         </ButtonGroup>
        </Col> 
     </Row>
      : null
      }
        
     </div>   
    </>  
    )
}     
  
export default ClienteImagen;
