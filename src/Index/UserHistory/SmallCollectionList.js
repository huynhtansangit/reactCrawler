import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';
import TabMenu from '../Storage/TabMenu';
import UserHistoryApi from "./UserHistoryApi";


const SmallCollectionList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [dataOfCollection, setDataOfCollection] = useState([]);

    useEffect(()=>{
        (async ()=> {
            const response = await UserHistoryApi.getCollectionById(props.collectionId);
            console.log(response);

            if(!response['error'] && response['data']){
                setDataOfCollection(response.data['items']);
                setError("");
            }
            else if(response['error'])
                setError(response['error']);
            setIsLoading(false);
        })()
    },[props.collectionId])


    const renderTabMenu = (classes) => {
        if (isLoading === true) {
            return (
                <>
                    <Skeleton animation="wave" width='100%' height={100} />
                </>
            )
        }
        else {
            return (
                <ListItem>
                    <TabMenu error={error} dataOfCollection={dataOfCollection} isInHistoryPage={true}/>
                </ListItem>
            )
        }
    }
    return(
        <>
            {renderTabMenu()}
        </>
    )
}

export default SmallCollectionList