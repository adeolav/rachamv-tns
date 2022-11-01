// my namespace object
const myPortfolio = {};


// make function that displays the images with specific class
myPortfolio.filterProjects = function(className){

    // capture the lis that have the class name
    let itemsToShow = $(`.projectContainer li.${className}`);

    // loop through them and add class to show each one
    for (let i = 0; i < itemsToShow.length; i++) {
        $(itemsToShow[i]).addClass('show');
    }

    // add class of active to the  button clicked
    $(`.seeProjects button.${className}`).addClass('active');

}

// make function that sends the message to formspree
myPortfolio.sendMessage = function(){
    $.ajax({
        url: `https://formspree.io/mwkqnojw`,
        method: 'POST',
        data: {
            email: $('#email').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            subject: $('#subject').val(), 
            message: $('#message').val(),
        },
        dataType: 'json'
    }).then(function(){

        // show an alert
        swal({
            title: 'Thank you!',
            text: 'Your response was submitted.',
            button: 'Ok',
        })

        // clear the form
        document.getElementById("contactForm").reset();
    });
}

// make initializing function
myPortfolio.init = function(){

    // call function with the all class by default
    myPortfolio.filterProjects('all');
    
    // on click of each button
    $('.seeProjects button').on('click', function(){

        // remove class before running function
        $('.projectContainer li').removeClass('show');

        // remove class of active to all buttons before running function
        $(`.seeProjects button`).removeClass('active');

        // capture the button clicked
        let clickedButtonClass = $(this).attr('class');

        // call function to filter through the images with specific class
        myPortfolio.filterProjects(clickedButtonClass);

    })

    // on submit of form, redirect
    $('.contactForm').on('submit', function(e){
        // prevent auto refresh
        e.preventDefault();

        // call function that sends the message
        myPortfolio.sendMessage();


    })

    // on click of button, do the transition
    $('.navButton').on('click', function(){
        $(this).toggleClass('open');
        $('.mainNav .navLinks').toggleClass('show');
    })
}

// document ready
$(function(){

    // call init function
    myPortfolio.init();

});