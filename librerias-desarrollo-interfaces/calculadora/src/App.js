import './App.css';
import { createSlice, configureStore} from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';

const Createcla =  ({valor, identificador, hazesto}) => ( 
  <div className="tecla-redonda" id={identificador} onClick={hazesto} >
    {valor}
  </div >
);

const Createcladonumerico =  ({ceroFunc, unoFunc, dosFunc, tresFunc, cuatroFunc, cincoFunc, seisFunc, sieteFunc, ochoFunc, nueveFunc, decimalFunc, borraFunc}) => ( 
  <div className='izquierda'>
   <Createcla valor={7} identificador={'seven'} hazesto={sieteFunc} />
   <Createcla valor={8} identificador={'eight'} hazesto={ochoFunc} />
   <Createcla valor={9} identificador={'nine'} hazesto={nueveFunc} />
   <Createcla valor={4} identificador={'four'} hazesto={cuatroFunc} />
   <Createcla valor={5} identificador={'five'} hazesto={cincoFunc} />
   <Createcla valor={6} identificador={'six'} hazesto={seisFunc} />
   <Createcla valor={1} identificador={'one'} hazesto={unoFunc} />
   <Createcla valor={2} identificador={'two'} hazesto={dosFunc} />
   <Createcla valor={3} identificador={'three'} hazesto={tresFunc} /> 
   <Createcla valor={0} identificador={'zero'} hazesto={ceroFunc} />
   <Createcla valor={'.'} identificador={'decimal'} hazesto={decimalFunc} />
   <Createcla valor={'AC'} identificador={'clear'} hazesto={borraFunc} />
  </div>
);

const Createcladooperaciones = ({sumaFunc, restaFunc, multiFunc, diviFunc}) => ( 
  <div className='izquierda'>
   <Createcla valor={'+'} identificador={'add'} hazesto={sumaFunc} />
   <Createcla valor={'-'} identificador={'subtract'} hazesto={restaFunc} />
   <Createcla valor={'*'} identificador={'multiply'} hazesto={multiFunc} />
   <Createcla valor={'/'} identificador={'divide'} hazesto={diviFunc} />
  </div>
);

function sumar([a , b]){
  return a + b;
}
function restar([a , b]){
  return a - b; 
}
function multiplicar([a , b]){
  return a * b; 
}
function dividir([a , b]){
  var divisionprueba = a / b;
  var divisiontest = divisionprueba.toString();
  var regex = /^(\d{1,7})(\.\d{1,2}){0,1}$/;
  if (divisiontest.match(regex) === null) {
    divisionprueba = Number.parseFloat(divisionprueba).toFixed(4);
  } else {
    divisionprueba = divisionprueba;
  }
  return divisionprueba; 
}

const funcionesSlice = createSlice({
  name: 'calculadora',
  initialState: [[0], [0]],
    // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    ceroFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = 0;
        } else {
          state[0] = 0;
          state[1].push(state[0]);          
        }
      } else if (state[0].toString()[state[0].toString().length - 1] === '.') {
        state[0] = state[0].toString() + 0;
        state[1][state[1].length - 1] = state[0];
      } else if (Number(state[0]) === 0) {
        state[0] = 0;
        state[1][0] = 0;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '0');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    },
    unoFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
            state[1][state[1].length -1 ] = -1;
        } else {
          state[0] = 1;
          state[1].push(state[0]);          
          }
        } else if (state[0] === '0.0') {
          state[0] = 0.01;
          state[1][state[1].length - 1] = 0.01;
        } else if (state[0] === '0.') {
          state[0] = 0.1;
          state[1][state[1].length - 1] = 0.1;
        } else if (Number(state[0]) === 0) {
          state[0] = 1;
          state[1][state[1].length - 1] = 1;
        } else {
          state[1][state[1].length - 1] = parseFloat(state[0] + '1');
          state[0] = state[1][state[1].length - 1];
        } 
        return state ;
    },
    dosFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -2;
        } else {
        state[0] = 2;
        state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.02;
        state[1][state[1].length - 1] = 0.02;
      } else if (state[0] === '0.') {
        state[0] = 0.2;
        state[1][state[1].length - 1] = 0.2;
      } else if (Number(state[0]) === 0) {
        state[0] = 2;
        state[1][state[1].length - 1] = 2;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '2');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
      
    },
    tresFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -3;
        } else {
          state[0] = 3;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.03;
        state[1][state[1].length - 1] = 0.03;
      } else if (state[0] === '0.') {
        state[0] = 0.3;
        state[1][state[1].length - 1] = 0.3;
      } else if (Number(state[0]) === 0) {
        state[0] = 3;
        state[1][state[1].length - 1] = 3;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '3');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    }, 
    cuatroFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -4;
        } else {
          state[0] = 4;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.04;
        state[1][state[1].length - 1] = 0.04;
      } else if (state[0] === '0.') {
        state[0] = 0.4;
        state[1][state[1].length - 1] = 0.4;
      } else if (Number(state[0]) === 0) {
        state[0] = 4;
        state[1][state[1].length - 1] = 4;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '4');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    },
    cincoFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -5;
        } else {
          state[0] = 5;
          state[1].push(state[0]);          
      }
      } else if (state[0] === '0.0') {
        state[0] = 0.05;
        state[1][state[1].length - 1] = 0.05;
      } else if (state[0] === '0.') {
        state[0] = 0.5;
        state[1][state[1].length - 1] = 0.5;
      } else if (Number(state[0]) === 0) {
        state[0] = 5;
        state[1][state[1].length - 1] = 5;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '5');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    },  
    seisFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -6;
        } else {
          state[0] = 6;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.06;
        state[1][state[1].length - 1] = 0.06;
      } else if (state[0] === '0.') {
        state[0] = 0.6;
        state[1][state[1].length - 1] = 0.6;
      } else if (Number(state[0]) === 0) {
        state[0] = 6;
        state[1][state[1].length - 1] = 6;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '6');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    }, 
    sieteFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -7;
        } else {
          state[0] = 7;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.07;
        state[1][state[1].length - 1] = 0.07;
      } else if (state[0] === '0.') {
        state[0] = 0.7;
        state[1][state[1].length - 1] = 0.7;
      } else if (Number(state[0]) === 0) {
        state[0] = 7;
        state[1][state[1].length - 1] = 7;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '7');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    }, 
    ochoFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -8;
        } else {
          state[0] = 8;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.08;
        state[1][state[1].length - 1] = 0.08;
      } else if (state[0] === '0.') {
        state[0] = 0.8;
        state[1][state[1].length - 1] = 0.8;
      } else if (Number(state[0]) === 0) {
        state[0] = 8;
        state[1][state[1].length - 1] = 8;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '8');
        state[0] = state[1][state[1].length - 1];
      } 
      console.log('hooola' + ' ' + state[1]);
      return state ;
    },
    nueveFunc: (state) => {
      if (isNaN(state[0])) {
        if (state[0] === '-' & state[1][state[1].length -1 ] === 0) {
          state[1][state[1].length -1 ] = -9;
        } else {
          state[0] = 9;
          state[1].push(state[0]);          
        }
      } else if (state[0] === '0.0') {
        state[0] = 0.09;
        state[1][state[1].length - 1] = 0.09;
      } else if (state[0] === '0.') {
        state[0] = 0.9;
        state[1][state[1].length - 1] = 0.9;
      } else if (Number(state[0]) === 0) {
        state[0] = 9;
        state[1][state[1].length - 1] = 9;
      } else {
        state[1][state[1].length - 1] = parseFloat(state[0] + '9');
        state[0] = state[1][state[1].length - 1];
      } 
      return state ;
    },
    decimalFunc: (state) => {
      if (typeof state[0] === 'object') {
        state[0] = '0.';
        state[1][state[1].length - 1] = state[0];
      } 
      if (Number.isInteger(state[0]) === false) {
        state[0] = state[0];
      } else {
        if (typeof state[0] === 'number') {
          state[0] = state[0] + '.';
          state[1].pop();
          state[1].push(state[0]);
        }
      }
      return state
    },
    borraFunc: (state) => {
      state = [[0], [0]];
      return state 
    },
    sumaFunc: (state) => {
      if(Number(state[0]) === 0 & state[1][0] === 0) {
        state[1].push('+');
        state[1].shift();
        state[0] = '+';
      } else if (typeof state[1][0] === 'string') {
        state[0] = Number(state[1][0]);
        state[1][state[1].length - 1] = state[0];
        state[1].push('+');
        state[0] = '+';
      } else {
        if (state[1][state[1].length - 1] === '*' ||
        state[1][state[1].length - 1] === '/' ||
        state[1][state[1].length - 1] === '+' ||
        state[1][state[1].length - 1] === '-' ||
        state[1][state[1].length - 1] === '*-' ||
        state[1][state[1].length - 1] === '/-' ||
        state[1][state[1].length - 1] === '+-' ||
        state[1][state[1].length - 1] === '--')
        {
          state[1].pop();
        }  
        state[1].push('+');
        state[0] = '+';
      }
      return state;
    },
    restaFunc: (state) => {
      if(Number(state[0]) === 0 & state[1][0] === 0) {
        state[1].push('-');
        state[1].shift();
        state[0] = '-';
      } else {
        if (state[1][state[1].length - 1] === '*-' ||
        state[1][state[1].length - 1] === '/-' ||
        state[1][state[1].length - 1] === '+-' ||
        state[1][state[1].length - 1] === '--'  ) {
          state[1].pop();
        } 
        if (state[0] === '*') {
          state[0] = '*-';
          state[1].pop();
          state[1].push(state[0]);
        } else if (state[0] === '/') {
          state[0] = '/-';
          state[1].pop();
          state[1].push(state[0]);
        } else if (state[0] === '+') {
          state[0] = '+-';
          state[1].pop();
          state[1].push(state[0]);
        } else if (state[0] === '-') {
          state[0] = '--';
          state[1].pop();
          state[1].push(state[0]);
        } else {
          state[1].push('-');
          state[0] = '-';
        }
      }
      return state;
    },
    multiFunc: (state) => {
      if(Number(state[0]) === 0 & state[1][0] === 0) {
        state[1].push('*');
        state[1].shift();
        state[0] = '*';
      } else {
        if (state[1][state[1].length - 1] === '*' ||
        state[1][state[1].length - 1] === '/' ||
        state[1][state[1].length - 1] === '+' ||
        state[1][state[1].length - 1] === '-' ||
        state[1][state[1].length - 1] === '*-' ||
        state[1][state[1].length - 1] === '/-' ||
        state[1][state[1].length - 1] === '+-' ||
        state[1][state[1].length - 1] === '--') {
          state[1].pop();
      }  
      state[1].push('*');
      state[0] = '*';
      }
      return state;
    },
    diviFunc: (state) => {
      if(Number(state[0]) === 0 & state[1][0] === 0) {
        state[1].push('/');
        state[1].shift();
        state[0] = '/';
      } else {
        if (state[1][state[1].length - 1] === '*' ||
        state[1][state[1].length - 1] === '/' ||
        state[1][state[1].length - 1] === '+' ||
        state[1][state[1].length - 1] === '-' ||
        state[1][state[1].length - 1] === '*-' ||
        state[1][state[1].length - 1] === '/-' ||
        state[1][state[1].length - 1] === '+-' ||
        state[1][state[1].length - 1] === '--' ){
          state[1].pop();
        }  
        state[1].push('/');
        state[0] = '/';
      }
      return state;
    },
    igualFunc: (state) => {
      function operaciones ([a, b, c]){
        let cosa;
        switch(b) {
          case '+':
            cosa = sumar([a, c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '-':
            cosa = restar([a, c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '*':
            cosa = multiplicar([a, c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '/':
            cosa = dividir([a, c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '+-':
            cosa = sumar([a, -c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '*-':
            cosa = multiplicar([a, -c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '/-':
            cosa = dividir([a, -c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          case '--':
            cosa = restar([a, c]);
            state[1].splice(0, 3, cosa);
          return cosa;
          default:
            return cosa;
        } 
      }

      if (state[1][0] === '+' || state[1][0] === '*' || state[1][0] === '/') {
        state[1].shift();
      } else if (state[1][0] === '-') {
        state[1].shift();
        state[1][0] = -state[1][0];
      }

      for (let j = state[1].length; state[1].length > 2; j--) {
        operaciones(state[1]);
        state[0] = [0]
      }
      Number(state[1][0])
      return state;     
    },
  }
 }
);

const funcionesSelector = (state) => state;


const {
  actions: { ceroFunc,
    unoFunc,
    dosFunc,
    tresFunc,
    cuatroFunc,
    cincoFunc,
    seisFunc,
    sieteFunc,
    ochoFunc,
    nueveFunc,
    decimalFunc,
    borraFunc,
    sumaFunc,
    restaFunc,
    multiFunc,
    diviFunc,
    igualFunc
  },
reducer: funcionReducer
} = funcionesSlice;

const store = configureStore({
  reducer: funcionReducer
});

const Tecladoglobal = () => {
  const resultado = useSelector(funcionesSelector);
  const dispatch = useDispatch();
  
  return (
    <div className="bloque-calculadora">
    <div id="pantalla">
    <div className='displaydiv' id='display01'>{resultado[0]}</div>
    <div className='displaydiv' id='display'>{resultado[1]}</div>
    {console.log(typeof(resultado[1]))}
    </div>
      <div className='botones-redondos' id="botones">
        <div className='numeros'>
          <div className='izquierda'>         
          <Createcladonumerico
            ceroFunc={() => dispatch(ceroFunc())}
            unoFunc={() => dispatch(unoFunc())}
            dosFunc={() => dispatch(dosFunc())}
            tresFunc={() => dispatch(tresFunc())}
            cuatroFunc={() => dispatch(cuatroFunc())}
            cincoFunc={() => dispatch(cincoFunc())}
            seisFunc={() => dispatch(seisFunc())}
            sieteFunc={() => dispatch(sieteFunc())}
            ochoFunc={() => dispatch(ochoFunc())}
            nueveFunc={() => dispatch(nueveFunc())}
            decimalFunc={() => dispatch(decimalFunc())}
            borraFunc={() => dispatch(borraFunc())}
            />       
          </div>   
        </div>
        <div className='operaciones'>
        <Createcladooperaciones
          sumaFunc={() => dispatch(sumaFunc())}
          restaFunc={() => dispatch(restaFunc())}
          multiFunc={() => dispatch(multiFunc())}
          diviFunc={() => dispatch(diviFunc())}
          /> 
        </div>
        
      </div>
      <Createcla valor={'='} identificador={'equals'} hazesto={() => dispatch(igualFunc())} />
  </div>
  );
};




function App() {
  return (
    <Provider className="App" store={store} >
        <Tecladoglobal />
    </Provider>
  );
}

export default App;
