import './App.css';
import './estilos.css';
import $ from 'jquery';

let citas = require('./citas.json');
   
function colorAleatorioOscuro() {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);
  const a = 0.5;
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}
   
function cargarCita() {
  var citaAleatoria = Math.floor(Math.random() * citas.length);   
  var citaActual = citas[citaAleatoria].quote;
  var autorActual = citas[citaAleatoria].author;
  document.getElementById("text").innerHTML = citaActual;
  document.getElementById("author").innerHTML = autorActual;
  var fondo = [colorAleatorioOscuro()];
  document.getElementById('quote-box').style.backgroundColor = fondo;
  document.getElementById('tweet-quote').setAttribute("href", "https://twitter.com/intent/tweet?&text=" + citaActual + ' ' + autorActual + "&hashtags=citas");
  document.getElementById('tumblr-quote').setAttribute("href", "https://www.tumblr.com/widgets/share/tool?posttype=quote&caption=" + citaActual + ' ' + autorActual + '&tags=citas' +
       '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
};

$(function () {  
  cargarCita();
  $('#new-quote').on('click', cargarCita);
});

function App() {
  return (
    <div id="quote-box">
      <div className="quote-author">
        <span id="author"></span>
      </div>
      <div className="quote-text">
        <span id="text"></span>
      </div>
      <div id="botones">
        <a className="redes" id="tweet-quote" title="Tweet this quote!" target="_blank" ><i className="fa fa-twitter"></i></a>
        <button id="new-quote" onClick={cargarCita} ><span className="signos">(+)</span></button>
        <a className="redes" id="tumblr-quote" title="Share in tumblr!" target="_blank" ><i className="fa fa-tumblr"></i></a>  
      </div>
    </div>
  );
}
     
export default App;
   
   