/*
 * Lists
 */
export function addList(list){
  return {
    type: 'ADD_LIST',
    list
  }
}

export function removeList(index){
  return {
    type: 'REMOVE_LIST',
    index
  }
}

export function editist(index, list){
  return {
    type: 'EDIT_LIST',
    index,
    list
  }
}