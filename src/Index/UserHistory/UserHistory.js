import React from 'react';
import '../Storage/Storage.css';
import Grid from '@material-ui/core/Grid';//eslint-disable-line
import Paper from '@material-ui/core/Paper';//eslint-disable-line
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios'; //eslint-disable-line
import cookies from '../../utils/cookie';//eslint-disable-line
import Button from '@material-ui/core/Button';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import {
    Box,
    Container,
    Table,
    TableRow,
} from 'ver-4-11';
import TextField from '@material-ui/core/TextField';
import GroupSelect from './UserGroupSelect';
import Results from './Result';
import UserHistoryApi from './UserHistoryApi';
import { removeEmptyValueParams } from '../../utils/convertTools';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        width: '100% !important',
        height: 60,
        '&hover': {
            background: '#F6518F !important',
        }
    },
    homeIcon: {
        fontSize: 36,
        color: '#F6518F',

    }
});
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fetchedData: [],
            countData: 0,
            error: "",
            filters: {}
        }
    }

    componentDidMount() {
        this.fetchingData();
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.filters !== this.state.filters){
            this.fetchingData();
        }
    }

    fetchingData = async () => {
        const cleanFilter= removeEmptyValueParams(this.state.filters);
        const responseData = await UserHistoryApi.getCrawlHistory(cleanFilter);
        await this.setState({
            countData: responseData['data']['count'],
            fetchedData: responseData['data']['logs'],
            isLoading: false,
        });
    }

    clickChangeLimit = (limit) => {
        const tempThis = this;
        this.setState({filters: {
            ...tempThis.state.filters,
            limit: limit,
        }})
    }
    clickChangePage = (page) => {
        const tempThis = this;
        this.setState({filters: {
            ...tempThis.state.filters,
            offset: tempThis.state.filters['limit'] * page,
        }})
    }

    renderAlert = () => {
        if(!this.state.isLoading){
            if (this.state.countData === 0) {
                return (
                    <Alert variant='filled' severity="info">
                        <AlertTitle>Info</AlertTitle>
                            No records found
                    </Alert>
                )
    
            }
            else if(this.state.error) {
                return (
                    <Alert variant='filled' severity="info">
                        <AlertTitle>Error</AlertTitle>
                            this.state.error
                    </Alert>
                )
            }
        }
        else {
            return (<></>)
        }
    }

    render() {
        const { classes } = this.props;//eslint-disable-line
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                <Button variant="outlined" color="primary" href="/" className={classes.button}>
                                    <HomeSharpIcon className={classes.homeIcon} />
                                </Button>
                                <Container maxWidth={false}>
                                    <Box mt={3} minWidth={1050}>
                                        <Table>
                                            <TableRow className={classes.tableRow}>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={12} sm={2} md={4} spacing={1}>
                                                        <Paper className={classes.paper}>
                                                            <GroupSelect
                                                                className={classes.groupSelect}
                                                                isType={false}
                                                                onPlatformChange={(platform) => { 
                                                                    // onClickPlatformChange(platform) 
                                                                    console.log("");
                                                                }}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} sm={5} md={4} spacing={2}>
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
                                                                onChange={(dateFrom) => { 
                                                                    //onChangeDateFrom(dateFrom.target.value) 
                                                                    console.log("");
                                                                }}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} sm={5} md={4} spacing={2}>
                                                        <Paper className={classes.paper}> <TextField
                                                            id="date-time-to"
                                                            label="To"
                                                            type="datetime-local"
                                                            defaultValue="2020-12-24T10:30"
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={(dateTo) => { 
                                                                // onChangeDateTo(dateTo.target.value)
                                                                console.log("");
                                                            }}
                                                        /></Paper>
                                                    </Grid>
                                                </Grid>
                                            </TableRow>
                                        </Table>
                                            {this.renderAlert()}
                                        <Results
                                            onLimitChange={(limit) => { 
                                                this.clickChangeLimit(limit) 
                                            }}
                                            onPageChange={(page) => { 
                                                this.clickChangePage(page) 
                                            }}
                                            count={this.state.countData}
                                            data={this.state.fetchedData.length ? this.state.fetchedData : ""}
                                            // isAllItems={isA0llItems}
                                        >
                                        </Results>
                                    </Box>
                                </Container>
                            </Paper>
                        </Grid>
                    </Grid>

                </div>
            </section>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(History);
