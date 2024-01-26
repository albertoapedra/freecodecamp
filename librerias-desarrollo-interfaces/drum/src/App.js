import './App.css';
import React from 'react';
const drumys = [
  { 
    keyCode: 81,
    value: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    id: 'Heater-1'
  },
  {
    keyCode: 87,
    value: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    id: 'Heater-2'
  },
  {  
    keyCode: 69,
    value: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    id: 'Heater-3'
  },
  { 
    keyCode: 65,
    value: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    id: 'Heater-4'
  },
  { 
    keyCode: 83,
    value: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    id: 'Heater-6'
  },
  { 
    keyCode: 68,
    value: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    id: 'Dsc-oh'
  },
  { 
    keyCode: 90,
    value: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    id: 'Kick-Hat'
  },
  { 
    keyCode: 88,
    value: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    id: 'Rp4-Kick'
  },
  { 
    keyCode: 67,
    value: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    id: 'Cev-H2'
  },
];

function IndividualDrum({valor, fuente, identificador, keyCode})   {
    function playSound() {
      const sound = document.getElementById(valor);
      sound.currentTime = 0;
      sound.play();
      document.getElementById("display").innerHTML = identificador;
    }
    document.addEventListener('keydown', (event) => {
      var charCode = event.keyCode;
      if (charCode === keyCode ) {
        playSound();
      }
    }, false);
    return (
      <div
        className="drum-pad"
        onClick={() =>playSound()}
        id={identificador}
      >
        <audio src={fuente} id={valor} class="clip" />
        {valor}
      </div >
    );
  }
function Drumgrupo() {
  const grupo = [];
  for (let i = 0; i < drumys.length; i++) {
  const elemento =
    <IndividualDrum
      valor={drumys[i].value}
      fuente={drumys[i].src}
      identificador={drumys[i].id}
      keyCode={drumys[i].keyCode}
    />
    grupo.push(elemento);
  }
  return grupo
}

export default function Drum() {
  return (
    <div id="drum-machine">
      <div class='drum'>
        <Drumgrupo /> 
      </div>
      <div className='datos'>
        <em>Ha sonado/sonó/está sonando:</em>
      </div>
      <div className='sonando' id="display">
      </div>
    </div>
  )
}



