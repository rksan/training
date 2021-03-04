(function () {

    //HTML仕様上の文字参照(Character Reference)
    const CHAR_REF = [
        {
            name: 'SPACE',
            char: ' ',
            ref: '&nbsp;'
        },
        // ここからはあまり意味がない
        {
            name: 'LESS_THEN',
            char: '<',
            ref: '&lt;'
        },
        {
            name: 'GREATER_THEN',
            char: '>',
            ref: '&gt;'
        },
        {
            name: 'AND',
            char: '&',
            ref: '&amp;'
        },
        {
            name: 'QUOT',
            char: '"',
            ref: '&quot;'
        }
    ];

    //実際に UI 上に表示される String
    var QUESTION = localStorage.QUESTION || 'schoo WEB campus';

    //処理で使用する変数
    var types = [];
    var timer = null;
    var startTime = 0;

    function init() {
        document.querySelector('.container').innerHTML = '';

        types = QUESTION.split('').map(function (str) {
            var type = document.createElement('span');

            type.className = 'type';

            //文字が Character Reference か判定する
            var cr = CHAR_REF.find(function (cr) {
                if (cr.char === str) {
                    return cr;
                }
            });

            if (cr) {
                type.innerHTML = cr.ref;
            } else {
                type.textContent = str;
            }

            //Remember the original character as the 'data-original-text' attribute as it has been converted to html
            type.setAttribute('data-original-text', str);

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

    function inRange(str) {
        if (!str) {
            return false;
        } else if (1 < str.length) {
            return false;
        } else {
            var code = str.codePointAt(0);
            var min = ' '.codePointAt(0);
            var max = '~'.codePointAt(0);

            if (min <= code && code <= max) {
                return true;
            }
        }

        return false;
    }

    //@ref Document: keydown イベント | MDN (https://developer.mozilla.org/ja/docs/Web/API/Document/keydown_event)
    document.addEventListener('keydown', function (event) {

        //var keyCode = String(event.which || event.keyCode);
        //var code = event.code;
        var key = event.key;

        if (key === 'Enter') { //code = [Enter] | [NumberEnter]
            init();
        } else if (inRange(key) === true) {

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

    document.querySelector('.container').addEventListener('click', function (event) {
        var text = prompt('問題文を入力して下さい', QUESTION);

        if (text) {
            var src = text.split('').map(function (str) {
                if (inRange(str) === true) {
                    return str;
                }
            });

            if (src || src.length !== 0) {
                localStorage.QUESTION = QUESTION = src.join('');
                init();
            }
        }

    });

})();