function Request(url, metodo){
    let response = fetch(url, {
    method: metodo});
   
    let json = response.json();
    return json;
}