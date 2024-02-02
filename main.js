let words = [
  ['thing', 'res'],
  ['sky', 'caelum'],
  ['tree', 'arbor'],
  ['water', 'aqua'],
  ['fire', 'ignis'],
  ['book', 'liber'],
  ['sun', 'sol'],
  ['moon', 'luna'],
  ['flower', 'flos'],
  ['time', 'tempus'],
  ['heart', 'cor'],
  ['friend', 'amicus'],
  ['road', 'via'],
  ['mountain', 'mons'],
  ['wind', 'ventus'],
  ['song', 'carmen'],
  ['love', 'amor'],
  ['knowledge', 'scientia'],
  ['city', 'urbs'],
  ['fish', 'piscis'],
  ['cloud', 'nubes'],
  ['earth', 'terra'],
  ['star', 'stella'],
  ['dream', 'somnium'],
  ['peace', 'pax'],
  ['journey', 'iter'],
  ['hope', 'spes'],
  ['silence', 'silentium'],
  ['strength', 'fortitudo'],
  ['joy', 'gaudium'],
  ['memory', 'memoria'],
  ['beauty', 'pulchritudo'],
  ['truth', 'veritas'],
  ['light', 'lux'],
  ['shadow', 'umbra'],
  ['forest', 'silva'],
  ['wisdom', 'sapientia'],
  ['harmony', 'harmonia'],
  ['starlight', 'sidus lux'],
  ['night', 'noctis'],
];

let usedwords;
let startTime = 0;
let timebox;
let mistakes = 0;
function setup() {
	let usedwords = JSON.parse(JSON.stringify(words));
	while (usedwords.length > 12) {
		usedwords.splice(Math.floor(Math.random() * usedwords.length), 1);
	}
	const gamebox = document.querySelector('#gamebox');
	const flattenedArray = usedwords.flat();
	for (let i = flattenedArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
  [flattenedArray[i], flattenedArray[j]] = [flattenedArray[j], flattenedArray[i]];
	}
	for (let i = 0; i < flattenedArray.length; i++) {
		gamebox.appendChild(genCard(flattenedArray[i]));
	}
	mistakes = 0;
	startTime = Date.now();
	timebox = document.querySelector('#timebox');
}


function showTime(){
	if (timebox) {
		timebox.innerText = Math.floor((Date.now()-startTime)/1000) + 's'
	}
	setTimeout(showTime,1000);
}


function genCard(name) {
	const card = document.createElement('div');
	card.innerText = name;
	card.className = 'card';
	let arrow = () => { handleCardClick(card, arrow) };
	card.addEventListener('click', arrow)
	return card;
}

let firstChoice = null;

function compare(word1, word2) {
	for (let pair of words) {
		if ((pair[0] === word1 && pair[1] === word2) || (pair[0] === word2 && pair[1] === word1)) {
			return true;
		}
	}
	return false;
}

function highlightWrong(c1,c2){
	c1.className = 'card wrong';
	c2.className = 'card wrong';
	setTimeout(()=>{
		c1.className = 'card';
		c2.className = 'card';
	},200)
}



completed = 0;
function handleCardClick(card, arrow) {
	if (firstChoice == null) {
		firstChoice = { c: card, a: arrow };
		card.className = 'card selected';
	} else {
		if (firstChoice.c === card) {
			firstChoice.c.className = 'card';
			firstChoice = null;
			return;
		}
		firstChoice.c.className = 'card';
		if (compare(firstChoice.c.innerText, card.innerText)) {
			card.removeEventListener('click', arrow);
			firstChoice.c.removeEventListener('click', firstChoice.a);
			card.className = 'card completed'
			firstChoice.c.className = 'card completed'
			firstChoice = null;
			completed++;
			if (completed >= 12) {
				alert(`
				completed
				your time is
				${(Date.now()-startTime)/1000}s
				with ${mistakes} mistakes`);
				document.querySelector('#gamebox').innerHTML = '';
				completed = 0;
				setup();
			}
		} else {
			highlightWrong(firstChoice.c,card);
			mistakes++;
			firstChoice = null;
		}
	}
}



window.onload = setup;
showTime();
alert('start');