import React, { useState,  } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

const mapStateToProps = state => {
    return {
        data: state.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRemote: () => dispatch({
            type: 'users/getRemote',
            payload: {
                page: 1,
                per_page: 5
            }
        })
    }
};

const UsersList = ( { data } ) => {
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ];
    const [ userList, setUserList ]  = useState([]);
    return(
        <>
            <Table dataSource={ data } columns={ columns } />
        </>
    )
};

export default connect( mapStateToProps, mapDispatchToProps)(UsersList);
