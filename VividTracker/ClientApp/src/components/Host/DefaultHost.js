export async function CreateHost(method,url,data) {
    const host = 'https://localhost:7091' + url;
   
    const options = {
        method
    };

    if (data !== undefined) {
        options.headers = {
            'Content-Type':'application/json'
        }
        options.body = JSON.stringify(data);
    }

    const response = await fetch(host,options);
    const result = await response.json();

    return result;
}