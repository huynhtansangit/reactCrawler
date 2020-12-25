import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from 'ver-4-11';
import { makeStyles, } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import ListUserApi from './ListUserAPI';
import { convertTimeStampToDate } from '../../../utils/convertTools'


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, data, onLimitChange, onPageChange, ...rest }) => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [isUserActiveHashmap, setIsUserActiveHashmap] = useState({});
    const [currentUserInfo, setCurrentUserInfo] = useState("");
    const [currentUserActivities, setCurrentUserActivities] = useState("");


    // DidMount
    useEffect(() => {
        let hashmap = {};
        for (const user of data) {
            hashmap[user.phone] = user.is_active;
        }
        setIsUserActiveHashmap(hashmap);
    }, [data])

    const updateIsUserActiveHashmap = (phone) => {
        let newHashmap = { ...isUserActiveHashmap };
        newHashmap[phone] = !newHashmap[phone];

        setIsUserActiveHashmap(newHashmap);
    };

    const handleLimitChange = (event) => {
        const limit = event.target.value;
        setLimit(limit);
        onLimitChange(limit)
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage);
    };

    const clickActivateUser = async (phone) => {
        await ListUserApi.activateUser(phone);
        updateIsUserActiveHashmap(phone);
    };

    const clickDeactivateUser = async (phone) => {
        await ListUserApi.deactivateUser(phone);
        updateIsUserActiveHashmap(phone);
    };

    const clickViewInfoUser = (user) => {
        setCurrentUserInfo(user);
    }

    const clickViewActivitiesUser = async () => {
        // await ListUserApi.getA
        setCurrentUserActivities("hello");
    }

    return (
        <>
            <Card className={clsx(classes.root, className)} {...rest}>
                <PerfectScrollbar>
                    <Box minWidth={1050}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Birthday</TableCell>
                                    <TableCell>Total search</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((user) => (
                                    <TableRow
                                        hover
                                        key={user.id}>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex">
                                                <Avatar className={classes.avatar} src={user.avatarUrl}>
                                                    {/* {getInitials(user.name)} */}
                                                </Avatar>
                                                <Typography color="textPrimary" variant="body1">
                                                    {user.firstname} {user.lastname}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {user.phone}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {convertTimeStampToDate(user.birthday)}
                                        </TableCell>
                                        <TableCell>
                                            {user.totalSearch ? user.totalSearch : 0}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                // alignItems="center"
                                                display="flex"
                                                flexDirection="column"
                                                p={2}>
                                                <TableRow className="mt-2">
                                                    <Button style={{ width: "100%" }} variant="success"
                                                        onClick={() => clickActivateUser(user.phone)}
                                                        disabled={isUserActiveHashmap[user.phone] ? true : false}>
                                                        Active
                                            </Button>
                                                </TableRow>
                                                <TableRow className="mt-2">
                                                    <Button style={{ width: "100%" }} variant="danger"
                                                        onClick={() => clickDeactivateUser(user.phone)}
                                                        disabled={!isUserActiveHashmap[user.phone] ? true : false}>
                                                        Disable
                                            </Button>
                                                </TableRow>
                                                <TableRow className="mt-2">
                                                    <Button style={{ width: "100%" }} variant="primary"
                                                        onClick={() => clickViewInfoUser(user)}>
                                                        Detail
                                            </Button>
                                                </TableRow>
                                                <TableRow className="mt-2">
                                                    <Button style={{ width: "100%" }} variant="info"
                                                        onClick={() => clickViewActivitiesUser()}>
                                                        Activities
                                            </Button>
                                                </TableRow>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={data.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>

            <Modal
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable={false}
                centered
                show={currentUserInfo ? true : false}
                onHide={()=>setCurrentUserInfo("")}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User's info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Full name: {currentUserInfo.firstname} {currentUserInfo.lastname}</p>
                        <p>Email: {currentUserInfo.email}</p>
                        <p>Is active: {(currentUserInfo.is_active)?.toString()}</p>
                        <p>Is verified: {(currentUserInfo.verified)?.toString()}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success"
                        onClick={()=> clickActivateUser(currentUserInfo.phone)}
                        disabled={isUserActiveHashmap[currentUserInfo.phone] ? true : false}>
                        Activate
                    </Button>
                    <Button variant="danger"
                        onClick={()=> clickDeactivateUser(currentUserInfo.phone)}
                        disabled={!isUserActiveHashmap[currentUserInfo.phone] ? true : false}>
                        Deactivate
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable={true}
                centered
                show={currentUserActivities ? true : false}
                onHide={()=>setCurrentUserActivities("")}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User's activities
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>hello t đợi m cả buổi sáng đó Sang.</p>
                        {/* Phần này đang đợi Sang làm xong log mới có làm. */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={()=> setCurrentUserActivities("")}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Results;
