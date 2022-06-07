const btnPlay = document.querySelector('#b__btnPlay');


let playerOne, playerTwo;

btnPlay.addEventListener('click', ()=>{
    const inputNames =document.querySelectorAll('.b__inputName');

    if(inputNames[0].value!='' && inputNames[1].value!=''){
        playerOne = inputNames[0].value;
        playerTwo = inputNames[1].value;
        btnPlay.closest('.a').remove();

        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `<div class="center-content players">
            <div class="players--left"><span>${playerOne} [X]</span></div>
            <div class="players--right"><span>${playerTwo} [O]</span></div>
        </div>`);

        document.querySelector('.blockTurn__playerName').innerHTML = playerOne;


    }else{
        alert('Completo toda las casillas');
    }
})


let turn = 1;
let thereisawinner = false;

const boxes = document.querySelectorAll('.board__boxes');

function verifyTurn(index){
    if(document.querySelectorAll('.board__boxes > span')[index].innerHTML == '' && thereisawinner == false) {
        if(turn%2!=0){
            document.querySelectorAll('.board__boxes > span')[index].innerHTML = 'X';
            document.querySelector('.blockTurn__playerName').innerHTML = playerTwo;
            playerOneCheckedBoxes += index;
            console.log(verifyWinner(playerOneCheckedBoxes));
            if (thereisawinner == true) {
                document.querySelector('.center-content').firstElementChild.remove();
                document.querySelector('.center-content').insertAdjacentHTML('beforeend', `<div class="blockWinner">
                <span>The winner's <span class="blockWinner__playerName">${playerOne}</span></span>
            </div>`)
            }
        }else{
            document.querySelectorAll('.board__boxes > span')[index].innerHTML = 'O';
            document.querySelector('.blockTurn__playerName').innerHTML = playerOne;
            playerTwoCheckedBoxes += index;
            console.log(verifyWinner(playerTwoCheckedBoxes));
            if (thereisawinner == true) {
                document.querySelector('.center-content').firstElementChild.remove();
                document.querySelector('.center-content').insertAdjacentHTML('beforeend', `<div class="blockWinner">
                <span>The winner's <span class="blockWinner__playerName">${playerTwo}</span></span>
            </div>`)
            }
        }
        if (turn == 9 && thereisawinner == false) {
            document.querySelector('.center-content').firstElementChild.remove();
            document.querySelector('.center-content').insertAdjacentHTML('beforeend', `<div class="blockTie">
                <span>Tie</span>
            </div>`)
        }

        turn++;
    }
}

boxes[0].addEventListener('click', ()=> verifyTurn(0));
boxes[1].addEventListener('click', ()=> verifyTurn(1));
boxes[2].addEventListener('click', ()=> verifyTurn(2));
boxes[3].addEventListener('click', ()=> verifyTurn(3));
boxes[4].addEventListener('click', ()=> verifyTurn(4));
boxes[5].addEventListener('click', ()=> verifyTurn(5));
boxes[6].addEventListener('click', ()=> verifyTurn(6));
boxes[7].addEventListener('click', ()=> verifyTurn(7));
boxes[8].addEventListener('click', ()=> verifyTurn(8));

let playerOneCheckedBoxes = playerTwoCheckedBoxes = '';

function verifyWinner(playerBoxesIndex) {
    const indexWins = ['012','345','678','036','147','258','048','246'];
    if(playerBoxesIndex.length >= 3) { 
        for(i=0;i<indexWins.length;i++) {
            let indexs;
            for(x=0;x<indexWins[i].length;x++) {
                if(playerBoxesIndex.indexOf(indexWins[i][x]) == -1) {
                    indexs = '';
                    break;
                }else {
                    indexs = indexWins[i];
                }
            }
            if(indexs!='') {              
                for(i=0; i<indexs.length; i++) {
                    document.querySelectorAll('.board__boxes > span')[indexs[i]].style.color = '#ff4242';
                }
                thereisawinner = true;

                return indexs;
            }
        }
    }
}