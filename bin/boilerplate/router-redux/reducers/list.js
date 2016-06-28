const initialState = [
  {
    name: 'init item'
  }
]

export default function lists(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LIST': {
      return [...state, action.list]
    }
    case 'REMOVE_LIST': {
      state.splice(action.index,1)

      return [
        ...state
      ]
    }
    case 'EDIT_LIST': {
      const newList = state.splice(action,index,1,action.list)

      return [
        ...newList
      ]
    }
    default: {
      return state
    }
  }
}