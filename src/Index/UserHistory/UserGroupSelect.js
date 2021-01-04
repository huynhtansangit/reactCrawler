import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from 'ver-4-11/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
}));

export default function GroupedSelect({ isType, onTypeChange, onPlatformChange, ...rest }) {
    const classes = useStyles();
    useEffect(() => {
        // console.log(isType);

    }, [isType]);

    const renderTypeSelect = () => {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">
                    <FilterListIcon />
                    Type
                </InputLabel>
                <Select
                    onChange={(event) => { onTypeChange(event.target.value) }}
                    defaultValue="login" id="grouped-select">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <ListSubheader>Type</ListSubheader>
                    {/* <MenuItem value={'create_collection'}>Create collection</MenuItem> */}
                    {/* <MenuItem value={'remove_collection'}>Remove collection</MenuItem> */}
                    <MenuItem value={'add_item'}>Add item</MenuItem>
                    {/* <MenuItem value={'remove_item'}>Remove item</MenuItem> */}
                    <MenuItem value={'crawl'}>Crawl</MenuItem>
                </Select>
            </FormControl>
        )
    }
    const renderPlatformSelect = () => (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">
                <FilterListIcon />
        Platform</InputLabel>
            <Select defaultValue="" id="grouped-select"
                onChange={(event) => { onPlatformChange(event.target.value) }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {/* <ListSubheader>Platform</ListSubheader> */}
                <MenuItem value={'Instagram'}>Instagram</MenuItem>
                <MenuItem value={'Facebook'}>Facebook</MenuItem>
                <MenuItem value={'Tiktok'}>Tiktok</MenuItem>
            </Select>
        </FormControl>
    )

    return (
        <div>
            {!isType ? renderPlatformSelect() : renderTypeSelect()}
        </div>
    );
}