var timer;
var solution;
var score = 0;
var highScore = 0;
var init = false;

function newQuestion(max = 10) {

    var num1 = Math.ceil(Math.random() * max);
    var num2 = Math.ceil(Math.random() * max);
    var mathProblem = {
        'q': `${num1} \+ ${num2}`,
        'a': num1 + num2
    }

    $('.question').html(mathProblem.q);
    return solution = mathProblem.a;
}

function testAnswer(test) {

    if (solution == $('.answer').val()) {
        $('.answer').val('');
        timer++;
        score++;
        $('.timer').html(timer);
        $('.score').html(score);
        newQuestion();
    }
}

function startTimer() {
    timer = 10;
    $('.timer').html(timer);

    var interval = setInterval(function() {
        timer--;
        $('.timer').html(timer);
        if (timer == 0) {
            clearInterval(interval);
            setTimeout(function() {
                gameEnd();
                swal({
                        title: "Game Over!",
                        icon: "error",
                        buttons: ['Quit Game ', 'Play Again!']
                    })
                    .then((confirmed) => {
                        if (confirmed) {
                            resetGame();
                        } else {
                            $('body').append('<p class="button-wrap"><button class="reset" onClick="resetGame()">New Game</button></p>');
                        }
                    });
            }, 250);
        }

    }, 1000);
}

function startGame() {
    if (!init) {
        init = true;
        newQuestion();
        startTimer();
    }
}

function resetGame() {
    init = false;
    if ($('.reset').length) {
        $('.reset').detach();
    }
    startGame();
    $('.answer').focus();
}

function gameEnd() {
    if (score > highScore) {
        highScore = score;
        score = 0;
        $('.high-score').html(highScore);
        $('.score').html('-');
    } else {
        score = 0;
        $('.score').html('-');
    }
}

$().ready(function() {
    $('.answer').on('click', startGame);
    $('.answer').on('keyup', testAnswer);
});