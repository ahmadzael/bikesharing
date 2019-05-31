  import { USER_ACTION } from '../actions'
  
  const defaultState = {
    user : null
  }

  export default (state = defaultState, action) => {
    switch (action.type) {
    case USER_ACTION.UPDATE_USER:
      return Object.assign(
        {},
        { ...state},
        { user: action.payload.user }
      )
    case USER_ACTION.CLEAR_USER:
        return Object.assign(
          {},
          { ...state},
          { user: null }
        )
    default:
      return state
    }
  }
  