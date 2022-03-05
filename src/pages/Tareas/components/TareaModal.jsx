import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Form, Label, ButtonGroup, Button, Input, FormGroup } from 'reactstrap'
import Select from 'react-select'


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const importancia =[{"value":"#1da1f2","label":"Normal"},
                    {"value":"#fd5d93","label":"Urgente"}                    
                 ];

const ModalTask = ({ changeHandle, changesHandle, submitHandle, task }) => (
  <Card>
      <CardHeader>
        <CardTitle>Procesos</CardTitle>                                    
        </CardHeader>
        <CardBody>
        <Form onSubmit={ submitHandle }>        
          <FormGroup>        
          <Label for="title">Tarea</Label>
            <Input                            
              type="textarea"          
              name="title"                            
              value={task.title }
              onChange={ changeHandle}          
              required
            />
            </FormGroup>   
            <FormGroup>
                  <Label for="backgroundColor">Importancia</Label>
                  <Select                                                               
                      name="backgroundColor"                        
                      options={importancia}                                
                      value={defaultVal(importancia,task.backgroundColor)}                                                                                                                           
                      onChange={ changesHandle }          
            />
            </FormGroup>  
            <div className="button-container">
              <ButtonGroup>
                <Button className="btn-info mt-5 btn-md">
                  {' '} Registrar
                </Button>
              </ButtonGroup>
            </div>                
        </Form>  
        </CardBody>
  </Card>
 );

export default ModalTask
