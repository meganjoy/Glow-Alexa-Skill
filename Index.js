'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

/***********
Data: Customize the data below as you please.
***********/

const SKILL_NAME = "Inner Glow";
const HELP_MESSAGE_BEFORE_START = "Answer five questions, and I will tell you which gorgeous lady of wrestling you most resemble. Are you ready to play?";
const HELP_MESSAGE_AFTER_START = "Please respond with yes or no and I'll give you the result at the very end.";
const HELP_REPROMPT = "You're already gorgeous, but your inner glow double will be revealed after you answer all the yes or no questions.";
const STOP_MESSAGE = "Find your inner glow next time.";
const CANCEL_MESSAGE = "See you next time gorgeous.";
const MISUNDERSTOOD_INSTRUCTIONS_ANSWER = "Please respond with either yes or no.";

const WELCOME_MESSAGE = "I'll give you five questions.  Give me yes or no answers to reveal your inner glow character. Are you ready to start?";
const INITIAL_QUESTION_INTROS = [
  "Great! Let's get ready to rumble!",
  "<say-as interpret-as='interjection'>Yay</say-as>! Here's the first question!",
  "Ok let's go. <say-as interpret-as='interjection'>Ahem</say-as>.",
  "<say-as interpret-as='interjection'>well well</say-as>."
];
const QUESTION_INTROS = [
  "Tubular.",
  "Okey Dokey",
  "Like totally!",
  "No duh.",
  "Fo sho.",
  "So bad.",
  "Stoked.",
  "I'm so sure.",
  "Totally radical.",
  "Righteous."
];
const UNDECISIVE_RESPONSES = [
  "<say-as interpret-as='interjection'>Honk</say-as>. I'll just choose for you.",
  "<say-as interpret-as='interjection'>Nanu Nanu</say-as>. I picked an answer for you.",
  "<say-as interpret-as='interjection'>Uh oh</say-as>... well nothing I can do about that.",
  "<say-as interpret-as='interjection'>Aha</say-as>. We will just move on then.",
  "<say-as interpret-as='interjection'>Aw man</say-as>. How about this question?",
];
const RESULT_MESSAGE = "Here comes the big reveal! You are "; // the name of the result is inserted here.
const PLAY_AGAIN_REQUEST = "That was it. Do you want to play again?";

const characterList = {
  tamee: {
    name: "tamee",
    display_name: "Tamee, Welfare Queen",
    audio_message: "You may be indulging a minstrel act, but you're good at it.",
    description: "You know when to show up for friends and family to show your support.  More importantly, you change things from the inside out.",
    img: {
      smallImageUrl: "https://vignette.wikia.nocookie.net/glow/images/2/2a/Tamme_Dawson.jpg/revision/latest?cb=20170710115925",
      largeImageUrl: "https://www.telegraph.co.uk/content/dam/on-demand/2017/07/04/GLOW_101_00972R_trans_NvBQzQNjv4Bq1N-0BbrGahnullJmqzE3f-PHi_e1tpOIk75CAYQiDp0.jpg?imwidth=1240"
    }
  },
  ruth: {
    name: "ruth",
    display_name: "Ruth, Zoya the Destroya",
    audio_message: "Always one to take the lead and appear strong, you ironically have a serious victim complex.",
    description: "Although you might not take hints or direction very well, you do have your limits.  You know when you're being taken advantage of, and you know your strengths.  Keep on playing to your strengths, Ruth.  And go bigger with your hair.",
    img: {
      smallImageUrl: "https://s1.r29static.com//bin/entry/e51/340x408,80/1808932/image.jpg",
      largeImageUrl: "https://static.mmzstatic.com/wp-content/uploads/2017/06/glow-saison-2.jpeg"
    }
  },
  carmen: {
    name: "carmen",
    display_name: "Carmen, Macchu Picchu",
    audio_message: "You take the time to teach people how to be strong, and you adore your family above all else.",
    description: "You might get a case of stage fright, but your talent and your smile outshine the rest.  You're not content to rest on your family's fame.  Instead, you'll find your own way in the world.",
    img: {
      smallImageUrl: "https://media1.popsugar-assets.com/files/thumbor/BaE38rbwZjtHijacZ8XDvunKvCw/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/09/20/819/n/1922283/49cf2705c50506ab_carmen/i/Carmen-Machu-Picchu-Wade.jpg",
      largeImageUrl: "https://media1.popsugar-assets.com/files/thumbor/_ZJTlOYnBELgTXRq5-6WmY4zsss/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2018/07/02/944/n/1922283/94ea8e46950780a4_machu/i/Britney-Young-Carmen-Machu-Picchu-Wade.jpg"
    }
  },
  debbie: {
    name: "debbie",
    display_name: "Debbie, Liberty Belle",
    audio_message: "You've got the crown, but you don't feel very crowned when life's circumstances spiral out of control.",
    description: "Beautiful, blonde, and brash.  But don't let looks deceive.  You've produced your own outcomes.  Congratulations.",
    img: {
      smallImageUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2017-06/29/17/asset/buzzfeed-prod-fastlane-03/sub-buzz-11888-1498771887-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",
      largeImageUrl: "https://media1.popsugar-assets.com/files/thumbor/Tknr2si0R48Fxpg8BjioGo2gHcU/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/08/10/062/n/1922283/ef3f9d11d488ba8b_GLOW_101_05631R/i/Debbie-AKA-Liberty-Belle-From-GLOW.jpg"
    }
  },
  sam: {
    name: "sam",
    display_name: "Sam, Director",
    audio_message: "You're clueless in parenting, self-care, and empathy.",
    description: "You are a terrible director, firing people because you can, yet you still know how to be good.  Even when you aren't most of the time.",
    img: {
      smallImageUrl: "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2017/06/glow_102_02251r-h_2017.jpg",
      largeImageUrl: "https://bloximages.chicago2.vip.townnews.com/journaltimes.com/content/tncms/assets/v3/editorial/1/f2/1f2b9c87-8eb2-5670-a061-2b67ec018edf/5949815b3f185.image.jpg?resize=1200%2C660"
    }
  }
};

const questions = [
  {
    question: "Do you often find that your own selfishness or pride rule your life?",
    points: {
      tamee: 2,
      ruth: 4,
      carmen: 0,
      debbie: 3,
      sam: 5
    }
  },
  {
    question: "Do you enjoy athletic accomplishments and working out?",
    points: {
      tamee: 3,
      ruth: 4,
      carmen: 5,
      debbie: 2,
      sam: 0
    }
  },
  {
    question: "Does it typically take you longer than thirty minutes to get ready in the morning?",
    points: {
      tamee: 4,
      ruth: 3,
      carmen: 2,
      debbie: 5,
      sam: 0
    }
  },
  {
    question: "Do you find yourself trying to solve problems that aren't necessarily your own?",
    points: {
      tamee: 3,
      ruth: 5,
      carmen: 4,
      debbie: 2,
      sam: 0
    }
  },
  {
    question: "Do you ever feel like you're betraying your true self by being fake?",
    points: {
      tamee: 5,
      ruth: 3,
      carmen: 2,
      debbie: 4,
      sam: 0
    }
  }
];

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

// Private methods (this is the actual code logic behind the app)

const _initializeApp = handler => {
  // Set the progress to -1 one in the beginning
  handler.attributes['questionProgress'] = -1;
  // Assign 0 points to each animal
  var initialPoints = {};
  Object.keys(characterList).forEach(animal => initialPoints[animal] = 0);
  handler.attributes['animalPoints'] = initialPoints;
};

const _nextQuestionOrResult = (handler, prependMessage = '') => {
  if(handler.attributes['questionProgress'] >= (questions.length - 1)){
    handler.handler.state = states.RESULTMODE;
    handler.emitWithState('ResultIntent', prependMessage);
  }else{
    handler.emitWithState('NextQuestionIntent', prependMessage);
  }
};

const _applyAnimalPoints = (handler, calculate) => {
  const currentPoints = handler.attributes['animalPoints'];
  const pointsToAdd = questions[handler.attributes['questionProgress']].points;

  handler.attributes['animalPoints'] = Object.keys(currentPoints).reduce((newPoints, animal) => {
    newPoints[animal] = calculate(currentPoints[animal], pointsToAdd[animal]);
    return newPoints;
  }, currentPoints);
};

const _randomQuestionIntro = handler => {
  if(handler.attributes['questionProgress'] == 0){
    // return random initial question intro if it's the first question:
    return _randomOfArray(INITIAL_QUESTION_INTROS);
  }else{
    // Assign all question intros to remainingQuestionIntros on the first execution:
    var remainingQuestionIntros = remainingQuestionIntros || QUESTION_INTROS;
    // randomQuestion will return 0 if the remainingQuestionIntros are empty:
    let randomQuestion = remainingQuestionIntros.splice(_randomIndexOfArray(remainingQuestionIntros), 1);
    // Remove random Question from rameining question intros and return the removed question. If the remainingQuestions are empty return the first question:
    return randomQuestion ? randomQuestion : QUESTION_INTROS[0];
  }
};

const _randomIndexOfArray = (array) => Math.floor(Math.random() * array.length);
const _randomOfArray = (array) => array[_randomIndexOfArray(array)];
const _adder = (a, b) => a + b;
const _subtracter = (a, b) => a - b;

// Handle user input and intents:

const states = {
  QUIZMODE: "_QUIZMODE",
  RESULTMODE: "_RESULTMODE"
}

const newSessionHandlers = {
  'NewSession': function(){
    _initializeApp(this);
    this.emit(':askWithCard', WELCOME_MESSAGE, SKILL_NAME, WELCOME_MESSAGE);
    //                         ^speechOutput,   ^cardTitle, ^cardContent,   ^imageObj
  },
  'YesIntent': function(){
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this);
  },
  'NoIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', HELP_MESSAGE_BEFORE_START, HELP_REPROMPT, SKILL_NAME);
  },
  'AMAZON.CancelIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', STOP_MESSAGE, SKILL_NAME, STOP_MESSAGE);
  },
  'Unhandled': function(){
    this.emit(':ask', MISUNDERSTOOD_INSTRUCTIONS_ANSWER);
  }
};


const quizModeHandlers = Alexa.CreateStateHandler(states.QUIZMODE, {
  'NextQuestionIntent': function(prependMessage = ''){
    // Increase the progress of asked questions by one:
    this.attributes['questionProgress']++;
    // Reference current question to read:
    var currentQuestion = questions[this.attributes['questionProgress']].question;

    this.emit(':askWithCard', `${prependMessage} ${_randomQuestionIntro(this)} ${currentQuestion}`, HELP_MESSAGE_AFTER_START, SKILL_NAME, currentQuestion);
    //                        ^speechOutput                                                         ^repromptSpeech           ^cardTitle  ^cardContent     ^imageObj
  },
  'YesIntent': function(){
    _applyAnimalPoints(this, _adder);
    // Ask next question or return results when answering the last question:
    _nextQuestionOrResult(this);
  },
  'NoIntent': function(){
    // User is responding to a given question
    _applyAnimalPoints(this, _subtracter);
    _nextQuestionOrResult(this);
  },
  'UndecisiveIntent': function(){
    // Randomly apply
    Math.round(Math.random()) ? _applyAnimalPoints(this, _adder) : _applyAnimalPoints(this, _subtracter);
    _nextQuestionOrResult(this, _randomOfArray(UNDECISIVE_RESPONSES));
  },
  'AMAZON.RepeatIntent': function(){
    var currentQuestion = questions[this.attributes['questionProgress']].question;

    this.emit(':askWithCard', currentQuestion, HELP_MESSAGE_AFTER_START, SKILL_NAME, currentQuestion);
    //                        ^speechOutput    ^repromptSpeech           ^cardTitle ^cardContent     ^imageObj
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', HELP_MESSAGE_AFTER_START, HELP_REPROMPT, SKILL_NAME);
  },
  'AMAZON.CancelIntent': function(){
    this.emit(':tellWithCard', CANCEL_MESSAGE, SKILL_NAME, CANCEL_MESSAGE);
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', STOP_MESSAGE, SKILL_NAME, STOP_MESSAGE);
  },
  'Unhandled': function(){
    this.emit(':ask', MISUNDERSTOOD_INSTRUCTIONS_ANSWER);
  }
});


const resultModeHandlers = Alexa.CreateStateHandler(states.RESULTMODE, {
  'ResultIntent': function(prependMessage = ''){
    // Determine the highest value:
    const animalPoints = this.attributes['animalPoints'];
    const result = Object.keys(animalPoints).reduce((o, i) => animalPoints[o] > animalPoints[i] ? o : i);
    const resultMessage = `${prependMessage} ${RESULT_MESSAGE} ${characterList[result].name}. ${characterList[result].audio_message}. ${PLAY_AGAIN_REQUEST}`;

    this.emit(':askWithCard', resultMessage, PLAY_AGAIN_REQUEST, characterList[result].display_name, characterList[result].description, characterList[result].img);
    //                        ^speechOutput  ^repromptSpeech     ^cardTitle                       ^cardContent                    ^imageObj
  },
  'YesIntent': function(){
    _initializeApp(this);
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this);
  },
  'NoIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', HELP_MESSAGE_AFTER_START, HELP_REPROMPT, SKILL_NAME);
  },
  'AMAZON.CancelIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', STOP_MESSAGE, SKILL_NAME, STOP_MESSAGE);
  },
  'Unhandled': function(){
    this.emit(':ask', MISUNDERSTOOD_INSTRUCTIONS_ANSWER);
  }
});



exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(newSessionHandlers, quizModeHandlers, resultModeHandlers);
  alexa.execute();
};
