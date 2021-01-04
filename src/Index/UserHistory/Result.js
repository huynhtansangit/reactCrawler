import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
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
} from 'ver-4-11';
import { makeStyles } from 'ver-4-11'
import { convertTimeStampToDateWithSecond, convertFormatHeaderTable } from '../../utils/convertTools';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import FindInPageSharpIcon from '@material-ui/icons/FindInPageSharp';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    button: {
        width: '100%',
        height: 30,
        '&:hover $icon': {
            color: 'red important',
        },
        textTransform: 'none',
    },
    icon: {
        marginRight: 10,
    },
    tablecell: {

    },
    tablerow: {
        '&:hover ': {
            backgroundColor: '#FDE7EF !important',
            tooltip: {
                backgroundColor: '#FDE7EF !important',
            }
        }
    }
}));

const Results = ({ className, data, count, onLimitChange, onPageChange, isAllItems, ...rest }) => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);


    // ComponentDidMount
    useEffect(() => {
    }, [data])


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
                    <TableCell className={classes.tablecell}>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                        <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell className={classes.tablecell}>
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
                    className={classes.tablerow}
                >
                    {ShowContentTable(log)}
                </TableRow>
            )
            ))
    }
    // Display api dynamically
    const ShowHeaderTable = () => {
        if (data.length && !isAllItems)
            return (
                <>
                    {Object.entries(data[0]).map(([key, value]) => (
                        <>
                            {convertFormatHeaderTable(key) === 'User' ? <></> : <TableCell className={classes.tablecell}>{convertFormatHeaderTable(key)}</TableCell>}
                        </>
                    ))}
                    <TableCell className={classes.tablecell}>Detail</TableCell>
                </>
            )
    }
    const returnTimeFormat = (key, value) => {
        if (key === 'time') {
            return (
                <TableCell className={classes.tablecell}>{convertTimeStampToDateWithSecond(value)}</TableCell>
            )

        }
        else if (key === 'user') {
            if (value != null) {
                return (
                    <>
                    </>

                )
            }
            else {
                return (
                    <TableCell className={classes.tablecell}>null</TableCell>
                )
            }
        }
        else {
            return (
                <TableCell className={classes.tablecell}>{value.toString()}</TableCell>
            )
        }

    }
    const ShowContentTable = (object) => {
        return (
            <>
                {Object.entries(object).map(([key, value]) => (

                    <>
                        {returnTimeFormat(key, value)}

                    </>
                )
                    // <div>{key} : {value.toString()}</div>
                )}
                <TableCell className={classes.tablecell}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        <FindInPageSharpIcon className={classes.icon} />
                        View
                    </Button>
                </TableCell>
            </>)

    }
    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUserIds.length === data.length}
                                        color="primary"
                                        indeterminate={
                                            selectedUserIds.length > 0
                                            && selectedUserIds.length < data.length
                                        }
                                        onChange={handleSelectAll} />
                                </TableCell> */}
                                {ShowHeaderTable()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RenderListLogs />
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
    );
};

Results.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Results;
