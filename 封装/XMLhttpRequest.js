var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log(xhr.responseText);
        }
    }
}
xhr.open("get", "url", false);
xhr.send(null);