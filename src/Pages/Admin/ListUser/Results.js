import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import { makeStyles, } from 'ver-4-11';
import { Button, Modal } from 'react-bootstrap';
import ListUserApi from './ListUserAPI';
import { convertTimeStampToDate } from '../../../utils/convertTools'
import Skeleton from '@material-ui/lab/Skeleton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import HistoryApi from '../ActivityHistory/api/historyApi';
import CustomCard from './CustomCard';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {}
})((props) => <Checkbox color="default" {...props} />);

const Results = ({ className, isLoading, data, count, onLimitChange, onPageChange, ...rest }) => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [isUserActiveHashmap, setIsUserActiveHashmap] = useState({});
    const [currentUserInfo, setCurrentUserInfo] = useState("");
    // mới vào là nó khởi tạo mảng rỗng rồi
    const [currentUserActivities, setCurrentUserActivities] = useState([]);


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
        onLimitChange(limit);
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

    const clickViewActivitiesUser = async (phone) => {
        const params = {
            offset: 0,
            limit: 20,
            from: 0,
            to: 1789789789,
            user: phone,
        }
        try {
            const responseData = await HistoryApi.getLogs(params);

            setCurrentUserActivities(responseData['logs']);

        } catch (error) {

        }
    }

    const RenderListUsers = () => {
        if (isLoading) {
            return (
                <TableRow>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton /><Skeleton /><Skeleton />
                    </TableCell>
                </TableRow>)
        }
        else if (!data.length) {
            return (
                <TableRow>
                    <TableCell>Nothing to show here...</TableCell>
                </TableRow>
            )
        }
        else {
            return (
                data.map((user) => (
                    <TableRow
                        hover
                        key={user.id}>
                        <TableCell>
                            <Box
                                alignItems="center"
                                display="flex">
                                {/* <Avatar className={classes.avatar} src={user.avatarUrl}/> */}
                                <Typography color="textPrimary" variant="body1">
                                    {/* eslint-disable-next-line */}
                                    <a onClick={() => { clickViewInfoUser(user) }}>{user.firstname} {user.lastname}</a>
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {/* eslint-disable-next-line */}
                            <a onClick={() => { clickViewInfoUser(user) }}>{user.phone}</a>
                        </TableCell>
                        <TableCell>
                            {/* eslint-disable-next-line */}
                            <a onClick={() => { clickViewInfoUser(user) }}>{user.email}</a>
                        </TableCell>
                        <TableCell>
                            {/* eslint-disable-next-line */}
                            <a onClick={() => { clickViewInfoUser(user) }}>{convertTimeStampToDate(user.birthday)}</a>
                        </TableCell>
                        <TableCell>
                            <FormControlLabel
                                control={<GreenCheckbox checked={user.verified ? true : false} disabled name="is_verified" />}
                            // label="Custom color"
                            />
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
                                        disabled={isUserActiveHashmap[user.phone] ? true : false}
                                        hidden={isUserActiveHashmap[user.phone] ? true : false}>
                                        Activate User
                            </Button>
                                </TableRow>
                                <TableRow className="mt-2">
                                    <Button style={{ width: "100%" }} variant="danger"
                                        onClick={() => clickDeactivateUser(user.phone)}
                                        disabled={!isUserActiveHashmap[user.phone] ? true : false}
                                        hidden={!isUserActiveHashmap[user.phone] ? true : false}>
                                        Disable User
                            </Button>
                                </TableRow>
                                <TableRow className="mt-2">
                                    <Button style={{ width: "100%" }} variant="primary"
                                        onClick={() => clickViewInfoUser(user)}>
                                        User's Detail
                            </Button>
                                </TableRow>
                                <TableRow className="mt-2">
                                    <Button style={{ width: "100%" }} variant="info"
                                        onClick={() => clickViewActivitiesUser(user['phone'])}>
                                        User's Activities
                            </Button>
                                </TableRow>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))
            )
        }
    };
    const renderUserActivitiesLogs = (data) => {
        if (data.length) {
            console.log(data);
            return (
                data.map((value, idx) => (
                    <>
                        <hr />
                        <div>
                            Time: {convertTimeStampToDate(value.time)}
                            <br />
                            Action: {value.type}
                        </div>
                    </>
                ))
            )
        }

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
                                    <TableCell>Is verified?</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <RenderListUsers />
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={count}
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
                onHide={() => setCurrentUserInfo("")}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User's info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <CustomCard data={currentUserInfo}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success"
                        onClick={() => clickActivateUser(currentUserInfo.phone)}
                        disabled={isUserActiveHashmap[currentUserInfo.phone] ? true : false}>
                        Activate
                    </Button>
                    <Button variant="danger"
                        onClick={() => clickDeactivateUser(currentUserInfo.phone)}
                        disabled={!isUserActiveHashmap[currentUserInfo.phone] ? true : false}>
                        Disable
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable={true}
                centered
                show={currentUserActivities?.length ? true : false}
                onHide={() => setCurrentUserActivities("")}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User's activities
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderUserActivitiesLogs(currentUserActivities)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => setCurrentUserActivities("")}>
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
