// This part holds most of the logic flow and functions for the app
$(document).ready(function(){
  "use strict";
  var selected = 0; //Tracks if a selection has been made on the current page, binary
  var selections = [0]; //Array containing user choices
  var quiz = $('.content'); //Quiz div object

  
  // Display initial question
  displayNext();


  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }

    choose();
    // If no user selection, progress is stopped
    if ((selected==0)&&(questions[(findrightquestion(selections))].bullet == undefined)
    &&(!(isend(findrightquestion(selections))))) { //Checks if slide is end, helps enable no slection and not termnination slides
      $('#warning').text('Please make a selection before moving on.');
      
    } else {
      if((selected==0)&&(questions[(findrightquestion(selections))].bullet !== undefined)){selections.push(0)};
      selected=0;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    selections.pop();
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }

    selections = [0,0];
    displayNext();
    $('#start').hide();
  });
  
  // Creates and returns the div that contains the questions 
  // the answer selections
  function createQuestionElement(indexofquestion) {
    var qElement = $('<div>', {
      id: 'question'
    });
        /*var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
        */
    
    var question = $('<p>').append(questions[indexofquestion].question);
    qElement.append(question);
    
    var radioButtons = createRadios(indexofquestion);
    qElement.append(radioButtons);
  // Displays the warning message
  var warningText = $('<p id="warning">');
  qElement.append(warningText);
  
  return qElement;

  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(indexofquestion) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[indexofquestion].choices.length; i++) {
      item = $('<li>');
      if (questions[indexofquestion].bullet == undefined)
      {input = '<input type="radio" name="answer" value=' + i + ' />';} else {input = '&#9656;   ';}
      input += questions[indexofquestion].choices[i]; 
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() { 

    if (!(isNaN(parseInt($('input[name="answer"]:checked').val()))))
      {selections.push(parseInt($('input[name="answer"]:checked').val()));
      selected=1;}
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      var nextQuestion = createQuestionElement(findrightquestion(selections));
      quiz.append(nextQuestion).fadeIn();
      // Controls display of 'prev' button
        if(selections.length > 1){
          $('#prev').show();
          $('#start').hide();
          $('#next').show();
        } else if(selections.length == 1){
          
          $('#prev').hide();
          $('#next').show();
          $('#start').hide();
        }

       if(isend(findrightquestion(selections)))
        {$('#next').hide();
        $('#prev').show();
        $('#start').show();}
    });
  }
});