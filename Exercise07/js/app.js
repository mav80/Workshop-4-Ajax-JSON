
 $(function(){
     
    
    console.log('DOM załadowany.');

    var serverUrl = "http://localhost:8282/books/";



    //exercise 3

    var bookList = $('#books');
    //console.log(books);

    function buildBookList() {

        $('ul#books').empty();

        var functionUrl = serverUrl;
        var functionType = "GET";
        var functionSuccess = function(json) {
            for(let book in json) {
                $(bookList).append($('<span>', {'class': 'spanWholeBook', 'id': json[book].id}));
                $('span#' + json[book].id).append($('<li>', {'class': 'bookTitle', 'id': json[book].id, text: json[book].title})).append($('<span>', {'class': 'deleteLink', 'id': json[book].id, 'style': 'color: red', text: 'usuń książkę'})).append($('<div>', {'class': 'jsonText', text:' ', })).append($('<div>',  {'class': 'separator'}));
            }
        }
        var functionError = function() {
            alert("Wystąpił jakiś błąd!");
        };
    
    
        doAjaxJSON(functionUrl, functionType, functionSuccess, functionError); //use function from exercise 7 instead of 3

    }

    buildBookList();





    

    
    
    
    
    //exercise 4

    function ajaxOnMouseover() {

    
    
        setTimeout(function(){                //used for delay to let the html be prepared by the code from exercise 4
        
            var bookTitles = $('.bookTitle');
            //console.log(bookTitles);
            
            for (var i = 0; i < bookTitles.length; i++) {
                bookTitles[i].addEventListener('mouseover', function () {
            
                    var allDivs = $('div');
                    //var divToUpdate = this.nextElementSibling.nextElementSibling;
                    var divToUpdate = $(this).siblings('.jsonText')[0];

                    allDivs.text(' ');

                    var functionUrl = serverUrl+this.id;
                    var functionType = "GET";
                    var functionSuccess = function(json) {
                        divToUpdate.innerText = 'autor: ' + json.author + ', wydawca: ' + json.publisher + ', gatunek: ' + json.type + ', isbn: ' + json.isbn;
                    }
                    var functionError = function() {
                        alert("Wystąpił jakiś błąd!");
                    };


                    doAjaxJSON(functionUrl, functionType, functionSuccess, functionError); //call fuction from exercise 7
            
                });
            }
        
        }, 500);

    }

    ajaxOnMouseover();
    
    
    
    
    
    
    //exercise 5

    var newBookForm = $('#newBook');
    //console.log(newBookForm);

    newBookForm.on('submit', function(e){
    
        var newBook = {};

        $(newBookForm).find('input[type!=submit]').each(function (index, elem) {
            newBook[elem.name] = elem.value
        });
        
        //console.log('Zawartość nowej książki to: ');
        //console.log(newBook);



        var functionUrl = serverUrl+'add';
        var functionHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        var functionData = JSON.stringify(newBook);
        var functionType = "POST";
        var functionComplete = "";
        var functionSuccess = function() {
            alert('Nowa książka została poprawnie utworzona.'), buildBookList(), ajaxOnMouseover(), ajaxOnDelete();
        }
        var functionError = function() {
            alert("Wystąpił jakiś błąd!");
        };

        doAjaxJSON(functionUrl, functionType, functionSuccess, functionError, functionData, functionHeaders) //call fuction from exercise 7
        
        e.preventDefault(); //without it an error is thrown while sending json
        //this.reset(); //resets the form to be empty again - not necessary since page reloads    
    
    }); 







    //exercise 6

    function ajaxOnDelete() {

        setTimeout(function(){

            var deleteLinks = $('.deleteLink');
            //console.log(deleteLinks);


            for (var i = 0; i < deleteLinks.length; i++) {
                deleteLinks[i].addEventListener('click', function (e) {

                    //console.log(this.id);
                    var elementId = this.id;

                    var functionUrl = serverUrl+'remove/'+this.id;
                    var functionType = "DELETE";
                    var functionSuccess = function() {
                        alert('Książka została usunięta.'), $('span.spanWholeBook#'+elementId).remove();
                    };
                    var functionError = function() {
                        alert('Książka została usunięta (b).'),  $('span.spanWholeBook#'+elementId).remove();
                    };
                    // var functionData = JSON.stringify(newBook);
                    // var functionHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

                    doAjaxJSON(functionUrl, functionType, functionSuccess, functionError) //call fuction from exercise 7
                    e.preventDefault(); //without it an error is thrown while sending json

                });
            }

        }, 500);

    }

    ajaxOnDelete();


    





    //exercise 7

    function doAjaxJSON(functionUrl, functionType, functionSuccess, functionError, functionData, functionHeaders) {
        console.log("Wywołanie nowej funkcji, jej argumenty to:");
        console.log(arguments);
        // console.log("Wywołanie functionError:");
        // console.log(functionError);

        $.ajax({
            headers: functionHeaders,
            url: functionUrl,
            data: functionData,
            type: functionType,
            dataType : "json",
            success: function( json ) { functionSuccess(json) },
            error: function( xhr, status,
            errorThrown ) { functionError(); },
            complete: function( xhr, status ){ }
        });

    }



}); //end of safety zone

