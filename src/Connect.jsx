import React from 'react';

const Connect = $store => mapStateToProps => WrappedComponent => class extends React.Component {
    state = {}

    constructor(props) {
      super(props);
      this.state = $store.getState();
      this.unsubscribe = $store.subscribe(newState => this.setState(newState));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const props = mapStateToProps(this.state, this.props);
      return <WrappedComponent {...props} />;
    }
};

export default Connect;
