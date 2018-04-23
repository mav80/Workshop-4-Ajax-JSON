
 $(function(){

     console.log('DOM załadowany.');

     var bookList = $('#books');
     console.log(books);

    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType : "json",
        success: function( json ) {
            console.log(json);
            for(let book in json) {
                console.log(book);
                //$(bookList).append('<li>' + json[book].title + '</li>').append('<div>div testowy</div>');
                //$(bookList).append($('<li>', {'id': json[book].id, text: json[book].title})).append($('<div>', {text:'opis książki o id ' + json[book].id, style: 'display: none'}));
                $(bookList).append($('<li>', {'id': json[book].id, text: json[book].title})).append($('<div>', {text:' ', }));
            }
            
        },
        error: function( xhr, status,
        errorThrown ) {alert("Wystąpił jakiś błąd!")},
        complete: function( xhr, status ){}
    });



























 })












