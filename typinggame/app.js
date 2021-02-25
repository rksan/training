var QUESTION = localStorage.QUESTION || 'schoo WEB campus';
var SPACE = '&nbsp;'; //add @rk

var types = [];
var timer = null;
var startTime = 0;

function init() {
    document.querySelector('.container').innerHTML = '';

    types = QUESTION.split('').map(function (str) {
        var type = document.createElement('span');
        type.className = 'type';

        //add start @rk
        if (str === ' ') {
            type.innerHTML = SPACE;
        } else {
            type.textContent = str;
        }

        //Remember the original character as the 'data-original-text' attribute as it has been converted to html
        type.setAttribute('data-original-text', str);
        //add end @rk

        document.querySelector('.container').appendChild(type);

        return type;
    });

    timerEnd();

    document.querySelector('.timer').textContent = '0.000';
};

init();

function timerStart() {
    startTime = new Date().getTime();
    timer = setInterval(function () {
        var time = (new Date().getTime() - startTime) / 1000;
        document.querySelector('.timer').textContent = time.toFixed(3);
    }, 10);
}

function timerEnd() {
    clearInterval(timer);
    timer = null;
}

document.addEventListener('keydown', function (event) {
    var keyCode = event.keyCode;

    if (keyCode === 13) { //enter key
        init();
        return;
    }

    var key = '';
    if (keyCode === 32) { //space key
        key = ' ';
    } else if (keyCode >= 65 && keyCode <= 90) { //change @rk
        key = String.fromCharCode(keyCode);
        if (event.shiftKey) {
            key = key.toUpperCase();
        } else {
            key = key.toLowerCase();
        }
    }

    if (key) {

        if (timer === null) {
            timerStart();
        }

        var next = types[0];
        var originalText = next.getAttribute('data-original-text'); //add @rk

        if (originalText === key) { //change @rk
            next.classList.add('ok');
            types.shift();
            if (types.length === 0) {
                timerEnd();
            }
        } else {
            next.classList.add('ng');
        }
    }

    console.log(key);
});

document.querySelector('.container').addEventListener('click', function(event){
    var text = prompt('問題文を入力して下さい', QUESTION);
    if(text){
        QUESTION = text;
        localStorage.QUESTION = text;
        init();
    }
});