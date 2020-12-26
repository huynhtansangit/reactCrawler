import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
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
import { makeStyles } from '@material-ui/core'
import { convertTimeStampToDate } from '../../../utils/convertTools';

// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, data, count,onLimitChange, onPageChange, ...rest }) => {
    const classes = useStyles();
    const [selectedUserIds, setSelectedUserIds] = useState([]); // eslint-disable-line
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const [timeUpdate, setTimeUpdate] = useState(0);
    const timestamp = Date.now();


    // ComponentDidMount
    useEffect(() => {
        console.log(data);
        setFirstRender(false);

    }, [data])  

    //DidUpdate
    useEffect(() => {
        // console.log(`Update ${timeUpdate}`);
        // setTimeout(() => { setTimeUpdate(timeUpdate + 1) }, 2000);
        // return ()=>{
        //     clearTimeout(time);
        // }
    }, [timeUpdate])

    const returnDateNow = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-US");
    }
    // NOTE This checkbox can not work by now because every user need a unique ID.
    // Maybe this won't be used in the near future.
    const handleSelectAll = (event) => {
        // let newSelectedUserIds;

        // if (event.target.checked) {
        //     newSelectedUserIds = data.map((User) => User.id);
        // } else {
        //     newSelectedUserIds = [];
        // }

        // setSelectedUserIds(newSelectedUserIds);
    };

    const handleSelectOne = (event, id) => {
        // const selectedIndex = selectedUserIds.indexOf(id);
        // let newSelectedUserIds = [];

        // if (selectedIndex === -1) {
        //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
        // } else if (selectedIndex === 0) {
        //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
        // } else if (selectedIndex === selectedUserIds.length - 1) {
        //     newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelectedUserIds = newSelectedUserIds.concat(
        //         selectedUserIds.slice(0, selectedIndex),
        //         selectedUserIds.slice(selectedIndex + 1)
        //     );
        // }

        // setSelectedUserIds(newSelectedUserIds);
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
    const RenderListLogs = () => {
        if (!data.length) {
            return (
                <TableRow>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                        <Skeleton animation="wave" />
                    </TableCell>
                </TableRow>
            )
        }
        else return (
            data.map((log) => (
                <TableRow
                    hover
                    key={log.id}
                    selected={selectedUserIds.indexOf(log.id) !== -1}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={selectedUserIds.indexOf(log.id) !== -1}
                            onChange={(event) => handleSelectOne(event, log.id)}
                            value="true"
                        />
                    </TableCell>
                    {/* Checkbox kko xai, do xoa sau. Do data vo giao dien di */}
                    <TableCell>
                        <Box
                            alignItems="center"
                            display="flex">
                            <Typography color="textPrimary" variant="body1">
                                {log.id}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell>
                        {!log['user'] ? "null" : log['user'].firstname + " " + log['user'].lastname}
                    </TableCell>
                    <TableCell>
                        {convertTimeStampToDate(log['time'])}
                    </TableCell>
                    <TableCell>
                        {log['url']}
                    </TableCell>
                    <TableCell>
                        {log['type']}
                    </TableCell>
                </TableRow>
            )
            ))
    }
    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUserIds.length === data.length}
                                        color="primary"
                                        indeterminate={
                                            selectedUserIds.length > 0
                                            && selectedUserIds.length < data.length
                                        }
                                        onChange={handleSelectAll} />
                                </TableCell>
                                <TableCell>User's ID</TableCell>
                                <TableCell>User's Name</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Detail</TableCell>
                                <TableCell>Activity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Sao ko co data? */}
                        <RenderListLogs/>
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
                rowsPerPageOptions={[1, 5, 10, 25]}
            />
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Results;
