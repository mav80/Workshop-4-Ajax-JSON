
 $(function(){
    
         console.log('DOM załadowany.');
    
    
    
    
         //exercise 3
    
         var bookList = $('#books');
         //console.log(books);

         function buildBookList() {

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
                        $(bookList).append($('<li>', {'class': 'bookTitle', 'id': json[book].id, text: json[book].title})).append($('<span>', {'class': 'deleteLink', 'id': json[book].id, 'style': 'color: red', text: 'usuń książkę'})).append($('<div>', {text:' ', }));
                    }
                    
                },
                error: function( xhr, status,
                errorThrown ) {alert("Wystąpił jakiś błąd!")},
                complete: function( xhr, status ){}
            });
         }

         buildBookList();
    

    
    
    
    
        //exercise 4
    
        setTimeout(function(){                //used for delay to let the html be prepared by the code from exercise 4
    
            var bookTitles = $('.bookTitle');
            //console.log(bookTitles);
    
            for (var i = 0; i < bookTitles.length; i++) {
                bookTitles[i].addEventListener('mouseover', function () {
    
                    var allDivs = $('div');
                    var divToUpdate = this.nextElementSibling.nextElementSibling;
    
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
    
    
    
    
    
    
        //exercise 5
    
        var newBookForm = $('#newBook');
        console.log(newBookForm);
    
        newBookForm.on('submit', function(e){
    
            var newBook = {};
    
            $(newBookForm).find('input[type!=submit]').each(function (index, elem) {
                newBook[elem.name] = elem.value
            });
    
            console.log('Zawartość nowej książki to: ');
            console.log(newBook);
    
            $.ajax({
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                url: "http://localhost:8282/books/add",
                data: JSON.stringify(newBook),
                type: "POST",
                dataType : "json",
                success: function( json ) {alert('Nowa książka została poprawnie utworzona.'), location.reload()}, //here we reload the page after book created successfuly
                error: function( xhr, status,
                errorThrown ) {alert('Wystąpił błąd, nie utworzono książki.')},
                complete: function( xhr, status ){} 
            });
    
            e.preventDefault(); //without it an error is thrown while sensing json
            //this.reset(); //resets the form to be empty again - not necessary since page reloads    
    
        }); 







        //exercise 6

        setTimeout(function(){

            var deleteLinks = $('.deleteLink');
            console.log(deleteLinks);


            for (var i = 0; i < deleteLinks.length; i++) {
                deleteLinks[i].addEventListener('click', function () {

                    console.log(this.id);

                    $.ajax({
                        url: "http://localhost:8282/books/remove/"+this.id,
                        type: "DELETE",
                        success: function( json ) {alert('Książka została usunięta.'), location.reload()}, //here we reload the page after book created successfuly
                        error: function( xhr, status,
                        errorThrown ) {alert('Wystąpił błąd, nie skasowano książki.')},
                        complete: function( xhr, status ){} 
                    });

                });
            }

        }, 500);
    

    
     }); //end of safety zone

