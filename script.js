const message = new SpeechSynthesisUtterance();
let textarea = document.querySelector('#text');
let speakButton = document.querySelector('#speak');
let stopButton = document.querySelector('#stop');
let voiceBar = document.querySelectorAll('span');
let voices = [];
let radioVoices = document.querySelector('.radio-voices')

let radioVal

stopButton.disabled = true


function setAnimation (state) {
    voiceBar.forEach((bar, index) => {
        if (state === 'speaking') {
            bar.style.animation = 'audio-wave 1.5s infinite ease-in-out';
            bar.style.animationDelay = index * 0.2 + 's';
        } else {
            bar.style.animation = 'none';
            bar.style.animationDelay = 'none';
        }
    })
}


function getCurrentValue () {
    for(i = 0; i < radioVal.length; i++) { 
        if(radioVal[i].checked) {
          return radioVal[i].value
        }
    } 
}

function readText () {
    console.log(getCurrentValue())
    message.voice = voices.find(voice => voice.name === getCurrentValue())
    if (textarea.value === '') {
        alert('Please type something');
    } else {
        message.text = textarea.value;
        speechSynthesis.cancel()   
        speechSynthesis.speak(message);
    }
}

function stopRead () {
    speechSynthesis.cancel()
    stopButton.disabled = true
    speakButton.disabled = false
}

message.onstart = function () {
    setAnimation('speaking');
    speakButton.disabled = true
    stopButton.disabled = false
}

message.onend = function () {
    setAnimation('stop');
    speakButton.disabled = false
    stopButton.disabled = true
}

function setVoices () {
    let voiceArr = speechSynthesis.getVoices();
    voices = voiceArr
    radioVoices.innerHTML = voiceArr.map(voice => {
        return `
            <input type="radio" id="${voice.name}" name="voice" value="${voice.name}" checked>
            <label for="${voice.name}">${voice.name}</label>
        `
    }).join('')
    radioVal = document.getElementsByName('voice')
}

setVoices()

speakButton.addEventListener('click', readText);
stopButton.addEventListener('click', stopRead)
speechSynthesis.addEventListener('voiceschanged', setVoices);