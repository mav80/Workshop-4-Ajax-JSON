
 $(function(){
     
    
    console.log('DOM załadowany.');

    var serverUrl = "http://localhost:8282/books/";



    //exercise 3

    var bookList = $('#books');
    //console.log(books);

    function buildBookList() {
        
                setTimeout(function(){
        
                    $('ul#books').empty();
        
                    var functionDataType = "json";
                    var functionUrl = serverUrl;
                    var functionType = "GET";
                    var functionSuccess = function(json) {
                        for(let book in json) {
                            $(bookList).append($('<span>', {'class': 'spanWholeBook', 'id': json[book].id}));
                            $('span#' + json[book].id).append($('<li>', {'style': 'display: inline', 'class': 'bookTitle', 'id': json[book].id, text: json[book].title})).
                            append($('<span>', {'class': 'deleteLink', 'id': json[book].id, 'style': 'color: red', text: ' usuń książkę '})).
                            append($('<span>', {'class': 'editLink', 'id': json[book].id, 'style': 'color: green', text: 'edytuj książkę'})).
                            append($('<div>', {'class': 'jsonText', text:' ', })).
                            append($('<div>',  {'class': 'separator'}));
                        }
                    }
                    var functionError = function() {
                        alert("Wystąpił jakiś błąd!");
                    };
                
                
                    doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError); //use function from exercise 7 instead of 3
        
                }, 300);
            }
        
        
        
            buildBookList();





    

    
    
    
    
    //exercise 4

    function ajaxOnMouseover() {
    
        setTimeout(function(){                //used for delay to let the html be prepared by the code from exercise 4
        
            var bookTitles = $('.spanWholeBook');
            //console.log(bookTitles);
            
            for (var i = 0; i < bookTitles.length; i++) {
                bookTitles[i].addEventListener('mouseenter', function () {
            
                    var allDivs = $('div');
                    //var divToUpdate = this.nextElementSibling.nextElementSibling;
                    var divToUpdate = $(this).find('.jsonText')[0];

                    allDivs.text(' ');

                    var functionDataType = "json";
                    var functionUrl = serverUrl+this.id;
                    var functionType = "GET";
                    var functionSuccess = function(json) {
                        divToUpdate.innerText = 'autor: ' + json.author + ', wydawca: ' + json.publisher + ', gatunek: ' + json.type + ', isbn: ' + json.isbn;
                    }
                    var functionError = function() {
                        alert("Wystąpił błąd podczas wywołania funkcji ajaxOnMouseover()!");
                    };


                    doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError); //call fuction from exercise 7
            
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


        var functionDataType = "json";
        var functionUrl = serverUrl+'add';
        var functionHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        var functionData = JSON.stringify(newBook);
        var functionType = "POST";
        var functionComplete = "";
        var functionSuccess = function() {
            /*alert('Nowa książka została poprawnie utworzona.'),*/ tempAlert($('ul#books'), "Książkę poprawnie utworzono.", 2000), buildBookList(), ajaxOnMouseover(), ajaxOnDelete(), ajaxOnEdit();;
        }
        var functionError = function() {
            alert("Wystąpił błąd podczas dodawania książki!");
        };

        doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError, functionData, functionHeaders) //call fuction from exercise 7
        
        e.preventDefault(); //without it an error is thrown while sending json
        //this.reset(); //resets the form to be empty again - not necessary if page reloads    
    
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

                    var functionDataType = "text";
                    var functionUrl = serverUrl+'remove/'+this.id;
                    var functionType = "DELETE";
                    var functionSuccess = function() {
                        /*alert('Książka została poprawnie usunięta.'),*/ $('span.spanWholeBook#'+elementId).fadeOut();
                    };
                    var functionError = function() {
                        alert('Wystąpił błąd podczas wywołania funkcji ajaxOnDelete()!');
                    };
                    // var functionData = JSON.stringify(newBook);
                    // var functionHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

                    doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError) //call fuction from exercise 7
                    e.preventDefault(); //without it an error is thrown while sending json

                }, { // here we make sure delete button can be clicked only once
                    once: true
                  });
            }

        }, 500);

    }

    ajaxOnDelete();


    





    //exercise 7

    function doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError, functionData, functionHeaders) {
        console.log("Wywołanie nowej funkcji, jej argumenty to:");
        console.log(arguments);
        // console.log("Wywołanie functionError:");
        // console.log(functionError);

        $.ajax({
            headers: functionHeaders,
            url: functionUrl,
            data: functionData,
            type: functionType,
            dataType : functionDataType,
            success: function( json ) { functionSuccess(json) },
            error: function( xhr, status,
            errorThrown ) { functionError(), console.log('errorThrown'), console.log(status, errorThrown) },
            complete: function( xhr, status ){ }
        });

    }






    //here we fiddle with the update button od each book - upon clicking book data is sent to edit form

    function ajaxOnEdit() {

        setTimeout(function(){
            
            var editLinks = $('.editLink');

            for (var i = 0; i < editLinks.length; i++) {
                editLinks[i].addEventListener('click', function (e) {

                    var functionDataType = "json";
                    var functionUrl = serverUrl+this.id;
                    var functionType = "GET";
                    var functionSuccess = function(json) {
                        $('html,body').animate({scrollTop:0});
                        //console.log("Wysłanie do edycji udane.");
                        //console.log(json);

                        $(editBookForm).find('input[type!=submit]').each(function (index, elem) {
                            elem.value = json[elem.name];
                        });
                    }
                    var functionError = function() {
                        alert("'Wystąpił błąd podczas wywołania funkcji ajaxOnEdit()!");
                    };

                    doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError); //call fuction from exercise 7

                });
            }

        }, 500);

    }

    ajaxOnEdit();






    // here we put an action upon clicking send button in the edit form


    var editBookForm = $('#editBookForm');
    //console.log(newBookForm);

    editBookForm.on('submit', function(e){
    
        var editBook = {};

        $(editBookForm).find('input[type!=submit]').each(function (index, elem) {
            editBook[elem.name] = elem.value
        });
        
        var functionDataType = "text";
        var functionUrl = serverUrl+editBook.id+'/update';
        var functionHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        var functionData = JSON.stringify(editBook);
        var functionType = "PUT";
        var functionComplete = "";
        var functionSuccess = function() {
            /*alert('Książka została poprawnie zmieniona.')*/  tempAlert($('ul#books'), "Książkę poprawnie zmieniono.", 2000), buildBookList(), ajaxOnMouseover(), ajaxOnDelete(), ajaxOnEdit();
        }
        var functionError = function() {
            alert("Wystąpił jakiś błąd!");
        };

        doAjaxJSON(functionDataType, functionUrl, functionType, functionSuccess, functionError, functionData, functionHeaders) //call fuction from exercise 7
        

        e.preventDefault(); //without it an error is thrown while sending json
        this.reset(); //resets the form to be empty again - not necessary if page reloads 
    
    }); 




    function tempAlert(element, message, duration) {

        //if 'element' argument length is 0 - show error message
        if(element.length > 0) {

            var tempElement = $('.tempAlert');

            //if mesage element created by this function already exists we just change the text it currently displays    
            if(tempElement.length < 1) {
                element.before($('<div class="tempAlert" style="display: none">' + message + '</div>'));
                $('.tempAlert').fadeIn();
            } else {
                tempElement.text(message);
            }

            setTimeout(function() {
                $('.tempAlert').fadeOut();
                setTimeout(function() {
                    $('.tempAlert').remove();
                }, 1000);
            }, duration);

        } else {
            console.log("Funkcja tempAlert: nie można znaleć wskazanego elementu.");
        }   

    }


}); //end of safety zone

