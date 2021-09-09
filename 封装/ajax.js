function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHttp');
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Accept', "application/json");
        xhr.onreadystatechange = function (args) {
            if(xhr.readyState !== 4) return;
            if (xhr.code === 200 || xhr.code === 304) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send();
    })
}