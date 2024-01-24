import './App.css';
import React, { useState } from 'react';
import { createSlice, configureStore} from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';
const SESION = 'Session';
const DESCANSO = 'Break';
const ESTADOINICIAL = {
  tiempoSesion: 1500000,
  tiempoDescanso: 300000,
  cuentaAtras: 1500000,
  intervalId: '',
  tiempoActual: SESION,
  cuentaAtrasOn: false
};
const anteponerCero = (numero) => {
  if (numero < 10) {
    return "0" + numero;
  } else {
    return "" + numero;
  }
}
const milisegundosAFormato = (milisegundos) => {
  const minutos = parseInt(milisegundos / 1000 / 60);
  milisegundos = milisegundos - minutos * 60 * 1000;
  const segundos = (milisegundos / 1000);
  const resultadoFinal = anteponerCero(minutos) + ':' + anteponerCero(segundos.toFixed(0))
  return resultadoFinal;
};

class Cronometro extends React.Component {
  constructor(props) {
    super(props);
    this.state = ESTADOINICIAL;
    this.starStop = this.starStop.bind(this);
    this.restart = this.restart.bind(this);
    this.aumentarSesion = this.aumentarSesion.bind(this);
    this.reducirSesion = this.reducirSesion.bind(this);
    this.aumentarDescanso = this.aumentarDescanso.bind(this);
    this.reducirDescanso = this.reducirDescanso.bind(this);
    this.conmutadorSesion = this.conmutadorSesion.bind(this);
    this.conmutadorStartStop = this.conmutadorStartStop.bind(this);
  }

  conmutadorSesion() {
    this.setState((state) => ({
      tiempoActual: state.tiempoActual === SESION
        ? DESCANSO
        : SESION,
      cuentaAtras: state.tiempoActual === SESION
      ? state.tiempoDescanso
      : state.tiempoSesion
    }), () => {
      this.starStop()
    })
  }

  starStop() {
    let intervalId = setInterval(() => {
      this.setState(
        state => ({cuentaAtras: state.cuentaAtras - 1000})
      );
      if (this.state.cuentaAtras === 0) {
        document.getElementById("beep").play();
        if (this.state.intervalId) {
          clearInterval(this.state.intervalId)
          this.conmutadorSesion()
        }
      }
    }, 1000);

    this.setState({intervalId})
  }  

  restart() {
    clearInterval(this.state.intervalId);
    this.setState(ESTADOINICIAL);
    document.getElementById("beep").pause()
    document.getElementById("beep").currentTime = 0
  }
  
  aumentarSesion() {
    if (!this.state.cuentaAtrasOn && this.state.cuentaAtras < 3600000) {
    this.setState({
      tiempoSesion: this.state.tiempoSesion + 60000,
      cuentaAtras: this.state.tiempoActual === SESION
      ? this.state.tiempoSesion + 60000
      : this.state.cuentaAtras,
    })}
  }
  reducirSesion() {
    if (!this.state.cuentaAtrasOn && this.state.cuentaAtras > 60000) {
    this.setState({
      tiempoSesion: this.state.tiempoSesion - 60000,
      cuentaAtras: this.state.tiempoActual === SESION
      ? this.state.tiempoSesion - 60000
      : this.state.cuentaAtras,
    })}
  }
  aumentarDescanso() {
    if (!this.state.cuentaAtrasOn && this.state.cuentaAtras < 3600000 && this.state.tiempoDescanso < 3600000) {
    this.setState({
      tiempoDescanso: this.state.tiempoDescanso + 60000,
      cuentaAtras: this.state.tiempoActual === DESCANSO
      ? this.state.tiempoDescanso + 60000
      : this.state.cuentaAtras,
    })}
  }
  reducirDescanso() {
    if (!this.state.cuentaAtrasOn && this.state.cuentaAtras >= 1000 && this.state.tiempoDescanso > 60000) {
    this.setState({
      tiempoDescanso: this.state.tiempoDescanso - 60000,
      cuentaAtras: this.state.tiempoActual === DESCANSO
      ? this.state.tiempoDescanso - 60000
      : this.state.cuentaAtras,
    })}
  }
  conmutadorStartStop() {
    if (!this.state.cuentaAtrasOn) {
      this.starStop()
      this.setState({ cuentaAtrasOn: true })
    } else {
      clearInterval(this.state.intervalId)
      this.setState({
        cuentaAtrasOn: false,
        intervalId: ''
      })
    }
  }

  render() {
    const SESSIONDISPLAY = parseInt(milisegundosAFormato(this.state.tiempoSesion));
    const CUENTAATRASDISPLAY = milisegundosAFormato(this.state.cuentaAtras);
    const DESCANSODISPLAY = parseInt(milisegundosAFormato(this.state.tiempoDescanso));
      return (
        <div className='bloque-cronometro'>
          <div className='botonera-arriba'>
            <div className='grupo-boton-izquierda'>
            
              <div className='titulo-tiempo'><div className='aumento' id="break-length" >{DESCANSODISPLAY}</div><h4 id="break-label">Break length</h4></div>
              <div className='botones-break'>
                <button className='boton-redondo' id="break-decrement" onClick={this.reducirDescanso}> - </button>
                
                <button className='boton-redondo' id="break-increment" onClick={this.aumentarDescanso}> + </button>
              </div>
            </div>
            <div className='grupo-boton-derecha'>
              <div className='titulo-tiempo'><div className='aumento' id="session-length" >{SESSIONDISPLAY}</div><h4 id="session-label">Session length</h4></div>
              <div className='botones-break'>
                <button className='boton-redondo' id="session-increment" onClick={this.aumentarSesion}> + </button>
                
                <button className='boton-redondo' id="session-decrement" onClick={this.reducirSesion}> - </button>
              </div>
            </div>
          </div>
          <div className='cronometro'>
            <div className='contador'>
						  <h6 id="timer-label" >{this.state.tiempoActual}</h6>			
						  <h2 className="tiempoRestante" id="time-left">{CUENTAATRASDISPLAY}</h2>
			      </div>
          </div>
          <div className='botonera-abajo'>
            <button className='boton-redondo' id="start_stop" onClick={this.conmutadorStartStop} > <span>start <br /> /stop</span> </button>
            <button className='boton-redondo' id="reset" onClick={this.restart}> <span>restart</span> </button>
          </div>
          <audio
              id='beep'
              load='auto'
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
        </div>
      )
  }
} 

function App() {
  return (
    <div>
      
        <Cronometro />
      
    
  </div>);
}
export default App;