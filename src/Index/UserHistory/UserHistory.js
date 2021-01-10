import React from 'react';
import '../Storage/Storage.css';
import Grid from '@material-ui/core/Grid';//eslint-disable-line
import Paper from '@material-ui/core/Paper';//eslint-disable-line
import { withStyles } from "@material-ui/core/styles";
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
import { convertDateToTimeStamp, removeEmptyValueParams } from '../../utils/convertTools';
import { Alert, AlertTitle } from '@material-ui/lab';
import CollectionsSharpIcon from '@material-ui/icons/CollectionsSharp';
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp';
import GroupResult from './GroupResult';
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
        '&:hover ': {
            '& .MuiSvgIcon-root':{
                color:'#005BB8 !important',
            }
        },
        color:'#F6518F',
    },
    homeIcon: {
        fontSize: 36,
        color: '#F6518F',
        transition: '0.5s',
        marginRight:10,
    },
    textField: {
        height: '64px !important',
        '& #date-time-from': {
            height: '20px !important',
        },
        '& #date-time-to': {
            height: '20px !important',
        }
    }
});
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fetchedDataCrawl: [],
            fetchedDataAddItem: [],
            countData: 0,
            error: "",
            filters: {
                offset: 0,
                limit: 10,
                from: Math.floor((Date.now() + 25200000 - 604800000) / 1000), //From 7 days ago, gmt+7, in second so /1000
                to: Math.floor((Date.now() + 25200000) / 1000),
            },
            isSelectCrawlTab: true,
        }
    }

    componentDidMount() {
        this.fetchingDataCrawl();
    }

    async componentDidUpdate(prevProps, prevState) {
        let willFetchData = false;
        if (prevState.filters !== this.state.filters) {
            willFetchData = true;
        }
        else if(prevState.isSelectCrawlTab !== this.state.isSelectCrawlTab){
            willFetchData = true; 
        }

        if(willFetchData){
            if(this.state.isSelectCrawlTab)
                    this.fetchingDataCrawl();
                else
                    this.fetchingDataAddItem();
        }
    }

    fetchingDataCrawl = async () => {
        await this.setState({isLoading: true});

        const cleanFilter = removeEmptyValueParams(this.state.filters);
        const responseData = await UserHistoryApi.getCrawlHistory(cleanFilter);
        await this.setState({
            countData: responseData['data']['count'],
            fetchedDataCrawl: responseData['data']['logs'],
            isLoading: false,
        });
        // console.log(responseData['data']['logs']);
    }
    fetchingDataAddItem = async () => {
        await this.setState({isLoading: true});
        const cleanFilter = removeEmptyValueParams(this.state.filters);
        const responseData = await UserHistoryApi.getAddItemHistory(cleanFilter);
        await this.setState({
            countData: responseData['data']['count'],
            fetchedDataCrawl: responseData['data']['logs'],
            isLoading: false,
        });
    }

    clickChangeLimit = (limit) => {
        const tempThis = this;
        this.setState({
            filters: {
                ...tempThis.state.filters,
                limit: limit,
            }
        })
    }

    clickChangePage = (page) => {
        const tempThis = this;
        this.setState({
            filters: {
                ...tempThis.state.filters,
                offset: tempThis.state.filters['limit'] * page,
            }
        })
    }

    onClickPlatformChange = (value) => {
        const tempThis = this;
        this.setState({
            filters: {
                ...tempThis.state.filters,
                platform: value ? value.toLowerCase() : ""
            }
        })
    }

    onChangeDateFrom = (value) => {
        const tempThis = this;
        this.setState({
            filters: {
                ...tempThis.state.filters,
                from: convertDateToTimeStamp(value)
            }
        })
    }

    onChangeDateTo = (value) => {
        const tempThis = this;
        this.setState({
            filters: {
                ...tempThis.state.filters,
                to: convertDateToTimeStamp(value)
            }
        })
    }

    renderAlert = () => {
        if (!this.state.isLoading) {
            if (this.state.countData === 0) {
                return (
                    <Alert variant='filled' severity="info">
                        <AlertTitle>Info</AlertTitle>
                            No records found
                    </Alert>
                )

            }
            else if (this.state.error) {
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

    renderFilterButton = (classes) => {
        if(this.state.isSelectCrawlTab){
            return(
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={2} md={4} spacing={1}>
                        <Paper className={classes.paper}>
                            <GroupSelect
                                className={classes.groupSelect}
                                isType={false}
                                onPlatformChange={(platform) => {
                                    this.onClickPlatformChange(platform)
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
                                defaultValue={new Date(Date.now() + 25200000 - 604800000).toISOString().substring(0, 16)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(dateFrom) => {
                                    this.onChangeDateFrom(dateFrom.target.value)
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4} spacing={2}>
                        <Paper className={classes.paper}> <TextField
                            id="date-time-to"
                            label="To"
                            type="datetime-local"
                            defaultValue={new Date(Date.now() + 25200000).toISOString().substring(0, 16)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(dateTo) => {
                                this.onChangeDateTo(dateTo.target.value)
                            }}
                        /></Paper>
                    </Grid>
                </Grid>
            )
        }
        else{
            return (
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={6} spacing={2}>
                        <Paper className={classes.paper}>
                            <TextField
                                id="date-time-from"
                                label="From"
                                type="datetime-local"
                                defaultValue={new Date(Date.now() + 25200000 - 604800000).toISOString().substring(0, 16)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(dateFrom) => {
                                    this.onChangeDateFrom(dateFrom.target.value)
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} spacing={2}>
                        <Paper className={classes.paper}> <TextField
                            id="date-time-to"
                            label="To"
                            type="datetime-local"
                            defaultValue={new Date(Date.now() + 25200000).toISOString().substring(0, 16)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(dateTo) => {
                                this.onChangeDateTo(dateTo.target.value)
                            }}
                        /></Paper>
                    </Grid>
                </Grid>
            )
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
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={2} spacing={1}>
                                        <Paper className={classes.paper}>
                                            <Button variant="outlined" color="primary" href="/" className={classes.button}>
                                                <HomeSharpIcon className={classes.homeIcon} />
                                            </Button>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={5} spacing={1}>
                                        <Paper className={classes.paper}>
                                            <Button variant="outlined" color="primary" className={classes.button}
                                            onClick={()=>this.setState({isSelectCrawlTab: true})}>
                                                <CloudDownloadSharpIcon className={classes.homeIcon} />
                                                Crawl history
                                            </Button>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={5} spacing={1}>
                                        <Paper className={classes.paper}>
                                            <Button variant="outlined" color="primary" className={classes.button}
                                            onClick={()=>{
                                                this.setState({isSelectCrawlTab: false});
                                                this.onClickPlatformChange(""); //Remove filter platform
                                            }}>
                                                <CollectionsSharpIcon className={classes.homeIcon} />
                                                Add to collection history
                                            </Button>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Container maxWidth={false}>
                                    <Box mt={3} minWidth={1050}>
                                        <Table>
                                            <TableRow className={classes.tableRow}>
                                                {this.renderFilterButton(classes)}
                                            </TableRow>
                                        </Table>
                                        {this.renderAlert()}
                                        {/* Ở đây truyền Data vào cho GroupResult thay cho Results */}
                                        <Results
                                            onLimitChange={(limit) => {
                                                this.clickChangeLimit(limit)
                                            }}
                                            onPageChange={(page) => {
                                                this.clickChangePage(page)
                                            }}
                                            count={this.state.countData}
                                            data={this.state.fetchedDataCrawl.length ? this.state.fetchedDataCrawl : ""}
                                            isSelectCrawlTab={this.state.isSelectCrawlTab}
                                        // isAllItems={isA0llItems}
                                        >
                                        </Results>
                                        <GroupResult
                                            data={this.state.fetchedDataCrawl.length ? this.state.fetchedDataCrawl : ""}
                                        />
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
