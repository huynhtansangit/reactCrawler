import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
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
    makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, users, ...rest }) => {
    const classes = useStyles();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedUserIds;

        if (event.target.checked) {
            newSelectedUserIds = users.map((User) => User.id);
        } else {
            newSelectedUserIds = [];
        }

        setSelectedUserIds(newSelectedUserIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedUserIds.indexOf(id);
        let newSelectedUserIds = [];

        if (selectedIndex === -1) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
        } else if (selectedIndex === 0) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
        } else if (selectedIndex === selectedUserIds.length - 1) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUserIds = newSelectedUserIds.concat(
                selectedUserIds.slice(0, selectedIndex),
                selectedUserIds.slice(selectedIndex + 1)
            );
        }

        setSelectedUserIds(newSelectedUserIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUserIds.length === users.length}
                                        color="primary"
                                        indeterminate={
                                            selectedUserIds.length > 0
                                            && selectedUserIds.length < users.length
                                        }
                                        onChange={handleSelectAll}/>
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Birthday</TableCell>
                                <TableCell>Total search</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, limit).map((user) => (
                                <TableRow
                                    hover
                                    key={user.id}
                                    selected={selectedUserIds.indexOf(user.id) !== -1}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedUserIds.indexOf(user.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, user.id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            alignItems="center"
                                            display="flex">
                                            <Avatar className={classes.avatar} src={user.avatarUrl}>
                                                {/* {getInitials(user.name)} */}
                                            </Avatar>
                                            <Typography color="textPrimary" variant="body1">
                                                {user.name}
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
                                        {moment(user.createdAt).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        {user.totalSearch ? user.totalSearch : 0}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={users.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired
};

export default Results;
