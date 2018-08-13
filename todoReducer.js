import { ADD_TODO } from './actions/actions.js';

export const STATE_INIT = []; 

// 로직 분리
export const todo = {

  addTask( state = [] , action) {
    switch (action.type) {
      case ADD_TODO:
        return [...state , action.payload];
      default:
        return state;
    }
  },
  // editTask() {

  // },
  // deleteTask() {

  // },
};
