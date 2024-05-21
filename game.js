
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;



$(document).keypress(function(){
    if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  $(document).touchstart(function(){
      if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    });


  //Used jQuery to detect when any of the buttons are clicked and trigger a handler function.
  $('.btn').click(function(){
    var userChosenColour = $(this).attr("id");

    //Add the contents of the variable userChosenColour created, to the end of this new userClickedPattern[]
    userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
      animatePress(userChosenColour);
    //  Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
      checkAnswer(userClickedPattern.length-1);
  });


  function checkAnswer(currentLevel)
  {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
      console.log("Success");

    //If the user got the most recent answer right in step above, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length)
        {
          //Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function (){nextSequence();}, 1000);
        }
    }  else
        {
          console.log("wrong");
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){$("body").removeClass("game-over");},200);
          $("#level-title").text( "Game Over, Press Any Key to Restart");
          startOver();
        }
  }


//function to randomly choose an element
function nextSequence()
{
  //resetting the userClickedPattern
   userClickedPattern = [];
  // level starts out with value 0.
  level++;

  //Increasing the levels everytime this function is called
    $("#level-title").text("Level " + level);

  //generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random()*4);

  //stroing a random chosen color by randomly picking a color from buttonColours[]
  var randomChosenColour = buttonColours[randomNumber];

  //Pushing a randomChosenColour into the empty array gamePattern[] to it's end.
  gamePattern.push(randomChosenColour);

  //concatenating the # symbol with the random color that is present inside randomChosenColour
  //and then storing the same inside the randomChosenColourId
  var randomChosenColourId = "#" + randomChosenColour;
  //Using JQuery to apply the fade-in and fade-out effect to the random color.
  $(randomChosenColourId).animate({opacity: 0}, 100, function(){
    $(this).animate({opacity: 1},100);
  });

  //passing the randomChosenColour as a 'case value' to play the desired sound.
  playSound(randomChosenColour);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

//function to play sounds
function playSound(name){
  switch (name) {
    case "red":
    var red = new Audio ('./sounds/red.mp3');
     return red.play();
    break;

    case "blue":
    var blue = new Audio ('./sounds/blue.mp3');
     return blue.play();
    break;

    case "yellow":
    var yellow = new Audio ('./sounds/yellow.mp3');
    return yellow.play();
    break;

    case "green":
    var green = new Audio ('./sounds/green.mp3');
    return green.play();
    break;

    default:
    var wrong = new Audio ('./sounds/wrong.mp3');
    return wrong.play();
    break;

  }
}

//Used jQuery to add the CSS pressed class to the button that gets clicked inside animatePress().
function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");
  setTimeout(function(){$('#'+currentColour).removeClass("pressed");},50);
}
