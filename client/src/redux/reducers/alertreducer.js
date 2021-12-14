const initialdata = {
  loading: false,
}

function alertreducer(state = initialdata, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

export default alertreducer
