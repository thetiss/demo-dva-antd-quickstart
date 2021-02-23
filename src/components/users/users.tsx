import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'dva';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const mapStateToProps = state => {
    return {
        data: state.data
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getRemote: () => dispatch({
            type: '/users/getRemote',
            payload: {
                page: 1,
                per_page: 5
            }
        })
    }
};
const Users = ( { data, getList } ) => {
    const classes = useStyles();
    return(
        <TableContainer component={ Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Create Time</TableCell>
                        <TableCell>Update Time</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data && data.map((row) => ( 
                            <TableRow key={row.name}>
                                <TableCell> {row.id}</TableCell>
                                <TableCell> {row.name}</TableCell>
                                <TableCell> {row.create_time}</TableCell>
                                <TableCell> {row.update_time}</TableCell>
                                <TableCell> {row.status}</TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};
export default connect( mapStateToProps, mapDispatchToProps)(Users);