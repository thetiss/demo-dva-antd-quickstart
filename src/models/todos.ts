import React, { FC, } from 'react';
import { Effect, } from 'dva';
import { Reducer, } from 'redux';
// import { message } from 'antd';

export interface ITodoState {
    content: string;
    status: number; // 1 - unfinished, 2 - finished, 3 - deleted
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
        hide: Effect;
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
        // 业务逻辑处理数据在effect
        save(state, action){
            const newTodosList = action.payload;
            console.log('reducer', newTodosList);
            return {
                ...state,
                todoList: newTodosList
            };
        }
    },
    effects: {
        *addTodo( action, { call, put, select }){
            const  content = action.payload;
            console.log('effect', content);     
            const newTodo = { content, status: 1 };
            const todosListState = yield select( (state: any) => state.todos.todoList);
            const newTodoList = todosListState.concat(newTodo);
            console.log('effect, addTodo', newTodoList);
            
            if ( content ) {
                yield put({
                    type: 'save',
                    payload: newTodoList
                }); 
            } else {
                // message.error('内容为空，请检查文本框输入！！！');
                console.log('内容为空，请检查文本框输入！！！');                
            }         
        },        
        // 修改状态： 默认unfinished -> finished
        *toggle( action, { call, put, select }){
            const index = action.payload;
            const todosListState = yield select( (state: any) => state.todos.todoList);
            let newTodoList: ITodoState[] = [];
            newTodoList = newTodoList.concat(todosListState);
            let todo =  newTodoList[index];         
            todo.status = (todo.status === 1 ? 2 : 1);           
            if ( todo ) {
                yield put({
                    type: 'save',
                    payload: newTodoList
                })
            }
        },
        // 从列表中删除
        *hide( action, { put, select, call }){
            const index = action.payload;
            const todosListState = yield select( (state: any) => state.todos.todoList);     
            let newTodoList: ITodoState [] = [];
            newTodoList = newTodoList.concat(todosListState); 
            let todo =  newTodoList[index];         
            todo.status = 3;
            if ( todo ) {
                yield put({
                    type: 'save',
                    payload: newTodoList
                })
            }
        },
        // 修改内容
        *modify(){

        }
    },
};

export default TodosModel;