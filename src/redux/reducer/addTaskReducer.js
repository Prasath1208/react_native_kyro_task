const INITIAL_STATE = {
  taskList: [],
};

export const addTaskReducer = (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case '@addTask/ADD':
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };

    case '@addTask/DELETE':
      let filteredData = state.taskList.filter(
        item => item.taskTitle != action.payload,
      );
      return {
        ...state,
        taskList: [...filteredData],
      };

    case '@addTask/UPDATE':
      const {id, data} = action.payload;
      let arr = [...state.taskList];
      var indexOfItem = state.taskList.findIndex(i => i.id === id);
      let updatedItem = {...data};
      updatedItem.id = id;
      arr.splice(indexOfItem, 1, updatedItem);

      return {
        ...state,
        taskList: [...arr],
      };

    default:
      return state;
  }
};
