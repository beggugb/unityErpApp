const initialState = {
    data: []
  };
  
  export function tareas(state = initialState, action) {
    switch (action.type) {
      case "TAREAS_DATA":
        return {
          ...state,
          data: action.response.data
        };          
      case "TAREAS_RESET":
        return {
          ...state,
          data: []
        };
      default:
        return state;
    }
  }
  