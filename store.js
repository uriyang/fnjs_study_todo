import { Subject, BehaviorSubject } from 'rxjs';
import { each } from './lib/fp.js';
import { todo, STATE_INIT } from './todoReducer.js';

const stateStore = () => {

  let store$ = new Subject();
  let state$ = new Subject();
  let previousState;
  let reducers;
  // let listeners;

  function combineReducer() {
    // { addTodo : addTodo  }
    // { removeTodo : addTodo }
    // { editTodo : addTodo  }
  }

  function createStore(reducerss, stateInit) {
    reducers = reducerss;
    state$.next({currentState:stateInit}); 

    function dispatch(action) {
      store$.next(action);
    }

    function subscribe(fn) {
      return state$.subscribe(fn);
    }

    return {
      combineReducer,
      dispatch,
      subscribe
    };

  }


  // 리듀서로 값을 넘기면서 새로운 상태로 전이
  store$.subscribe((action) => {
    // console.log(action);
    // console.log(reducers);
    each(reducers, (reducer) => {
      let newState = reducer(previousState, action);
      previousState = newState;
      state$.next({ currentState: newState });

      // console.log(newState);
    });
    //let newState = reducer(previousState , action );
  });
  // 상태 전파
  state$.subscribe((state) => {
    console.log('currentState', state);
  });

  return {
    createStore
  };
};

export const store = stateStore().createStore(todo, STATE_INIT);