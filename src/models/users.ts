import React, { FC, } from 'react';
import { Effect, } from 'dva';
import { Reducer, } from 'redux';
import * as UserService from '../services/users.service';
import { IUserState } from './data';

export interface IUserModel {
    namespace: 'users';
    state: IUserState;
    reducers: {
        getList: Reducer,
    };
    effects: {
        getRemote: Effect;
        delete: Effect;
    },
};

const UserModel: IUserModel =  {
    namespace: 'users',
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 10,
            currentPage: 1       
        }
    },
    reducers: {
        getList( state, action ){
            const { users } = action.payload;
            return users;
        }
    },
    effects: {
        *getRemote( { call, put }, action ){
            const { currentPage, per_page } = action.payload;
            const data = yield call(UserService.getRemoteList, { currentPage, per_page });
            
            if (data) {
                yield put({
                    type: 'getList',
                    payload: data
                });
            }
        },
        *delete( { call, put, select }, action ){
            const { id } = action.payload;
            const data = yield call(UserService.deleteUserById, { id });
            const { currentPage, per_page } = yield select(
                ( state: any) => state.users.meta,
            );
            if (data) {
                yield put({
                    type: 'getRemote',
                    payload: {
                        currentPage,
                        per_page,
                    }
                });
            }
        },
    }
}
export default UserModel;
