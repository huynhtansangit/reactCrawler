import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../Gallery/VideoItem'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles({
    root: {
      width: '100%',
      height: 800,
      overflowY: 'scroll',
      marginTop: 20,
    },
  });
function Example(props) {
    let classes=useStyles();
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/123157481_210811940462246_7121752011952661535_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=102&_nc_ohc=o_9G8dO177EAX9a5Kla&oe=5FD1769A&oh=ad8bdb89749cc65bed316939f05d680a"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://scontent-lhr8-1.cdninstagram.com/v/t50.2886-16/129820521_115036547097652_5286824065906570782_n.mp4?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=BQlPA261CtQAX92JqNX&oe=5FD11AD2&oh=7899dd0780942aaf523be048a6732cd1"
        }
    ]

    return (
    <div className={classes.root}>
<ImageList variant="masonry" cols={6} gap={10}>
            {
                items.map((item, i) =>
                    <ImageListItem key={i}>
                        <VideoItem url={item.url}></VideoItem>
                    </ImageListItem>

                )
            }
        </ImageList>
    </div>
    )
}

export default Example;
