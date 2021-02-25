import React, { useEffect, useState } from 'react';
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
        toggle: (index) => dispatch({
            type: 'todos/toggle',
            payload: index
        }),
        hide: (index) => dispatch({
            type: 'todos/hide',
            payload: index
        }),
        modify: () => dispatch({
            type: 'todos/modify',
            payload: null
        })
    }
};

const TodoList = ( { todoList, addTodo, toggle, hide } ) => {
    const [unfinished, setUnfinished] = useState(0);
    const [ todo, setTodo ] = useState({});
    let unfinishedCount = 0;
    todoList.map( item => unfinishedCount = item.status === 3 || item.status === 2 ? unfinishedCount : unfinishedCount+1);
    return(
        <>
            <h2>Todo List Here</h2>
            <h4>待办事项有{ unfinishedCount }项</h4>
            {}
            <input 
                onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={() => addTodo(todo)}>+</button>       
            <ul>待办事项有
                { todoList.map( (todo, index) => 
                    <span>
                        {
                            todo.status === 3 ?
                                <>
                                
                                </>
                             :  <>
                                    <li key={todo.content} onClick={() => toggle(index)}>{index}：{todo.content}</li>
                                    <button onClick={() => hide(index)}>-</button>                                    
                                </>    
                        }
                    </span>
                )}
            </ul>
   
        </>
    )
};

export default connect (mapStateToProps, mapDispatchToProps)(TodoList);
