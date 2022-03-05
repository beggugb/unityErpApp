import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import Moment from 'react-moment'

const TareaView = ({ task }) => (
  <Card>
    <CardHeader>
      <CardTitle>Tarea</CardTitle>                                    
      </CardHeader>
      <CardBody>
      <p className="tt">Tarea # { task.id }</p>
      <p className="tt"><Moment format="DD/MM/YYYY">{ task.start}</Moment></p>
      <p className="tu">{ task.title }</p>       
      </CardBody>
</Card>
 );

export default TareaView
