define([
  './actions.js',
  './regular-redux/connect.js',
  'regular!./todomvc.html'
], function (actions, connect, ftl) {
  const comp = Regular.extend({
    name: 'TodoMVC',
    template: ftl,
    config: function (data) {
      Object.assign(data, {
        todos: [],
        text: '',
        filter: 'SHOW_ALL'
      });
      this.supr();
    },
    doAddTodo: function () {
      if (this.data.text === '') return;
      this.$dispatch(actions.addTodo(this.data.text));
      this.data.text = '';
    },
    toggleTodo: function (index) {
      this.$dispatch(actions.toggleTodo(index));
    },
    onKeyDown: function (ev) {
      if (ev.which === 13) {
        this.doAddTodo();
      } else if (ev.which === 27) {
        this.data.text = '';
      }
    },
    filterTodo: function (filter) {
      this.$dispatch(actions.setVisibilityFilter(filter));
      this.data.filter = filter;
    }
  });
  const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
  };
  return connect({
    mapState(state) {
      return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }
  })(comp);
});