define([
  './regular-redux/bindStore.js',
  './todomvc.js',
  './store.js',
], function (BindStore, TodoMVC, createTodoStore) {
  let App = Regular.extend({
    name: 'App',
    template: '<Provider store={store}><TodoMVC /></Provider>',
    config: function () {
      this.data.store = createTodoStore();
    }
  });
  new App({}).$inject("#demo");
});
