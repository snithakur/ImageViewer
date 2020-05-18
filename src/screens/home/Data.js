import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Home.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

class Data extends Component{

    constructor(props){
       super(props);
       this.state={
           liked : false,
           count : this.props.item.likes.count,
           comments : [],
           currentComment : ''
       };

    }


    onLikeClickHandler = (e) => {
        var currentCount = this.state.count;
        if(!this.state.liked)
         {
            currentCount++;
             this.setState({liked : true, count : currentCount})
         }
         else 
         {
            currentCount--;
            this.setState({liked : false, count : currentCount})
         }
         
    }

    onCommentChange = (e) => {
        this.setState({currentComment : e.target.value});
    }

    onCommentAdded = () => {

        var list = this.state.comments;
        list.push(this.state.currentComment);
        this.setState({comments : list});
        console.log(this.state.currentComment);
        console.log(this.state.comments);
    }

    render(){
        const {item} = this.props;

        let createdTime = new Date(0);
        createdTime.setUTCSeconds(item.created_time);
        let yyyy = createdTime.getFullYear();
        let mm = createdTime.getMonth() + 1;
        let dd = createdTime.getDate();
    
        let HH = createdTime.getHours();
        let MM = createdTime.getMinutes();
        let ss = createdTime.getSeconds();
    
        let time = dd+"/"+mm+"/"+yyyy+" "+HH+":"+MM+":"+ss;
        let hashTags = item.tags.map(hash =>{
          return "#"+hash;
        });
        return(
            <div className="home-container">
            <Card className="card">
            <CardHeader
              avatar={
                <Avatar aria-label="user profile picture" className="avatar"  alt="User Profile Pic" src={item.user.profile_picture}>
                </Avatar>
              }
              title={item.user.username}
              subheader={time}
            />
            <CardContent>
            <CardMedia
              className="media"
              image={item.images.standard_resolution.url}
              title={item.caption.text}
            />
            <div  className="text-container">
              <Typography component="p">
                {item.caption.text}
              </Typography>
              <Typography style={{color:'#4dabf5'}} component="p" >
                {hashTags.join(' ')}
              </Typography>
            </div>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Add to favorites" onClick = {this.onLikeClickHandler}>
                {this.state.liked && <Favorite style={{color:'#F44336'}}/>}
                {!this.state.liked && <FavoriteBorder/>}
              </IconButton>
              <Typography component="p">
                {this.state.count} Likes
              </Typography>
            </CardActions>

            <CardContent>
            {this.state.comments!=null && this.state.comments.map((comment, index)=>{
              return(
                <div key={index} className="row">
                  <Typography component="p" style={{fontWeight:'bold'}}>
                    {sessionStorage.getItem('username')}:
                  </Typography>
                  <Typography component="p" >
                    {comment}
                  </Typography>
                </div>
              )
            })}
            <div className='formControl'>
              <FormControl style={{flexGrow:1}}>
                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                <Input id="comment" value={this.state.currentComment} onChange={this.onCommentChange}/>
              </FormControl>
              <FormControl>
                <Button onClick={this.onCommentAdded}
                   variant="contained" color="primary">
                  ADD
                </Button>
              </FormControl>
            </div>
           </CardContent>
          </Card>
          </div>

        );

    }

}

export default Data;