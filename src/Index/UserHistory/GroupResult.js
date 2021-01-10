import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const GroupResult = ({data ,...resProps}) =>{
    const [groupCrawledData, setGroupCrawledData] = useState({}); //eslint-disable-line

    const useStyles = makeStyles({
        root: {
          height: 110,
          flexGrow: 1,
          maxWidth: 400,
        },
      });
    // ComponentDidMount
    useEffect(() => {
        // Data này được truyền từ userHistory.js
        console.log(data);
        groupData(data);
    }, [data]); //eslint-disable-line

    const groupData = (param) => {
        if(param.length){
            let groupedData = {};
            for(const el of param){
                const splittedUrl = el['url'].split('/');
                if(splittedUrl[2] === "fb.watch"|| splittedUrl[2] === "p"){
                    console.log(el.url+" is a post.")
                }   
                else{
                    if(groupedData.hasOwnProperty(splittedUrl[3]))
                        groupedData[splittedUrl[3]] = [...(groupedData[splittedUrl[3]]), el]; 
                    else
                    groupedData[splittedUrl[3]] = [el];
                }
            }
            console.log(groupedData); //nay la hashmap
            setGroupCrawledData(groupedData);
        }
    }

    return(
        <>
            Lấy results cho vào đây.
        </>
    )
}

GroupResult.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default GroupResult