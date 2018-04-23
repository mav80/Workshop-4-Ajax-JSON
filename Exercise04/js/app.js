
 $(function(){

     console.log('DOM załadowany.');




     //exercise 3

     var bookList = $('#books');
     //console.log(books);

    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType : "json",
        success: function( json ) {
            //console.log(json);
            for(let book in json) {
                //console.log(book);
                //$(bookList).append('<li>' + json[book].title + '</li>').append('<div>div testowy</div>');
                //$(bookList).append($('<li>', {'id': json[book].id, text: json[book].title})).append($('<div>', {text:'opis książki o id ' + json[book].id, style: 'display: none'}));
                $(bookList).append($('<li>', {'class': 'bookTitle', 'id': json[book].id, text: json[book].title})).append($('<div>', {text:' ', }));
            }
            
        },
        error: function( xhr, status,
        errorThrown ) {alert("Wystąpił jakiś błąd!")},
        complete: function( xhr, status ){}
    });




    //exercise 4

    setTimeout(function(){                //used for delay to let the html be prepared by the code from exercise 4

        var bookTitles = $('.bookTitle');
        //console.log(bookTitles);

        for (var i = 0; i < bookTitles.length; i++) {
            bookTitles[i].addEventListener('click', function () {

                var allDivs = $('div');
                var divToUpdate = this.nextElementSibling;

                allDivs.text(' ');

                $.ajax({
                    url: "http://localhost:8282/books/"+this.id,
                    data: {},
                    type: "GET",
                    dataType : "json",
                    success: function( json ) {
                        divToUpdate.innerText = 'autor: ' + json.author + ', wydawca: ' + json.publisher + ', gatunek: ' + json.type + ', isbn: ' + json.isbn;
                        //$(divToUpdate).css('display', 'block');
                    },
                    error: function( xhr, status,
                    errorThrown ) {alert("Wystąpił jakiś błąd!")},
                    complete: function( xhr, status ){}
                });

            });
        }

    }, 500);





























 })












