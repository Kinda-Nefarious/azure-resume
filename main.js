window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});


const localApi = 'http://localhost:7071/api/GetResumeCounter';
const functionApi = 'https://getresumecounterrufaro.azurewebsites.net/api/GetResumeCounter?code=gRaOMg4-SeUCbrmq2-JeiUdxf1ngNmCb7H6WWPU80DH1AzFu1saXzg=='; 

const getVisitCount = () => {
    let count = 30;
    fetch(functionApi)
    .then(response => {
        return response.json()
    })
    .then(response => {
        console.log("Website called function API.");
        count = response.count;
        document.getElementById('counter').innerText = count;
    }).catch(function(error) {
        console.log(error);
      });
    return count;
}