import React, { useEffect, useState } from 'react';
import {
    Table,
    TableRow,
} from 'ver-4-11';
import {
    Box,
    Container,
    makeStyles,
} from 'ver-4-11';
import Page from '../../../components/Page';
import Results from './Results';
import HistoryApi from './api/historyApi';
import GroupSelect from './GroupSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { convertDateToTimeStamp,removeEmptyValueParams } from '../../../utils/convertTools';
import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.light,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    inputUser: {
        maxWidth: 230,
    },
    textField: {
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
    button: {
        width: 120,
        height: 40,
        'MuiButton-label': {
            fontSize: '14px!important',
        }
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        border: 'none',
        height: 80,
        borderRadius: 0,

    },
}));

const ActivityHistory = () => {
    const classes = useStyles();
    const [count, setCount] = useState("");
    const [filters, setFilter] = useState({
        offset: 0,
        limit: 10,
        type: 'login',
        from: 0,
        to: 1789789789,
        user: '',
        platform: '',

    });
    const [isAllItems, setIsAllItems] = useState(false);
    const [phone,setPhone]=useState("");
    const [timeUpdate, setTimeUpdate] = useState(0); //eslint-disable-line


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
            setTimeout(() => { setTimeUpdate(timeUpdate + 1) }, 5000);
        
            try {
                // remove params with empty value
                // for (const key of Object.keys(filters)) {
                //     if (filters[key] === "") {
                //         delete filters[key];
                //     }
                // }
                const cleanFilter= removeEmptyValueParams(filters);
                const responseData = await HistoryApi.getLogs(cleanFilter);
                // console.log(responseData);
                setFetchedData(responseData['logs']);
                setCount(responseData['count']);
                // console.log(responseData['count']);
            } catch (error) {
                console.log('Fail to fetch: ', error);
            }
        }
        fetchHistoryList();
    }, [filters, timeUpdate]);

    useEffect(() => {

    });
    const onClickTypeChange = (value) => {
        setFilter({
            ...filters,
            type: value,
        });
        if (value === '') {
            setIsAllItems(true);
        }
        else { setIsAllItems(false); }
    }
    const onClickPlatformChange = (value) => {
        setFilter({
            ...filters,
            platform: value,
        });
    }
    const onChangeInputUser = (value) => {
        setFilter({
            ...filters,
            user: value,
        });
        console.log(value);
    }
    const onChangeDateFrom = (value) => {
        setFilter({
            ...filters,
            from: convertDateToTimeStamp(value),
        });
    }
    const onChangeDateTo = (value) => {
        console.log(value);
        setFilter({
            ...filters,
            to: convertDateToTimeStamp(value),
        });
    }
    const renderAlert = (count) => {
        if (count === 0) {
            return (
                <Alert variant='filled' severity="info">
                    <AlertTitle>Info</AlertTitle>
                        No records found — <strong>check it out!</strong>
                </Alert>
            )

        } else {
            return (<></>)
        }
    }
    return (
        <Page className={classes.root} title="Users">
            <Container maxWidth={false}>
                {/* <Toolbar/> */}
                <Box mt={3} minWidth={1050}>
                    <Table>
                        <TableRow className={classes.tableRow}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6} md={3} spacing={1}>
                                    <Paper className={classes.paper}>
                                        <GroupSelect
                                            className={classes.groupSelect}
                                            isType={true}
                                            onTypeChange={(type) => { onClickTypeChange(type) }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} spacing={1}>
                                    <Paper className={classes.paper}>
                                        <GroupSelect
                                            className={classes.groupSelect}
                                            isType={false}
                                            onPlatformChange={(platform) => { onClickPlatformChange(platform) }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} spacing={1}>
                                    <Paper className={classes.paper}>
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="input-user"
                                                label="Phone"
                                                className={classes.inputUser}
                                                onChange={(phone)=>{setPhone(phone.target.value)}}
                                            />
                                        </form>
                                    </Paper>

                                </Grid>
                                <Grid item xs={12} sm={6} md={3} spacing={1}>
                                    <Paper className={classes.paper}>
                                        <Button variant="contained" 
                                        color="primary" 
                                        lassName={classes.button}
                                        onClick ={() => { onChangeInputUser(phone) }}>
                                            Apply
                                    </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} spacing={2}>
                                    <Paper className={classes.paper}>
                                        <TextField
                                            id="date-time-from"
                                            label="From"
                                            type="datetime-local"
                                            defaultValue="1999-04-26T10:30"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(dateFrom) => { onChangeDateFrom(dateFrom.target.value) }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} spacing={2}>
                                    <Paper className={classes.paper}> <TextField
                                        id="date-time-to"
                                        label="To"
                                        type="datetime-local"
                                        defaultValue="2020-12-24T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(dateTo) => { onChangeDateTo(dateTo.target.value) }}
                                    /></Paper>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </Table>
                    {renderAlert(count)}
                    <Results
                        onLimitChange={(limit) => { clickChangeLimit(limit) }}
                        onPageChange={(page) => { clickChangePage(page) }}
                        count={count}
                        data={fetchedData ? fetchedData : ""}
                        isAllItems={isAllItems}
                    >
                    </Results>
                </Box>
            </Container>
        </Page>
    );
};

export default ActivityHistory;
