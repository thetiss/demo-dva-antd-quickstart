import React, { FC, } from 'react';
import { Effect, } from 'dva';
import { Reducer, } from 'redux';
// import { message } from 'antd';

export interface ITodoState {
    content: string;
    status: number; // 1 - unfinished, 2 - finished
}
export interface ITodosListState {
    todoList: ITodoState[];
};

export interface ITodosModel {
    namespace: 'todos';
    state: ITodosListState;
    reducers: {
        save: Reducer,
    };
    effects: {
        addTodo: Effect;
        toggle: Effect;
        delete: Effect;
        modify: Effect;
    },
};

const TodosModel: ITodosModel = {
    namespace: 'todos',
    state: {
        //todoList: [{content:'', status: 1}],
        todoList: [],
    },
    reducers: {
        save(state, action){
            const todos = action.payload;
            console.log('in model', todos);
            const newTodosList = [ ...state.todoList ];  
            console.log('in model', newTodosList.concat(todos));                      
            return {
                ...state,
                todoList: newTodosList.concat(todos)
            };
        }
    },
    effects: {
        *addTodo( action, { call, put }){
            const  content = action.payload;
            console.log('in model', content);             
            if ( content ) {
                yield put({
                    type:'save',
                    payload: {
                        content,
                        status: 1
                    }
                }); 
            } else {
                // message.error('内容为空，请检查文本框输入！！！');
                console.log('内容为空，请检查文本框输入！！！');                
            }         
        },        
        *toggle(){

        },
        *delete(){

        },
        *modify(){

        }
    },
};

export default TodosModel;