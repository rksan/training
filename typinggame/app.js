var QUESTION = 'schoo WEB campus';

var types = QUESTION.split('').map(function (str) {
    var type = document.createElement('span');
    type.className = 'type';
    type.textContent = str;
    document.querySelector('.container').appendChild(type);
    return type;
});

document.addEventListener('keydown', function (event) {
    var keyCode = event.keyCode;

    if (keyCode === 13) { //enter key
        return;
    }

    var key = '';
    if (keyCode === 32) { //cpace key
        key = ' ';
    }

    if (keyCode >= 65 && keyCode <= 90) {
        key = String.fromCharCode(keyCode);
        if (event.shiftKey) {
            key = key.toUpperCase();
        } else {
            key = key.toLowerCase();
        }
    }

    if (key) {
        var next = types[0];
        if (next.textContent === key) {
            next.classList.add('ok');
            types.shift();
            if (types.length === 0) {
                alert('finish');
            }
        } else {
            next.classList.add('ng');
        }
    }

    console.log(key);
});