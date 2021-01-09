import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GroupResult = (data ,...resProps) =>{
    const [groupCrawledData, setGroupCrawledData] = useState({}); //eslint-disable-line
    
    // ComponentDidMount
    useEffect(() => {
        // Data này được truyền từ userHistory.js
        groupData(data);
    }, [data]); //eslint-disable-line

    const groupData = () => {
        if(data.length){
            let groupedData = {};
            for(const el of data){
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
            console.log(groupedData);
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