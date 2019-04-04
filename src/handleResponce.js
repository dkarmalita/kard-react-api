const handleResponce = (name, apiStore) => (response) => {
  const state = { run: false };
  state.response = response;
  if (!response.ok) {
    const { status, statusText } = response;
    state.error = {
      status,
      statusText,
    };
  } else {
    state.error = null;
  }
  return response.json().then((data) => {
    state.data = data;
    apiStore.setState({ [name]: state });
    return (state);
  });
};

export default handleResponce;
