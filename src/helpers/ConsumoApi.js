const helpers = {
    teste1: function(){
        console.log('teste');
    },
    MakeRequest: async function(url, metodo){
        const response = await fetch(url, {
        method: metodo});

        if (!response.ok) {
            throw Error(response.statusText);
        }
       
        const json = await response.json();
        return json;
    },
    teste3: function(param1, param2){

    }
}

export default helpers;