var triviaQuestions = [{
	question: "What movie did Thanos first appear in?",
	answerList: ["Thor", "Avengers", "Thor: The Dark World", "Captain America: Civil War"],
	answer: 1
},{
	question: "What was the Space Stone originally called?",
	answerList: ["The Tesseract", "The Portal Generator", "The Blue Source", "The Ultimate Weapon"],
	answer: 0
},{
	question: "Which ex-Avenger is now leading a fugutive team?",
	answerList: ["Falcon", "Tony Start", "Captain America", "Thanos"],
	answer: 2
},{
	question: "Which member of Iron Man's Civil War team went 'rogue'?",
	answerList: ["Scarlet Witch", "Vision", "Black Widow", "Black Panther"],
	answer: 2
},{
	question: "Is Spider-Man an official Avenger?",
	answerList: ["Yes", "No"],
	answer: 1
},{
	question: "Is Thor using his hammer in Infinity War?",
	answerList: ["Yes", "No"],
	answer: 1
},{
	question: "What is the name of Thannos's gang of sidekicks?",
	answerList: ["The Black Order", "The Dark Marks", "The Shadow Children", "The Killer Maw"],
	answer: 0
},{
	question: "How is Thanos combining the Infinity Stones?",
	answerList: ["Glove of Power", "Gauntlet of Power", "Infinity Glove", "Infinity Gauntlet"],
	answer: 3
},{
	question: "Who stole the Power Stone?",
	answerList: ["Drax the Destroyer", "Star-Lord", "Ronan the Accuser", "Rocket Raccoon"],
	answer: 1
},{
	question: "What is the name of Black Panther's home?",
	answerList: ["K'un Lun", "Kamar Taj", "Wakanda", "Khokarsa"],
	answer: 2
},{
	question: "What is the name of Captain America's fugutive team?",
	answerList: ["Hidden Avengers", "Avengers Underground", "Secret Avengers", "Fugutive Avengers"],
	answer: 2
},{
	question: "Which two stones does Thanos have in the Infinity War trailer?",
	answerList: ["Space, Power", "Space, Time", "Soul, Time", "Mind, Soul"],
	answer: 0
},{
	question: "How did Thor lose his eye?",
	answerList: ["Fighting Loki", "Fighting Thanos", "Fighting Hulk", "Fighting Hela"],
	answer: 3
},{
	question: "Name this booze-loving warrior woman?",
	answerList: ["Lady Sif", "Hela", "Jessica Jones", "Valkyrie"],
	answer: 3
},{
	question: "Who turned out to be Peter Quill's father?",
	answerList: ["Ego The Living Planet", "Mongo The Living Planet", "Chaos The Living Planet", "Chaos The Living Planet"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "Nope, that's not it.",
    endTime: "Gotta Be Quicker Than That!",
	finished: "Alright! Let's see what you know!."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
