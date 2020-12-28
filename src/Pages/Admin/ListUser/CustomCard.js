import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
const useStyles = theme =>({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    pos: {
        fontSize:18,
    },
});

class CustomCard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root} variant="outlined" >
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.title}  gutterBottom>
                        Full name : {this.props.data.firstname} {this.props.data.lastname}
                    </Typography>
                    <Typography variant="body2" className={classes.pos} component="h2" color="textSecondary">
                        Email : <strong>{this.props.data.email}</strong>
                    </Typography>
                    <Typography variant="body2" className={classes.pos} color="textSecondary" component="h2">
                        Is activated : {this.props.data.is_active?.toString()}
                    </Typography>
                    <Typography variant="body2" className={classes.pos}  component="h2" color="textSecondary">
                        Verified : {this.props.data.verified?.toString()}
                    <br />
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(useStyles)(CustomCard);
