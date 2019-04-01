export function Observable(initialState={}) {
  const observers = [];
  let state = initialState;

  const invokeObservers = (newState) => {
    observers.forEach(observer => observer(newState));
  };

  return {

    subscribe: (observer) => {
      observers.push(observer);
      const unsubscribe = () => {
        const foundIdx = observers.some((x, idx) => {
          if (x === observer) {
            observers.splice(idx, 1);
            return true;
          }
          return false;
        });
      }
      return unsubscribe
    },

    setState: (update) => {
      state = { ...state, ...update };
      invokeObservers(state);
    },

    getState: () => ({ ...state }),
  };
}

/* example */
// const $history = new Observable();
// const unsubscribe = $history.subscribe(console.log)
// $history.setState({ data: 'test' }) // {data: "test"}
// unsubscribe()
// $history.setState({ data: 'test2' }) // nothing to print
