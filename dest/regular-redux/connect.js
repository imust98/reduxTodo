define([], function () {
  return function ({
    mapState,
  }) {
    return function (originComponent) {
      if (mapState && typeof mapState === 'function') {
        originComponent = originComponent.implement({
          mapState(state) {
            const mappedData = mapState.call(this, state, this.data);
            mappedData && Object.assign(this.data, mappedData);
            return mappedData;
          }
        });
      }
      // if (dispatch) {
      //   // originComponent = originComponent.implement(IActionDispatcher);
      // }
      return originComponent;
    };
  }
});