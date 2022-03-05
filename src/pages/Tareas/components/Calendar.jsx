import React, { useState,useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import TareaModal from './TareaModal'
import TareaView from './TareaView'
import { Modal } from "reactstrap";

import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions/crud.actions'
import { useCallback } from "react";

const getDay = (day) =>{     
  console.log(day)     
    let nday = '01';
    switch(day)
    {
      case 1:      
        nday = '01'
      break;
      case 2:      
        nday = '02'
      break;
      case 3:      
        nday = '03'
      break;
      case 4:      
        nday = '04'
      break;
      case 5:      
        nday = '05'
      break;
      case 6:      
        nday = '06'
      break;
      case 7:      
        nday = '07'
      break;
      case 8:      
        nday = '08'
      break; 
      case 9:      
        nday = '09'
        break;
      case 10:      
        nday = '10'
        break;
      case 11:      
        nday = '11'
        break;
      case 12:      
        nday = '12'      
        break;
      break;          
      default:
      break;
  
    }    
    return nday
  
  }

const getMes = () =>{
  let mesHoy = new Date()  
  let m = getDay(mesHoy.getMonth()+1)
  let y = mesHoy.getFullYear()

  let fecha ={}
  fecha.desde = `${y}-${m}-01`
  fecha.hasta = '0'  

  switch(m)
  {
    case '01':      
      fecha.hasta = `${y}-${m}-31`
    break;  
    case '02':
      fecha.hasta = `${y}-${m}-28`          
    break;  
    case '03':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '04':      
      fecha.hasta = `${y}-${m}-30`      
      break;
    case '05':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '06':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '07':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '08':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '09':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '10':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '11':      
      fecha.hasta = `${y}-${m}-30`
      break;        
    case '12':      
      fecha.hasta = `${y}-${m}-31`
      break;  
    default:
    break;

  }
  return fecha

}

function CalendarTask(){
  const dispatch = useDispatch()
  const [mount, setMount] = useState(false)
  const data  = useSelector(state => state.tareas.data)   
  const user = JSON.parse(localStorage.getItem('@userUnity'))

  const [modalRegister, setModalRegister] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [fechaId, setFechaId] = useState(0)

  const [task, setTask]= useState({
    id:'',
    usuarioId:0,
    start:'',
    end:'',
    title:'',
    url:'#',
    editable:false,
    selectable:false,
    backgroundColor: '#1da1f2'
  })
  
  const makeHttpRequestWithPage = useCallback((xredux, payload) =>{
    const {desde, hasta } = getMes()    
    console.log(desde)
    console.log(hasta)
    let dato = {}
    dato.usuarioId = user.id
    dato.start = desde
    dato.end = hasta
    dato.inicio = desde
    dato.fin = hasta
    dispatch(crudActions.GET_SEARCH(xredux, payload, dato))  
  },[dispatch,user])
  
  useEffect(() =>{        
    if(!mount) {
      setMount(true);
      makeHttpRequestWithPage('TAREAS_DATA','tareas');      
    }
     return () =>{            
        /*dispatch(crudActions.getReset('TAREAS_RESET'))      */
    };
  }, [dispatch, mount, makeHttpRequestWithPage]);

  const changeHandle = event => {                     
    const { name, value } = event.target;    
    setTask({      
        ...task,
        [name]: value,        
    })        
  }
  const changesHandle = event => {      
    setTask({      
        ...task,
        backgroundColor: event.value      
    })         
  }

  const toogleModalRegister = arg => {       
    const opt = !modalRegister 
    setModalRegister(opt)         
    setFechaId(arg)
  }

  const toogleModalView = item => {                                               
    if(modalView){
      const opt = !modalView
      setModalView(opt)
      setTask({
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
      })
    }else{
      const opt = !modalView
      setModalView(opt)
      setTask({
        id:item.id,          
        title: item.event.title
        
      })
    }
  }

  const submitHandle = event => {       
    event.preventDefault()    
    const {desde, hasta} = getMes()
    let dato = task
    dato.usuarioId = user.id
    dato.start = fechaId.date
    dato.end = fechaId.date  
    dato.inicio = desde
    dato.fin = hasta

    dispatch(crudActions.setAdd('TAREAS_DATA','tareas',dato,'lista'))  
    const opt = !modalRegister

    setModalRegister(opt)
    setFechaId('')
    setTask({
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
    })
 }

 const changeMonth = payload => {  
    console.log(payload)
 }

return(
  <>
      <FullCalendar      
     		locales={[ esLocale]}  
     		locale= {'es'}
        timeZone={'America/La_Paz'}
        navLinks={true}
     		plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        defaultView="dayGridMonth"                
        header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,listWeek'
            }}
     		events= { data }         
        eventLimit={ true}    
        dateClick={ toogleModalRegister }
        eventClick={ toogleModalView }     
        datesSet={ changeMonth }      
      />
      <Modal
        modalClassName="modal-task" 
        isOpen={modalRegister}
        toggle={toogleModalRegister } 
        >        
        <TareaModal
        changeHandle={ changeHandle }
        changesHandle={changesHandle}
        submitHandle={ submitHandle }
        task = {task}
        /> 
      </Modal>
      
      <Modal 
      modalClassName="modal-task"
      isOpen={modalView}
      toggle={ toogleModalView } 
      > 
      <TareaView
          task={task}                       
        />          
      </Modal>
  </>
)
}


export default CalendarTask