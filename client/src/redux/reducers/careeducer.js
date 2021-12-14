const initialdata = {
  cars: [],
}

function carreducer(state = initialdata, action) {
  switch (action.type) {
    case 'getallcars':
      return {
        ...state,
        cars: action.payload,
      }
    default:
      return state
  }
}

export default carreducer
