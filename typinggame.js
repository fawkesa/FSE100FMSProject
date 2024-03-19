//typinggame
const words = 'test one two three'.split(separator: ' ');
const wordsCount=words.length;

function randomWord(){
  const randomIndex=Math.cel(Math.random()*wordsCount);
  return words[randomIndex];
}

function formatWord(word){
  return '<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>';
}

function newGame(){
  document.getElementByID(elementId:'words').innerHTML='';
  for(let i=0;i<200;++i){
    document.getElementByID(elementID:'words').innerHTML+=formatWord(randomWord());
  }
}
