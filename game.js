var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
    if(!started){
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});


$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
});


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log('sucess');

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{

        console.log('wrong');

        playSound('wrong');
        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart')

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    setTimeout(() => {    
    }, 100);

    userClickedPattern = [];

    level++; 
    $('#level-title').text('Level ' + level);

    var min = Math.ceil(0);
    var max = Math.floor(4);
    var randomNumber = Math.floor(Math.random() * (max-min)) + min;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);  

    $("#" +  randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);     
}

function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
         $('#' + currentColour).removeClass('pressed');
        }, 100);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}
