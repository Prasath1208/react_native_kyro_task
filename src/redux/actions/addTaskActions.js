export function addTask(data) {
  return {
    type: '@addTask/ADD',
    payload: data,
  };
}

export function deleteTask(data) {
  return {
    type: '@addTask/DELETE',
    payload: data,
  };
}

export function updateTask(id, data) {
  return {
    type: '@addTask/UPDATE',
    payload: {id, data},
  };
}
