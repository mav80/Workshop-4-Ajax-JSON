
 $(function(){

     console.log('DOM załadowany.');

    $.ajax({
        url: "http://date.jsontest.com",
        data: {},
        type: "GET",
        dataType : "json",
        success: function( json ) {$('#date').text(json.time + ", " + json.date), console.log(json)},
        error: function( xhr, status,
        errorThrown ) {alert("Wystąpił jakiś błąd!")},
        complete: function( xhr, status ){}
    });

    $.ajax({
        url: "https://swapi.co/api/people/4/",
        data: {},
        type: "GET",
        dataType : "json",
        success: function( json ) {$('#person').text(json.name + " a jej dokładne dane to: " + JSON.stringify(json)), console.log(json)},
        error: function( xhr, status,
        errorThrown ) {alert("Wystąpił jakiś błąd!")},
        complete: function( xhr, status ){}
    });























 })












