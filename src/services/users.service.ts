import React from 'react';
import request from '../utils/request';

export const getRemoteList = ({currentPage, per_page} : {currentPage: number,per_page: number}) => {
    return request(`/users?page=${currentPage}&per_page=${per_page}`);
}

export const deleteUserById = () => {
    
}