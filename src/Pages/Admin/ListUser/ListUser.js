import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import ListUserAPI from './ListUserAPI'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ListUser = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState("");
    const [filteredUsers, setFilteredUsers] = useState("");
    const [params, setParams] = useState({
        limit: 10,
        offset: 0
    });

    useEffect(()=>{
        (async ()=>{
            const data = await ListUserAPI.getUsers(params);
            setUsers(data['users']);
            setCount(data['count']);
        })()
    },[params]);

    const filterUser = (searchValue) => {
        if(searchValue){
            let res = users.filter((val)=>{
                if(val.firstname.toLowerCase().includes(searchValue) || val.lastname.toLowerCase().includes(searchValue)
                    || val.phone.includes(searchValue))
                    return true;
                return false;
            });
            setFilteredUsers(res);
        }
        else{
            setFilteredUsers("");
        }
    };
    
    const clickChangeLimit = (limit) => {
        setParams(prevParams=>{
            prevParams['limit']= limit;
            return {...prevParams};
        });
    };

    const clickChangePage = (page) => {
        setParams(prevParams=>{
            prevParams['offset']= prevParams['limit']*page;
            return {...prevParams};
        })
    };
    
    const handleAdvanceSearch = async (searchValue) => {
        let params = {q: searchValue.split(" ")};
        await ListUserAPI.getUser(params);
    };

    return (
        <Page className={classes.root} title="Users">
            <Container maxWidth={false}>
                <Toolbar 
                    onChangeSearchValue={(searchValue)=>filterUser(searchValue)}
                    onAdvanceSearch={(searchValue)=>{handleAdvanceSearch(searchValue)}}
                />
                <Box mt={3}>
                    <Results 
                        onLimitChange={(limit)=>{clickChangeLimit(limit)}}
                        onPageChange={(page)=>{clickChangePage(page)}}
                        count={count}
                        data={filteredUsers ? filteredUsers : users}>
                    </Results>
                </Box>
            </Container>
        </Page>
    );
};

export default ListUser;
