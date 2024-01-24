import './App.css';
import React, { useState } from 'react';
import { createSlice, configureStore} from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';
const SESSION = 'Session';
const BREAK = 'Break';	
const ESTADOINICIAL = {
  tiempoSesion: 1500000,
  tiempoDescanso: 300000,
  cuentaAtras: 1500000,
  intervalId: '',
  tiempoActual: SESSION,
  status: false
};
const agregarCeroSiEsNecesario = valor => {
  if (valor < 10) {
    return "0" + valor;
  } else {
    return "" + valor;
  }
}
const milisegundosAMinutosYSegundos = (milisegundos) => {
  const minutos = parseInt(milisegundos / 1000 / 60);
  milisegundos -= minutos * 60 * 1000;
  const segundos = (milisegundos / 1000);
  return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(0))}`;
};





class Segundero extends React.Component {
  constructor(props) {
    super(props);
    this.state = ESTADOINICIAL;
    this.handleChange = this.handleChange.bind(this);
    this.handleClicK = this.handleClicK.bind(this);
    this.restart = this.restart.bind(this);
    this.aumentarSesion = this.aumentarSesion.bind(this);
    this.reducirSesion = this.reducirSesion.bind(this);
    this.aumentarDescanso = this.aumentarDescanso.bind(this);
    this.reducirDescanso = this.reducirDescanso.bind(this);
    this.conmutador = this.conmutador.bind(this);
    this.conmutadorStartStop = this.conmutadorStartStop.bind(this);
  }
  handleChange(event) {
    this.setState({
      cuentaAtras: event.target.value,
    })
  }
  conmutador() {
    this.setState((state) => ({
      tiempoActual: state.tiempoActual === SESSION
        ? BREAK
        : SESSION,
      cuentaAtras: state.tiempoActual === SESSION
      ? state.tiempoDescanso
      : state.tiempoSesion
    }), () => {
      this.handleClicK()
    })
  }

  handleClicK() {
    let intervalId = setInterval(() => {
      this.setState(state => ({
        cuentaAtras: state.cuentaAtras - 1000
      }), () => {
        if (this.state.cuentaAtras === 0) {
          this.beepSound.play();
        }
        if (this.state.cuentaAtras < 0) {
          if (this.state.intervalId) clearInterval(this.state.intervalId)
          this.conmutador()
        }
      })
    }, 1000)
    this.setState({
      intervalId
    })
  }  

  restart() {
    clearInterval(this.state.intervalId);
    this.setState(ESTADOINICIAL);
    this.beepSound.pause()
    this.beepSound.currentTime = 0
  }
  
  aumentarSesion() {
    if (!this.state.status && this.state.cuentaAtras < 3600000) {
    this.setState({
      tiempoSesion: this.state.tiempoSesion + 60000,
      cuentaAtras: this.state.tiempoActual === SESSION
      ? this.state.tiempoSesion + 60000
      : this.state.cuentaAtras,
    })}
  }
  reducirSesion() {
    if (!this.state.status && this.state.cuentaAtras > 60000) {
    this.setState({
      tiempoSesion: this.state.tiempoSesion - 60000,
      cuentaAtras: this.state.tiempoActual === SESSION
      ? this.state.tiempoSesion - 60000
      : this.state.cuentaAtras,
    })}
  }
  aumentarDescanso() {
    if (!this.state.status && this.state.cuentaAtras < 3600000 && this.state.tiempoDescanso < 3600000) {
    this.setState({
      tiempoDescanso: this.state.tiempoDescanso + 60000,
      cuentaAtras: this.state.tiempoActual === BREAK
      ? this.state.tiempoDescanso + 60000
      : this.state.cuentaAtras,
    })}
  }
  reducirDescanso() {
    if (!this.state.status && this.state.cuentaAtras >= 60000 && this.state.tiempoDescanso > 60000) {
    this.setState({
      tiempoDescanso: this.state.tiempoDescanso - 60000,
      cuentaAtras: this.state.tiempoActual === BREAK
      ? this.state.tiempoDescanso - 60000
      : this.state.cuentaAtras,
    })}
  }
  conmutadorStartStop() {
    if (!this.state.status) {
      this.handleClicK()
      this.setState({ status: true })
    } else {
      clearInterval(this.state.intervalId)
      this.setState({
        status: false,
        intervalId: ''
      })
    }
  }

  render() {


    const thelife01 = parseInt(milisegundosAMinutosYSegundos(this.state.tiempoSesion));
    const thelife02 = milisegundosAMinutosYSegundos(this.state.cuentaAtras);
    const thelifeminutos = parseInt(milisegundosAMinutosYSegundos(this.state.tiempoDescanso));

    
      return (
        <div className='bloque-cronometro'>
          <div className='botonera-arriba'>
            <div className='grupo-boton-izquierda'>
              <div className='titulo-tiempo'><h4 id="break-label">Break length</h4></div>
              <div className='botones-break'>
                <button className='boton-redondo' id="break-decrement" onClick={this.reducirDescanso}> - </button>
                <div className='aumento' id="break-length" >{thelifeminutos}</div>
                <button className='boton-redondo' id="break-increment" onClick={this.aumentarDescanso}> + </button>
              </div>
            </div>
            <div className='grupo-boton-derecha'>
              <div className='titulo-tiempo'><h4 id="session-label">Session length</h4></div>
              <div className='botones-break'>
                <button className='boton-redondo' id="session-increment" onClick={this.aumentarSesion}> + </button>
                <div className='aumento' id="session-length" >{thelife01}</div>
                <button className='boton-redondo' id="session-decrement" onClick={this.reducirSesion}> - </button>
              </div>
            </div>
          </div>
          <div className='cronometro'>
            <div className='contador'>
						  <h6 id="timer-label" >{this.state.tiempoActual}</h6>			
						  <h2 className="tiempoRestante" id="time-left" onChange={this.handleChange}>{thelife02}</h2>
			      </div>
          </div>
          <div className='botonera-abajo'>
            <button className='boton-redondo' id="start_stop" onClick={this.conmutadorStartStop} > <span>start <br /> /stop</span> </button>
            <button className='boton-redondo' id="reset" onClick={this.restart}> <span>restart</span> </button>
          </div>
          <audio
              id='beep'
              load='auto'
              ref={(audio) => {
                this.beepSound = audio
              }}
              src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
            ></audio>
        </div>
      )
  }
} 

function App() {
  return (
    <div>
      
        <Segundero />
      
    
  </div>);
}
export default App;