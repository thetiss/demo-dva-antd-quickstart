import React, { useState } from 'react';
import { connect } from 'dva';

const mapStateToProps = state => {
    return {
        todoList: state.todos.todoList, // 必须要加上namespace
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addTodo: (todo) => dispatch({
            type: 'todos/addTodo',
            payload: todo
        }),
        toggle: () => dispatch({
            type: 'todos/toggle',
            payload: null
        }),
        delete: () => dispatch({
            type: 'todos/delete',
            payload: null
        }),
        modify: () => dispatch({
            type: 'todos/modify',
            payload: null
        })
    }
};

const TodoList = ( { todoList, addTodo } ) => {
    const [unfinished, setUnfinished] = useState(0);
    const [ todo, setTodo ] = useState({});
    console.log('in page', todoList, addTodo);
    return(
        <>
            <h2>Todo List Here</h2>
            <h4>待办事项有{ todoList ? todoList.length : 0}项</h4>
            <input 
                onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={() => addTodo(todo)}>+</button>       
            <ul>待办事项有{ todoList.map((todo) => <li>{todo.content}</li>) }</ul>
   
        </>
    )
};

export default connect (mapStateToProps, mapDispatchToProps)(TodoList);
