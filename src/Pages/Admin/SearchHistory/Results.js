import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import {makeStyles} from '@material-ui/core'
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, data, ...rest }) => {
    const classes = useStyles();
    const [selectedUserIds, setSelectedUserIds] = useState([]); // eslint-disable-line
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);


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
                                        checked={selectedUserIds.length === data.length}
                                        color="primary"
                                        indeterminate={
                                            selectedUserIds.length > 0
                                            && selectedUserIds.length < data.length
                                        }
                                        onChange={handleSelectAll}/>
                                </TableCell>
                                <TableCell>User's ID</TableCell>
                                <TableCell>Platform</TableCell>
                                <TableCell>URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(0, limit).map((user) => (
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
                                        Instagram
                                    </TableCell>
                                    <TableCell>
                                        https://www.instagram.com/selenagomez
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
    );
};

Results.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Results;
