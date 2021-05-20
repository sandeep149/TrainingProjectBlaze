
function getToken() {
    let ud = localStorage.getItem("userdata");
    if (ud != null) {
        let parsedata = JSON.parse(ud);
        return parsedata;
    }
    return false;
}

export default getToken;