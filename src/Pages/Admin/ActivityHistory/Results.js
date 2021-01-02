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
import { withStyles,makeStyles } from 'ver-4-11'
import { convertTimeStampToDateWithSecond, convertFormatHeaderTable } from '../../../utils/convertTools';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';


// import getInitials from 'src/utils/getInitials';
//eslint-disable-next-line
const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);
const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
      },
}));

const Results = ({ className, data, count, onLimitChange, onPageChange, isAllItems, ...rest }) => {
    const classes = useStyles();
    const [selectedUserIds, setSelectedUserIds] = useState([]); // eslint-disable-line
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [firstRender, setFirstRender] = useState(true); //eslint-disable-line


    // ComponentDidMount
    useEffect(() => {
        setFirstRender(false);
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

                    {ShowContentTable(log)}
                </TableRow>
            )
            ))
    }
    // Display api dynamically
    const ShowHeaderTable = () => {
        if (data.length && !isAllItems)
            return (
                Object.entries(data[0]).map(([key, value]) => (
                    <TableCell>{convertFormatHeaderTable(key)}</TableCell>
                )
                    // <div>{key} : {value.toString()}</div>
                ))
    }
    const returnTimeFormat = (key, value) => {
        if (key === 'time') {
            return (<Tooltip title={key} placement="left" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow className={classes.tooltip}>
                <TableCell>{convertTimeStampToDateWithSecond(value)}</TableCell>
            </Tooltip>)

        }
        else if (key === 'user') {
            if (value != null) {
                return (
                    <Tooltip title={key} placement="left" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow className={classes.tooltip}>
                        <TableCell>
                            {value['phone'].toString()}
                        </TableCell>
                    </Tooltip>

                )
            }
            else {
                return (
                    <Tooltip title={key} placement="left" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow className={classes.tooltip}>
                        <TableCell>null</TableCell>
                    </Tooltip>
                )
            }
        }
        else {
            return (
                <Tooltip title={key} placement="left" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow className={classes.tooltip}>
                    <TableCell>{value.toString()}</TableCell>
                </Tooltip>
            )
        }

    }
    const ShowContentTable = (object) => {
        return (
            Object.entries(object).map(([key, value]) => (

                <>
                    {returnTimeFormat(key, value)}
                </>
            )
                // <div>{key} : {value.toString()}</div>
            )
        )
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
                            {/* Sao ko co data? */}
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
