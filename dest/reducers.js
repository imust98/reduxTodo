define(['./actions.js'], function (actions) {
  let ADD_TODO = actions.ADD_TODO,
    TOGGLE_TODO = actions.TOGGLE_TODO,
    SET_VISIBILITY_FILTER = actions.SET_VISIBILITY_FILTER,
    VisibilityFilters = actions.VisibilityFilters;

  const {SHOW_ALL} = VisibilityFilters;

  function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter;
      default:
        return state
    }
  }

  function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        });
      default:
        return state
    }
  }

  const todoApp = Redux.combineReducers({
    visibilityFilter,
    todos,
    cc:[1,2,3]
  });

  return todoApp
});