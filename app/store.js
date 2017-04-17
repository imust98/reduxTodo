define(['./reducers.js'], function (todoAppReducer) {
  return function createTodoStore() {
    return Redux.createStore((state, action) => {
      console.log(action);
      return todoAppReducer(state, action);
    });
  }

});
