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
import { Modal, Button as BtnBootstrap } from 'react-bootstrap';
import { makeStyles } from 'ver-4-11';
import { convertTimeStampToDateWithSecond } from '../../utils/convertTools';
import Button from '@material-ui/core/Button';
import FindInPageSharpIcon from '@material-ui/icons/FindInPageSharp';
import SmallGallery from './SmallGallery';
import { DOWNLOAD_URL } from '../../utils/config.url';
import SmallCollectionList from './SmallCollectionList';
import { Link, } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        textAlign: "left !important",
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    button: {
        width: '100%',
        maxWidth: '150px',
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
    },
    child: {
        marginLeft: 30,

    },
    paddingLeft:{
        marginLeft:"10px !important",
    }
}));

const Results = ({ className, data, count, onLimitChange, onPageChange, isAllItems, ...restProps }) => {
    const classes = useStyles();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [isShowModalCrawl, setShowModalCrawl] = useState(false);
    const [isShowModalAddItem, setShowModalAddItem] = useState(false);
    const [dataSmallGallery, setDataSmallGallery] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [inputUrl, setInputUrl] = useState("");

    const [collectionId, setCollectionId] = useState("");
    const [collectionName, setCollectionName] = useState("");


    // ComponentDidMount
    useEffect(() => {
        // groupData(data);
    }, [data]); //eslint-disable-line

    // const groupData = () => {
    //     if(data.length){
    //         let groupedData = {};
    //         for(const el of data){
    //             const splittedUrl = el['url'].split('/');
    //             if(splittedUrl[2] === "fb.watch"|| splittedUrl[2] === "p"){
    //                 console.log(el.url+" is a post.")
    //             }   
    //             else{
    //                 if(groupedData.hasOwnProperty(splittedUrl[3]))
    //                     groupedData[splittedUrl[3]] = [...(groupedData[splittedUrl[3]]), el]; 
    //                 else
    //                 groupedData[splittedUrl[3]] = [el];
    //             }
    //         }
    //         console.log(groupedData);
    //         // setGroupCrawledData(groupedData);
    //     }
    // }


    const handleLimitChange = (event) => {
        const limit = event.target.value;
        setLimit(limit);
        onLimitChange(limit);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage);
    };

    const getMediaForPreview = async (inputUrl, nameNetwork, cursor) => {
        setIsLoading(true);

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        let option = {
            method: 'POST',
            headers: headers
        };

        try {
            let fetchUrl = "";
            if (nameNetwork === 'tiktok') {
                option['method'] = 'GET';
                fetchUrl = `${DOWNLOAD_URL}/${nameNetwork}/info?url=${inputUrl}`
            }
            else {
                if (cursor) {
                    option['body'] = JSON.stringify({
                        "url": inputUrl,
                        "cursor": cursor,
                        'requestType': "highlight"
                    })
                }
                else {
                    option['body'] = JSON.stringify({
                        "url": inputUrl,
                        'requestType': "highlight"
                    })
                }
                fetchUrl = `${DOWNLOAD_URL}/${nameNetwork}`;
                // response = await fetch(`${DOWNLOAD_URL}/${nameNetwork}`, option);
            }
            const response = await fetch(fetchUrl, option);
            const data = await response.json();

            if (!data['data']?.length && !data['owner'])
                throw new Error("404")

            let imagesData = [];
            let videosData = [];
            const ownerMedia = data['owner'];

            if (nameNetwork === 'instagram') {
                data['data'].forEach(ele => {
                    if (ele['isVideo']) {
                        videosData.push(ele);
                    }
                    else {
                        imagesData.push(ele);
                    }
                });
            }
            else {
                // if(nameNetwork==='tiktok'){
                //     setAdditionalInfoTiktok({})
                //     // this.setState({additionalInfoTiktok: {
                //     //     isAdded: data['isAdded'],
                //     //     id: data['id'], 
                //     //     source: data['source'],
                //     //     collectionId: data['collectionId'],
                //     // }});
                //     // this.setState({isAddedTiktok: data['isAdded']});
                // }
                videosData = data['data'];
            }

            setDataSmallGallery({ imagesData: imagesData, videosData: videosData, ownerMedia: ownerMedia })
        } catch (error) {
            console.log(error);
            setError(error.message);
            setDataSmallGallery({ imagesData: null, videosData: null, ownerMedia: null })
        }
        finally {
            setIsLoading(false);
        }

        return dataSmallGallery;
    }
    // Hàm gom nhóm data trả về một mảng obj {1:{},2:{}}.
    const groupData = (param) => {
        if (param.length) {
            let groupedData = {};
            for (const el of param) {
                const splittedUrl = el['url'].split('/');
                if (splittedUrl[2] === "fb.watch" || splittedUrl[3] === "p") {
                    console.log(el.url + " is a post.")
                    if (groupData[el.url]?.length)
                        groupedData[el.url] = [...(groupedData[el.url]), el];
                    else
                        groupedData[el.url] = [el];
                }
                else {
                    if (groupedData.hasOwnProperty(splittedUrl[3]))
                        groupedData[splittedUrl[3]] = [...(groupedData[splittedUrl[3]]), el];
                    else
                        groupedData[splittedUrl[3]] = [el];
                }
            }
            console.log(groupedData); //nay la hashmap
            return groupedData;
        }
    }
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
        else {
            var groupedData = groupData(data);
            console.log(groupedData);
            return (
                // Xử lý data chỗ này
                Object.entries(groupedData).map(([key, value], index) => (
                    <TableRow
                        hover
                        key={key}
                        className={classes.tablerow}
                    >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography className={classes.heading}>
                                    <Box minWidth={1050}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell width="50%">
                                                        {key}
                                                    </TableCell>
                                                    <TableCell width="50%" >
                                                        {value[0].platform}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.child}>
                                    <Box minWidth={1050}>
                                        <Table>
                                            <TableBody>
                                                {value.map((object) => ShowContentTable(object))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                    {/* {ShowContentTable(value)} */}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </TableRow>
                ))
            )
        }
    }
    // Display api dynamically
    // const ShowHeaderTable = () => {
    //     if (data.length && !isAllItems)
    //         return (
    //             <>
    //                 {Object.entries(data[0]).map(([key, value]) => (
    //                     <>
    //                         {['User', 'Owner phone', 'Type', 'Thumbnail', 'Id', 'Collection id'].includes(convertFormatHeaderTable(key)) || (convertFormatHeaderTable(key) === 'Url' && !restProps.isSelectCrawlTab) ? <></> : <TableCell className={classes.tablecell}>{convertFormatHeaderTable(key)}</TableCell>}
    //                     </>
    //                 ))}
    //                 <TableCell className={classes.tablecell}>Detail</TableCell>
    //             </>
    //         )
    // }

    const returnTimeFormat = (key, value) => {
        if (key === 'time') {
            return (
                <TableCell className={classes.tablecell}>{convertTimeStampToDateWithSecond(value)}</TableCell>
            )
        }
        else if (['user', 'owner_phone', 'type', 'thumbnail', 'id', 'collection_id'].includes(key) || (key === 'url' && !restProps.isSelectCrawlTab)) {
            // Useless field => show nothing
            return (
                <>
                </>
            )
        }
        else if (key === 'url' || key === 'source') {
            return (
                <TableCell className={classes.tablecell}>
                    <a href={value.toString()} target="_blank" rel="noopener noreferrer">{(value.toString()).substring(0, 75)}{value.toString().length > 75 ? "..." : ""}</a>
                </TableCell>
            )
        }
        else {
            return (<TableCell className={classes.tablecell}>{value.toString()}</TableCell>)
        }
    }
    const ShowContentTable = (object) => {
        return (
            <TableRow className={classes.tablerow}>
                <>
                    {Object.entries(object).map(([key, value]) => (
                        <>
                            {returnTimeFormat(key, value)}
                        </>
                    )
                    )}
                    {/* Giờ chỗ title hiển thị thêm thông tin cho nó dài raaaa*/}
                    <TableCell className={classes.tablecell}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => handleShowModal(restProps.isSelectCrawlTab ? 'crawl' : 'addItem',
                                { url: object['url'], platform: object['platform'] },
                                { collectionId: object['collection_id'], collectionName: object['collection_name'] })}
                        >
                            <FindInPageSharpIcon className={classes.icon} />
                            View
                        </Button>
                    </TableCell>
                </>
            </TableRow>)
    }

    const handleShowModal = async (type, dtoCrawlTab, dtoAddItemTab) => {
        // show correspond modal
        if (type === 'crawl') {
            setShowModalCrawl(true);
        }
        else if (type === 'addItem') {
            setShowModalAddItem(true);
        }
        else {
            setShowModalCrawl(false);
            setShowModalAddItem(false);
        }

        if (dtoCrawlTab && restProps.isSelectCrawlTab) {
            // console.log(dtoCrawlTab)
            setPlatform(dtoCrawlTab['platform']);
            setInputUrl(dtoCrawlTab['url']);

            await getMediaForPreview(dtoCrawlTab['url'], dtoCrawlTab['platform']);
        }
        else if (dtoAddItemTab && !restProps.isSelectCrawlTab) {
            setCollectionId(dtoAddItemTab['collectionId']);
            setCollectionName(dtoAddItemTab['collectionName']);
        }
    }

    return (
        <>
            <Card className={clsx(classes.root, className)} {...restProps}>
                <PerfectScrollbar>
                    <Box minWidth={1050}>
                        <Table>
                            <TableHead>
                                {/* <TableRow className={classes.tablerow}>
                                    <TableCell>Base</TableCell>
                                    <TableCell>Platform</TableCell>
                                </TableRow> */}
                            </TableHead>
                            <TableBody>
                                {/* Render each body result */}
                                <Box minWidth={1050}>
                                    <Table>
                                        {
                                            <TableHead>
                                                <TableRow className={classes.tablerow}>
                                                    <TableCell width="50%">Base</TableCell>
                                                    <TableCell width="50%">Platform</TableCell>

                                                </TableRow>
                                            </TableHead>
                                        }
                                    </Table>
                                </Box>
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

            <Modal
                size="xl"
                scrollable={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isShowModalCrawl}
                onHide={() => handleShowModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Previewer searched data
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SmallGallery isLoading={isLoading}
                        dataGallery={dataSmallGallery}
                        error={error} nameNetwork={platform}
                        inputUrl={inputUrl}
                        isAuth={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Link to={{ pathname: '/', state: { action: "search", inputUrl: inputUrl, nameNetwork: platform } }}>
                        <BtnBootstrap variant="secondary">
                            View Full In Homepage
                    </BtnBootstrap>
                    </Link>
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                scrollable={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isShowModalAddItem}
                onHide={() => handleShowModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Previewer collection
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SmallCollectionList collectionId={collectionId} />
                </Modal.Body>
                <Modal.Footer>
                    <Link to={{ pathname: '/me', state: { action: "viewCollection", collectionId: collectionId, collectionName: collectionName } }}>
                        <BtnBootstrap variant="secondary">
                            View Full In Collection
                    </BtnBootstrap>
                    </Link>
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
