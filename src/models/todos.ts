import React, { FC, } from 'react';
import { Effect, } from 'dva';
import { Reducer, } from 'redux';
import { message } from 'antd';

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
        todoList: [],
    },
    reducers: {
        // save简单
        // 处理数据在effect
        save(state, action){
            const newTodosList = action.payload;
            console.log('in model', newTodosList);
            return {
                ...state,
                todoList: newTodosList
            };
        }
    },
    effects: {
        *addTodo( action, { call, put, select }){
            const  content = action.payload;
            console.log('in model', content);     
            const newTodo = { content, status: 1 };
            const todosListState = yield select( (state: any) => state.todos.todoList);
            const newTodoList = todosListState.concat(newTodo);
            if ( content ) {
                yield put({
                    type:'save',
                    payload: newTodoList
                }); 
            } else {
                // message.error('内容为空，请检查文本框输入！！！');
                console.log('内容为空，请检查文本框输入！！！');                
            }         
        },        
        // 修改状态： 默认unfinished -> finished
        *toggle( action, { call, put }){
            const todo = action.payload;
            if ( status ) {
                yield put({
                    type: 'save',
                    payload: null
                })
            }
        },
        // 从列表中删除
        *delete(){

        },
        // 修改内容
        *modify(){

        }
    },
};

export default TodosModel;