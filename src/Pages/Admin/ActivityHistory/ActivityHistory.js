import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from 'ver-4-11';
import {
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import { ClearAllTwoTone } from '@material-ui/icons';
import HistoryApi from './api/historyApi';
import GroupSelect from './GroupSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.light,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    inputUser: {
        maxWidth: 230,
        height: 32,
    },
    textField: {
        marginTop: theme.spacing(2.5),
        width: 240,
        padding: 0
    },
    tableRow: {
        backgroundColor: '#fff',
        marginBottom: theme.spacing(1),
    },
    groupSelect: {
        maxWidth: 230,
    },
    button:{
        width:150,
        height:40,
        'MuiButton-label':{
            fontSize:'14px!important',
        }
    },
}));

const ActivityHistory = () => {
    const classes = useStyles();
    const [history, setHistory] = useState([]);
    const [count, setCount] = useState("");
    const [filters, setFilter] = useState({
        offset: 0,
        limit: 10,
        type: '',
        from: 0,
        to: 1789789789,
        user: '0868952131',
        platform: 'instagram',

    });



    const [fetchedData, setFetchedData] = useState([]);
    // const onChangeLimit =(limit)=>{
    //     setFilter(prevParams=>{
    //         prevParams['limit']=limit;
    //         return {...prevParams};
    //     })
    // }
    // const onPageChange =(page)=>{
    //     setFilter(prevParams=>{
    //         prevParams['offset']=prevParams['limit']*page;
    //         return {...prevParams};
    //     })
    // }
    const clickChangeLimit = (limit) => {
        setFilter({
            ...filters,
            limit: limit,
        })
    }
    const clickChangePage = (page) => {
        setFilter({
            ...filters,
            offset: filters['limit'] * page,
        })
    }
    // didMount
    useEffect(() => {
        const fetchHistoryList = async () => {
            try {
                const responseData = await HistoryApi.getLogs(filters);
                console.log(responseData);
                setFetchedData(responseData['logs']);
                setCount(responseData['count']);
            } catch (error) {
                console.log('Fail to fetch: ', error);
            }
        }
        fetchHistoryList();
        console.log(fetchedData);
    }, [filters]);

    useEffect(() => {

    });
const onTypeChange=(value)=>{
    setFilter({
        ...filters,
        type:value,
    });
}
    return (
        <Page className={classes.root} title="Users">
            <Container maxWidth={false}>
                {/* <Toolbar/> */}
                <Box mt={3}>
                    <TableRow className={classes.tableRow}>
                        <TableCell>
                            <GroupSelect 
                            className={classes.groupSelect} 
                            isType={true}
                            />
                        </TableCell>
                        <TableCell>
                            <form noValidate autoComplete="off">
                                <TextField id="input-user" label="Phone" className={classes.inputUser} />
                            </form>
                        </TableCell>
                        <TableCell>
                            <TextField
                                id="date-time-from"
                                label="From"
                                type="datetime-local"
                                defaultValue="1999-04-26T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id="date-time-to"
                                label="To"
                                type="datetime-local"
                                defaultValue="2020-12-24T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <GroupSelect className={classes.groupSelect} isType={false}/>
                        </TableCell>
                        <TableCell>
                            <Button   variant="contained" color="primary" className={classes.button}>Apply</Button>
                        </TableCell>
                    </TableRow>
                    <Results
                        onLimitChange={(limit) => { clickChangeLimit(limit) }}
                        onPageChange={(page) => { clickChangePage(page) }}
                        count={count}
                        data={fetchedData ? fetchedData : ""} >

                    </Results>
                </Box>
            </Container>
        </Page>
    );
};

export default ActivityHistory;
