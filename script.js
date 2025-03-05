const userMessage = [
  ["hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["are you genius", "are you nerd", "are you intelligent"],
  ["i hate you", "i don't like you"],
  ["how are you", "how is life", "how are things", "how are you doing"],
  ["how is corona", "how is covid 19", "how is covid19 situation"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you", "who is your creator"],
  ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "ok", "okay", "nice", "welcome"],
  ["thanks", "thank you"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["corona", "covid19", "coronavirus"],
  ["you are funny"],
  ["i don't know"],
  ["boring"],
  ["i'm tired"]
];

const botReply = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  ["Okay", "Sure", "No problem"],
  ["Yes, I am!", "Absolutely!", "Indeed, I am!"],
  ["I'm sorry to hear that.", "That's unfortunate.", "I hope we can get along."],
  ["I'm doing well, thank you!", "Life is good, how about you?", "Everything's great, how are you?"],
  ["It's getting better. How about where you are?", "It's improving slowly.", "Stay safe!"],
  ["Not much, just chatting with you.", "Just hanging out.", "Thinking about the meaning of life."],
  ["I'm ageless.", "I don't age.", "Age is just a number."],
  ["I'm a bot, here to chat with you.", "I'm an AI chatbot.", "I'm a virtual assistant."],
  ["I was created by Abhishek Singh.", "My creator is Abhishek Singh.", "Abhishek Singh made me."],
  ["I don't have a name.", "I'm nameless.", "You can call me whatever you like."],
  ["I love you too!", "That's sweet!", "Love you too!"],
  ["That's great to hear!", "Awesome!", "Glad you're happy!"],
  ["Why do you feel that way?", "I'm here to chat if you need.", "Let's talk about it."],
  ["Sure, what do you need help with?", "Once upon a time...", "Why did the chicken cross the road?"],
  ["Alright.", "Okay.", "Nice!"],
  ["You're welcome!", "No problem!", "Anytime!"],
  ["How about some pizza?", "Maybe a burger?", "Sushi sounds good!"],
  ["Hey!", "What's up?", "How can I help?"],
  ["Yes?", "What do you need?", "How can I assist?"],
  ["Stay safe and take care!", "Please follow the guidelines.", "Stay home and stay safe!"],
  ["Glad you think so!", "Thanks!", "I try my best!"],
  ["That's okay.", "No worries.", "Let's figure it out together."],
  ["Let's find something interesting to do.", "How about a game?", "Let's chat!"],
  ["You should rest.", "Take a break.", "Get some sleep."]
];

const alternative = [
  "I'm here to help.",
  "Can you ask something else?",
  "Let's talk about something else.",
  "I'm listening...",
  "Go on..."
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  if (input !== "") {
    output(input);
    inputField.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      sendMessage();
    }
  });
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText ? comparedText : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (triggerArray[x][y] === string) {
        let items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item ? item : containMessageCheck(string);
}

function containMessageCheck(string) {
  const expectedReply = [
    ["Goodbye!", "See you later!", "Take care!"],
    ["Good night!", "Sleep well!", "Sweet dreams!"],
    ["Good evening!", "Evening!", "Hope you had a good day!"],
    ["Good morning!", "Morning!", "Have a great day!"],
    ["Good afternoon!", "Afternoon!", "Hope you're having a good day!"]
  ];
  const expectedMessage = [
    ["bye", "goodbye", "see you", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["afternoon", "good afternoon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      let items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.classList.add("message", "bot");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);

  mainDiv.scrollTop = mainDiv.scrollHeight;
  voiceControl(product);
}