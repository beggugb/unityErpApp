import { authHeader, api } from "../helpers";

export const crudService = {  
  GET_DATA,  
  GET_ITEM,
  GET_ITEMS, 
  GET_SEARCH, 
  GET_SEARCHS,
  GET_INFORMES,
  GET_CONTABLES,  
  GET_LIST,
  GET_DELETE,
  SET_ADD,
  SET_UPDATE,
  SET_UPDATES,
  SET_UPLOAD_IMAGEN,
  SEND_MAIL,
  SET_COPIAR
};
function SET_COPIAR(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/item/copiar/${pky}`, requestOptions).then(handleResponse);
}

function SEND_MAIL(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/${pky}`, requestOptions).then(handleResponse);
}

function SET_UPLOAD_IMAGEN(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${api}/files/${payload}/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function GET_SEARCHS(payload, dato) {  
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/${payload}/searchs/lista`, requestOptions).then(handleResponse);
} 

function GET_SEARCH(payload, dato) {  
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/${payload}/search/lista`, requestOptions).then(handleResponse);
} 

function GET_ITEMS(payload, prop,orden) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/items/${prop}/${orden}`, requestOptions).then(handleResponse);
}
function SET_UPDATES(payload, dato, tipo) {    
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/${dato.item.id}/${tipo}`, requestOptions).then(  
    handleResponse
  );
}
function GET_DELETE(payload, pky, tipo) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/${pky}/${tipo}`, requestOptions).then(handleResponse);
}

function GET_LIST(payload,prop,orden) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${api}/${payload}/list/${prop}/${orden}`, requestOptions).then(handleResponse);
}

function GET_CONTABLES(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/contabilidad/${payload}`, requestOptions).then(handleResponse);
}

function GET_INFORMES(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/informes/${payload}`, requestOptions).then(handleResponse);
}



function GET_DATA(payload,page,num,prop,orden) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${api}/${payload}/data/${page}/${num}/${prop}/${orden}`, requestOptions).then(handleResponse);
}

function GET_ITEM(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/item/${pky}`, requestOptions).then(handleResponse);
}

function  SET_UPDATE(payload, dato, tipo) {  
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/${dato.id}/${tipo}`, requestOptions).then(
    handleResponse
  );
}

function SET_ADD(payload, dato, tipo) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/${tipo}`, requestOptions).then(handleResponse);
}




function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
