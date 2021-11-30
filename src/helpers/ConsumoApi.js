const helpers = {
    urlApi: "http://192.168.1.103:3000",
    MakeRequest: async function(url, metodo){
        const response = await fetch(url, {
        method: metodo});

        if (!response.ok) {
            throw Error(response.statusText);
        }
       
        const json = await response.json();
        return json;
    }
}

export default helpers;