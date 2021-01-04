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

const MostSearchingUrl = ({ className, onReceiveCountLink, ...rest }) => {
    const classes = useStyles();
    const [listTopSearchingUrl, setListTopSearchingUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowModal, setShowModal] = useState(false);

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"link"}));
            if(!data['error'] && data['data']){
                setListTopSearchingUrl(sortByKeyDesc(data['data']['data'], "count"));
                onReceiveCountLink((data['data']['data']).length)
            }
            setIsLoading(false);
        })()
    },[onReceiveCountLink])

    const renderListTopUrl = ()=>{
        if(isLoading) return(<ListItem><ListItemText><Skeleton/><Skeleton/></ListItemText></ListItem>)
        let res = [];
        for (const [idx, el] of listTopSearchingUrl.entries()) {
            if(idx >=5) break;
            res.push(
                <ListItem
                    divider={idx < listTopSearchingUrl.length - 1}
                    key={idx}
                >
                    <ListItemText
                        primary={<a href={el['link']} target="_blank" rel="noopener noreferrer">{el['link']}</a>}
                        secondary={`Searched ${el['count']} times`}
                    />
                    <IconButton
                        edge="end"
                        size="small"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItem>
            )
        }
        return res;
    }

    return (
        <>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <CardHeader
                    subtitle={`${listTopSearchingUrl.length} in total`}
                    title="Top URL Searched Most"
                />
                <Divider />
                <List>
                    {renderListTopUrl()}
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable={true}
                centered
                show={isShowModal}
                onHide={()=> setShowModal(!isShowModal)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Top URL Searched Most
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PerfectScrollbar>
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>URL</TableCell>
                                        <TableCell>Total Search</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        listTopSearchingUrl.map((el, idx) => (
                                            <TableRow
                                                hover
                                                key={idx}>
                                                <TableCell>
                                                    {<a href={el['link']} target="_blank" rel="noopener noreferrer">{el['link']}</a>}
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
            </Modal>
        </>
    );
};

MostSearchingUrl.propTypes = {
    className: PropTypes.string
};

export default MostSearchingUrl;
