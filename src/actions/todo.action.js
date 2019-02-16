import { todoContants } from '../_constants';

export const todoActions = {
    createNewTodo,
    listAllTodos,
    deleteTodoByIndex,
};

function createNewTodo(name, description) {
    return {
        type: todoContants.CREATE_NEW_TODO,
        name: name,
        description: description,
    }
}

function listAllTodos() {
    return {
        type: todoContants.LIST_ALL_TODOS
    }
}

function deleteTodoByIndex(index) {
    return {
        type: todoContants.DELETE_TODO_BY_INDEX,
        index: index
    }
}