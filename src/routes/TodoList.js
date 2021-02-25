import React, { Component, useEffect, useState } from 'react';
import { connect } from 'dva';
import IconButton from '@material-ui/core/IconButton';
import { green, red, grey } from '@material-ui/core/colors';

import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';
import withStyles from "@material-ui/core/styles/withStyles";


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

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
};

const TodoList = ( { todoList, addTodo, toggle, hide } ) => {
        const [ todo, setTodo ] = useState();
        let unfinishedCount = 0;
        todoList.map( item => unfinishedCount = item.status === 3 || item.status === 2 ? unfinishedCount : unfinishedCount+1);
        // const classes = useStyles();

        return(
            <div className={styles.root}>
                <h2>Todo List Here</h2>
                <InputLabel style={{ color: "#AAAAAA" }}>待办事项有{ unfinishedCount }项</InputLabel><br></br>
                <TextField
                    id="outlined-secondary"
                    label="请输入内容"
                    variant="outlined"
                    color="secondary"
                    value={todo}          
                    onChange={(e) => setTodo(e.target.value)}                
                />
                <IconButton type="submit"  aria-label="search" onClick={() => {
                    addTodo(todo);
                    setTodo('');
                }}>
                    <Icon style={{ color: green[500] }}>+</Icon>
                </IconButton>
                {}
    
                <List>            
                    <InputLabel style={{ color: "#AAAAAA" }}>待办事项有：</InputLabel><br></br>
                    { todoList.map( (todo, index) => 
                        <>
                            {
                                todo.status === 3 ?
                                    <>                                
                                    </>
                                 :  <>
                                        <ListItem key={todo.content} onClick={() => toggle(index)}>
                                            <ListItemIcon>
                                                { todo.status === 1 ? <CheckCircle style={{ color: grey[500] }} /> : <CheckCircle style={{ color: green[500] }} />}
                                            </ListItemIcon>
                                            <ListItemText onClick={() => toggle(index)}> {todo.content} </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="right" onClick={() => hide(index)} focusRipple>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </>
                            }
                        </>
                    )}
                </List>   
            </div>
        )
    };
const withStyleTodoList = withStyles(styles)(TodoList);
export default connect (mapStateToProps, mapDispatchToProps)(withStyleTodoList);
