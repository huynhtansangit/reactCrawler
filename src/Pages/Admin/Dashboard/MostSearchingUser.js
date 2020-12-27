import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    makeStyles,
} from 'ver-4-11';
import {Modal} from 'react-bootstrap';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DashboardAPI from './DashboardAPI';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';
import {sortByKeyDesc} from '../../../utils/convertTools';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(({
    root: {
        height: '100%'
    },
    image: {
        height: 48,
        width: 48
    }
}));

const MostSearchingUser = ({ className, ...rest }) => {
    const classes = useStyles();
    const [listTopSearchingUser, setListTopSearchingUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowModal, setShowModal] = useState(false);

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"user"}));
            if(!data['error'] && data['data']){
                setListTopSearchingUser(sortByKeyDesc(data['data']['data'], "count"));
            }
            setIsLoading(false);
        })()
    },[])

    return (
        <>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <CardHeader
                    subtitle={`${listTopSearchingUser.length} in total`}
                    title="Top User Searching Most"
                />
                <Divider />
                <List>
                    {
                        isLoading ? <ListItem><ListItemText><Skeleton/><Skeleton/></ListItemText></ListItem> :
                        listTopSearchingUser.map((el, i) => (
                            i >= 5 ? null : 
                            <ListItem
                                divider={i < listTopSearchingUser.length - 1}
                                key={i}
                            >
                                <ListItemText
                                    primary={el['user']['phone']}
                                    secondary={`Searched ${el['count']} times`}
                                />
                                <IconButton
                                    edge="end"
                                    size="small"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </ListItem>
                    ))}
                </List>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Button
                        color="primary"
                        endIcon={<ArrowRightIcon />}
                        size="small"
                        variant="text"
                        onClick={()=> setShowModal(!isShowModal)}
                    >
                        View all
                    </Button>
                </Box>
            </Card>
            <Modal
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable={true}
                centered
                show={isShowModal}
                onHide={()=> setShowModal(!isShowModal)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Top User Searching Most
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PerfectScrollbar>
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Total Search</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        listTopSearchingUser.map((el, idx) => (
                                            <TableRow
                                                hover
                                                key={idx}>
                                                <TableCell>
                                                    {el.user.firstname} {el.user.lastname}
                                                </TableCell>
                                                <TableCell>
                                                    {el.user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {el.count}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </PerfectScrollbar>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={()=> setShowModal(!isShowModal)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

MostSearchingUser.propTypes = {
    className: PropTypes.string
};

export default MostSearchingUser;
