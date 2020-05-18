import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';

class Data extends Component {

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
        let hashTags = item.tags.map(hash =>{
          return "#"+hash;
        });
        return(
            <div className="image-modal-container">
            <div className="image-class">
              <img style={{height:'100%',width:'100%'}}
                src={item.images.standard_resolution.url}
                alt={item.caption.text} />
            </div>
            
            <div style={{display:'flex', flexDirection:'column', width:'50%', padding:10}}>
              <div style={{borderBottom:'2px solid #f2f2f2',display:'flex', flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Avatar
                  alt="User Image"
                  src={item.user.profile_picture}
                  style={{width: "50px", height: "50px",margin:'10px'}}/>
                  <Typography component="p">
                    {item.user.username}
                  </Typography>
              </div>
              <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-between'}}>
                <div>
                  <Typography component="p">
                    {item.caption.text}
                  </Typography>
                  <Typography style={{color:'#4dabf5'}} component="p" >
                    {hashTags.join(' ')}
                  </Typography>
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
                </div>
                <div>
                  <div className="row">
                  <IconButton aria-label="Add to favorites" onClick = {this.onLikeClickHandler}>
                    {this.state.liked && <Favorite style={{color:'#F44336'}}/>}
                    {!this.state.liked && <FavoriteBorder/>}
                  </IconButton>
                  <Typography component="p">
                    {this.state.count} Likes
                  </Typography>
                  </div>
                  <div className="row">
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
                </div>
              </div>

            </div>

      </div>

        );
    }
}

export default Data;