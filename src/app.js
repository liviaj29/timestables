import { Nanny,html } from 'nanny-state';

const randomNumber = n => Math.ceil(Math.random()*n)

function sum(){
  const x = randomNumber(10)
  const y = randomNumber(10)
  return {question: `${x} x ${y} = `, answer: x*y}
}

const View = state => html`
<h1>Times Tables</h1>
${state.playing ? html`
<h2>SCORE: ${state.score}/10</h2>
<div id="question">${state.question} ${state.userAnswer} ${state.result} </div>
<form autocomplete="off" onsubmit = ${answer}>
  <input type='text' name = 'name' id = 'answer'>
</form>`
: html`
${state.message}
<button class="button-1" onclick=${startGame}> ${state.count === 10? "Play Again": "Start!"}</button>
`}`

const startGame = event => {
  Update({...sum(),playing: true, score: 0, count: 1})
  document.getElementById('answer').focus()
}

const State = {
  playing: false,
  message: html`<h2>Can You Get 10/10?</h2>`,
  View
}

const answer = event => {
  event.preventDefault()
  Update(checkAnswer(Number(event.target.name.value)))
  setTimeout(()=>Update(newQuestion), 700)
  event.target.answer.value = ''
}


const newQuestion = state => state.count === 10
? {
    playing: false,
    result: '',
    userAnswer: '',
    message: html`<h2>Game Over!</h2> 
      <h3>You got ${state.score}/10 correct</h3>`
} 
: {
    ...sum(),
    userAnswer: '',
    result: '',
    count: state.count + 1
  }


const checkAnswer = answer => state =>
  ({
    userAnswer: answer,
    result: answer === state.answer ? '✅': '❌',
    score: answer === state.answer ? state.score + 1: state.score,
  })


const Update = Nanny(State)