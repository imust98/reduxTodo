define([], function () {
  return Regular.extend({
    name: 'Provider',
    template: '{#inc this.$body}',
    config: function (data) {
      if (!data.store) {
        throw Error('error');
      }
    },
    modifyBodyComponent(component) {
      const store = this.data.store;
      // component can fetch data from store which
      // implement the DataFetcher interface
      if (typeof component.mapState !== 'function') {
        console.warn(`mapState method not found in component ${component.name}`);
        return;
      }

      const unsubscribe = store.subscribe(() => {
        if (component.$phase === 'destroyed') {
          return;
        }
        const state = store.getState();
        const returnValue = component.mapState(state);
        if (returnValue !== false) {
          component.$update();
        }
      });

      component.$on('$destroy', unsubscribe);
      // component can dispatch action to store which
      // implement the ActionDispatcher interface
      component.$dispatch = store.dispatch.bind(store);
    }
  });
});