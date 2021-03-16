function storeState(state) {
  window.localStorage.setItem("home_state", JSON.stringify(state));
}

function getState() {
  const state = JSON.parse(window.localStorage.getItem("home_state"));
  return state;
}

export { storeState, getState };
