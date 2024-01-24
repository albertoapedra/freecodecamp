import './App.css';
import { useState } from 'react';
import { createSlice, configureStore} from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';

const initialState = {
  value: [0, 0, 0, 0],
}

const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByYo(amount))
  }, 1000)
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value[0] += 1
    },
    decrement: (state) => {
      state.value[1] -= 1
    },
    incrementByAmount: (state, action) => {
      state.value[2] += action.payload
    },
    incrementByYo: (state, action) => {
      state.value[3] += action.payload
    },
  },
})

const estoyo = counterSlice.reducer;
const store = configureStore({
  reducer: {
    counter: estoyo,
  },
})




const { increment, decrement, incrementByAmount, incrementByYo } = counterSlice.actions;




function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  )
}




function App() {
  return (
    <Provider className="App" store={store} >
        <Counter />
    </Provider>
  );
}

export default App;