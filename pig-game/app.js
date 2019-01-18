/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// 両者のスコア
var scores = [0, 0]
// 現在ののスコア
var roundScore = 0;
// 現在のプレイヤー
var activePlayer = 0;
// サイコロ画像
var diceImg = document.querySelector('.dice')
diceImg.style.display = 'none'


// サイコロを投げる関数
function throwDice() {
  var dice = Math.floor(Math.random() * 6) + 1
  // サイコロの画像を変化
  diceImg.style.display = 'block'
  var srcVal = `${'dice-' + dice + '.png'}`
  diceImg.setAttribute('src', srcVal)

  // サイコロの値を返す
  return dice
}

// プレイヤー交代する関数
function cahngePlayer () {
  // 現在の値を初期化
  roundScore = 0;

  // currentの値を初期化
  document.querySelector(`${'#current-' + activePlayer}`).textContent = 0
  // active表示削除
  document.querySelector(`${'.player-' + activePlayer + '-panel' }`).classList.remove('active')
  // サイコロ非表示
  diceImg.style.display = 'none'

  // player交代
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  // active表示追加
  document.querySelector(`${'.player-' + activePlayer + '-panel' }`).classList.add('active')
}

//  現在のプレイヤーのスコアをセット
function setActivePlayerScore(activePlayer) {
  // サイコロの値を足す
  var nowVal = throwDice()
  if(nowVal !== 1 ) {
    roundScore += nowVal;
  } else {
    cahngePlayer()
  }
  // 現在のプレイヤー
  var activePlayerScore = document.querySelector(`${'#current-' + activePlayer}`)

  activePlayerScore.textContent = roundScore
}

// btn-rollを押すとサイコロふる
var btnRoll = document.querySelector('.btn-roll')
btnRoll.addEventListener('click', () => {
  setActivePlayerScore(activePlayer);
})

// 値を保存する関数
function holdVal (activePlayer, roundScore) {
  // 現在のプレイヤーの合計値
  var totalPlayerScore = document.querySelector(`${'#score-' + activePlayer}`)
  var totalPlayerScoreVal = parseInt( totalPlayerScore.textContent ) + roundScore

  // 画面の値を更新
  totalPlayerScore.textContent =  totalPlayerScoreVal

  // scoreを更新
  scores[activePlayer] = totalPlayerScoreVal
  if ( scores[activePlayer] > 100) {
    alert(`${activePlayer}+ が勝ちました！！！！`)
    init()
  }

  // プレイヤー交代
  cahngePlayer()
}

// holdボタン
var btnHold = document.querySelector('.btn-hold')
btnHold.addEventListener('click', () => {
  holdVal (activePlayer, roundScore)
})

// 初期化
function init() {
  // 両者のスコア
  scores = [0, 0]
  // 現在ののスコア
  roundScore = 0;
  document.querySelectorAll('.player-current-score, .player-score').forEach((el) => {
    el.textContent = 0
  })
  cahngePlayer()
}

var btnNew = document.querySelector('.btn-new')
btnNew.addEventListener('click', () => {
  init()
})
