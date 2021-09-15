export const checkSession = (source, history, cookie) => {
    if(cookie == null || cookie == undefined || cookie.data == null || cookie.data == undefined){
        if(source != "login"){
            history.push("/login");
            return;
        }
    }
    else {
        const {data} = cookie;
    }

}