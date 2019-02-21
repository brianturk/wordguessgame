var stLength = sport_terms.length;
var gameover = false;
var guessesLeft = 10;
var firsttime = true;

//randomly pick a sports term to use
var stNum = Math.floor((Math.random() * stLength) + 1);

//Get sports term
var st = "";
st = sport_terms[stNum][1].trim().toLowerCase();

//Display game type
var gameType = "";
gameType = sport_terms[stNum][0].trim().toLowerCase();
document.getElementById('gametype').innerHTML += "&nbsp" + gameType;

//Build dashes
var blankHangman = "";
var guessedLetters = "";
var blanks = 0;
for (var x = 0; x < st.length; x++) {
	if (st.substring(x, x + 1) === " ") {
		blankHangman = blankHangman + " ";
		blanks++;
	} else {
		blankHangman = blankHangman + "-";
	}
};
document.getElementById('puzzle').innerHTML = blankHangman;
document.getElementById('guessesleft').innerHTML = guessesLeft;

document.onkeyup = function (event) {
	var key = event.key || event.keyCode;
	key = key.toLowerCase();
	var match = false;

	if (firsttime) {
		firsttime = false;

	}


	if ((key.search(/[^A-Za-z]/g)) && (!(gameover)) && (key.length === 1)) {    //only take letters as input and it is a new letter

		if (guessedLetters.search(key) === -1) {   //not a previously guessed letter
			guessedLetters += key;
			//Check to see if letter is in the word
			for (x = 0; x < st.length; x++) {
				if (st.substring(x, x + 1) === key) {   //Is match
					if (x === 0) {
						blankHangman = key + blankHangman.substring(1, blankHangman.length);
					} else {
						blankHangman = blankHangman.substring(0, x) + key + blankHangman.substring(x + 1, blankHangman.length);
					}
					match = true;
				}
			}

			document.getElementById('puzzle').innerHTML = blankHangman;

			if (match) { //check for word done
				if (blankHangman === st) {
					gameover = true;
					document.getElementById('result').innerHTML = "You got it!";
					document.getElementById('bodybg').style.background = "rgb(110, 230, 110)";
				} else {
					document.getElementById('result').innerHTML = "Good job! Keep going...";
				}
			} else { //add letter to wrong letter list and decrement guesses
				document.getElementById('wrong').innerHTML = key + "&nbsp" + document.getElementById('wrong').innerHTML;
				guessesLeft--;
				document.getElementById('guessesleft').innerHTML = guessesLeft;
				if (guessesLeft === 0) {
					gameover = true;
					document.getElementById('result').innerHTML = "You lost :(";
					document.getElementById('bodybg').style.background = "rgb(247, 60, 60)";
					document.getElementById('word').innerHTML = "Word: " + st;
				} else {
					document.getElementById('result').innerHTML = "Sorry, that's wrong. Keep going...";
				}
			}

			if (gameover) {
				document.getElementById('definition').innerHTML = "Definition: " + sport_terms[stNum][2];
			}
		} else {
			document.getElementById('result').innerHTML = "Letter guessed already. Keep going...";
		}


	}
};

console.log(st);
//textContent
