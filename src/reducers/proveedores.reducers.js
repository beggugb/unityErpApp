const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    item:{      
      codigo: '',
      tipoFiscal: 'personal',      
      razonSocial: '',
      direccion:'',      
      pais:'',
      ciudad:'',
      contacto:'',
      email:'',
      web:'',
      telefono:'',
      nit:'',
      filename:'',
      formaPago:'',
      banco:1,
      cuenta:'',  
      observaciones:''
    }    
  };
  
export function proveedores(state = initialState, action) {
    switch (action.type) {
      case "PROVEEDORES_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "PROVEEDORES_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
      case "PROVEEDORES_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PROVEEDORES_ADD":
        return {
          ...state,
          item: action.response
        };
      case "PROVEEDORES_ITEM":
          return {
            ...state,
            item: action.response
          };
      case "PROVEEDORES_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "PROVEEDORES_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "PROVEEDORES_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "PROVEEDORES_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };            
      case "PROVEEDORES_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "PROVEEDORES_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "PROVEEDORES_RESET_DATA":
          return {
            ...state,            
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0
          };  

        
      default:
        return state;
    }
  }
  