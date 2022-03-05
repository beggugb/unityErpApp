export function authHeader() {

    let user  = JSON.parse(localStorage.getItem('@userUnity'));
    let token = JSON.parse(localStorage.getItem('@userToken'));

if (user && token){
    return { 'x-access-token': token };
}else{
    return { };
}

}