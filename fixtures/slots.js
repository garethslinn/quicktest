function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

function start() {
    console.log('started');
    var cover = document.getElementById('cover');
    var screen = document.getElementById('screen');
    var spinButton = document.getElementById('spin');
    var ul = screen.getElementsByTagName('ul');
    var messageBoard = document.getElementById('messageBoard');
    this.score = 26;
    var scoreContainer = screen.getElementsByTagName('p')[0];
    var spins = ['10','15','20','25','30'];
    var prize = [[2,3,5],[3,5,10],[5,10,30],[5,25,50],[10,35,75],[10,50,100]];

    cover.style.display = 'none';

    spinButton.addEventListener('click',activateSpinSequence,false);
    activateSpinSequence();
    function spinButtonDisable() {
        spinButton.setAttribute('disabled','disabled')
        spinButton.style.background = '#c0c0c0';
    }
    function updateElement(id) {
        var el = id.lastChild;
        var count = 0;
        var value = Math.floor((Math.random()*100));
        var valueFeatureWin = Math.floor((Math.random()*40)+50);
        var result;
        switch (true)  {
            case (value <= 30):
                result = 0
                break;

            case (value >= 31 && value <= 55):
                result = 1
                break;

            case (value >= 56 && value <= 71):
                result = 2
                break;

            case (value >= 72 && value <= 89):
                result = 3
                break;

            case (value >= 89 && value <= 95):
                result = 4
                break;

            default:
                result = 5
                break;
        }
        var newLi = '<li item="'+result+'" class="item'+result+'">'+result+'<span style="display: none"></span></li>';
        id.removeChild(el);
        id.insertAdjacentHTML('afterbegin',newLi)
    }
    function activateSpinSequence() {
        updateScore(0);
        spinButtonDisable();

        for (var i=0; i<ul.length; i++) {
            spin(ul[i],spins[i]);
        }
    }
    function spin(reel,counter) {
        messageBoard.innerHTML = ''
        var reels = 3;
        var spinsReels = setInterval(function(){
            updateElement(reel);
            --counter;

            if (counter == 0) {
                clearInterval(spinsReels);
                if (reel.id == 'c4') { // when spins have completed

                    checkPrizes();
                }
            }
        },0);
    }
    function updateScore(win) {

        if (win >= 1) {
            var newLi = '<p>Win: '+win+'</p>';
            messageBoard.insertAdjacentHTML('beforeend',newLi)
            this.score = this.score+win;
        } else {
            this.score = (this.score-1);
        }
        scoreContainer.innerHTML = ''
        if (this.score <= 0) {
            this.score = 25;
        }
        scoreContainer.insertAdjacentHTML('afterbegin',this.score);
    }
    function checkReels(reels,rowOrderNo) {
        var results = [];
        //for (var j = 0; j <= 0; j++ ) {
        for (var i = 0; i < ul.length; i++) {
            results.push(parseInt(reels[i].children[rowOrderNo].getAttribute('item')));
        }
        //}

        return results;
    }
    function checkRows(row) {
        var prize = [[2,3,5],[3,5,10],[5,10,30],[7,25,50],[10,35,75],[20,50,100]];
        switch (true)  {
            case (row[0] == row[1] && row[0] == row[2] && row[0] == row[3] && row[0] == row[4]):
                result = prize[row[0]][2]
                break;

            case (row[0] == row[1] && row[0] == row[2] && row[0] == row[3]):
                result = prize[row[0]][1]
                break;

            case (row[0] == row[1] && row[0] == row[2]):
                result = prize[row[0]][0]
                break;

            //case (row[0] == row[1]):
            //result = 1
            //break;

            default:
                result = 0
                break;
        }
        return result;
    }

    function checkPrizes() {
        var win,row,prize;
        var reels = screen.getElementsByTagName('ul');

        for (var i = 0; i < 4; i++) {
            row = checkReels(reels,i);
            prize = checkRows(row);

            if (prize >= 1) {
                updateScore(prize);
            }
        }
        spinButton.removeAttribute('disabled')
        spinButton.style.background = 'red';
    }
}




