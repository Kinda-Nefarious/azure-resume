$(document).ready(function(){
    $.getJSON("https://us-central1-cloud-res-398110.cloudfunctions.net/cloudresume-visitor-count", function(data){
        $("#visitor-count").text(data.count);
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 1000
        });
    }).fail(function(){
        console.log("An error has occurred while fetching the visitor count.");
    });
});