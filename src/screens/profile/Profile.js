import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Data from './Data.js';

const styles = {
    paper: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    },
    media: {
        height: '200px',
        paddingTop: '56.25%'
    },
    imageModal: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    editModal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
};

class Profile extends Component {

    
    constructor(){
        super();
        this.state={
            profileImageUrl : "",
            username : "",
            follows : "",
            followed_by : "",
            posts : "",
            postsContent : [],
            editModalOpen : false,
            imageModalOpen : false,
            fullNameRequired: 'dispNone',
            selectedItem : null
        }
    }
    componentDidMount(){
      
    fetch('https://api.instagram.com/v1/users/self?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',{
      method: 'GET',
    })
    .then(res => res.json())
    .then((body) => {
      this.setState({ profileImageUrl: body.data.profile_picture,
        username : body.data.username,
        follows : body.data.counts.follows,
        followed_by : body.data.counts.followed_by,
        posts : body.data.counts.media,
        full_name : body.data.full_name
    })
    })
    .catch(console.log)

    fetch('https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',{
        method: 'GET',
      })
      .then(res => res.json())
      .then((body) => {
        this.setState({ postsContent : body.data
      })
      })
      .catch(console.log)
  }


  openEditModal = () => {
      this.setState ({editModalOpen : true});
  }

  closeEditModal = () => {
      this.setState ({editModalOpen : false})
  }

  openImageModal = (e) => {
    var found = this.state.postsContent.find(item => {
        return item.id === e.target.id
    })
    this.setState({ imageModalOpen: true, selectedItem: found });
  }

  closeImageModal = () => {
      this.setState({imageModalOpen:false});
  }

  fullNameChangeHandler = (e) => {
    this.setState({
        newFullName: e.target.value
    })
  }

  updateClickHandler = () => {
    this.state.newFullName === "" ? this.setState({ fullNameRequired: "dispBlock" }) : this.setState({ fullNameRequired: "dispNone" });

    if (this.state.newFullName === "") { return }

    this.setState({
        full_name: this.state.newFullName
    })

    this.closeEditModal()
}


logout = () => {
    sessionStorage.clear();
    this.props.history.replace('/');
  }

  myProfile = () =>{
    this.props.history.push('/profile');
  }

    render(){
        
        return(
           <div> 
             <Header
               userProfilePic = {this.state.profileImageUrl}
               logout = {this.logout}
               myProfile = {this.myProfile}
             />
             <div className="profile-container">
             <Avatar alt="user image" src={this.state.profileImageUrl} variant="circle" style={{width: "100px", height: "100px"}}></Avatar>
             <span style={{marginLeft: "20px"}}>
                        <div className="big"> {this.state.username} <br />
                        </div>
                        <div>
                            <div className="small"> Posts: {this.state.posts} </div>
                            <div className="small"> Follows: {this.state.follows} </div>
                            <div className="small"> Followed By: {this.state.followed_by}</div> <br />
                        </div><br/>
                        <div> 
                        <div style={{fontSize:"small",display:"inline-block"}}> 
                        {this.state.full_name}
                        </div>
                        <div style={{padding:"20px", display:"inline-block"}}>
                        <Fab  size="small" color="secondary" aria-label="edit" onClick={this.openEditModal}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        </div>
                        </div>
                        { <Modal
                            aria-labelledby="edit-modal"
                            aria-describedby="edit full name"
                            open={this.state.editModalOpen}
                            onClose={this.closeEditModal}
                            style={styles.editModal}
                        >
                            <div style={styles.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                    <Input id="fullname" onChange={this.fullNameChangeHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateClickHandler}>
                                    UPDATE
                                </Button>
                            </div>
                        </Modal> }
                    </span>
                    </div>

                {this.state.postsContent != null &&
                <GridList cellHeight={'auto'} cols={3} style={{padding: "40px"}}>
                {this.state.postsContent.map(item => (
                    <GridListTile key={item.id}>
                    <CardMedia
                        id={item.id}
                        style={styles.media}
                        image={item.images.standard_resolution.url}
                        title={item.caption.text}
                        onClick={this.openImageModal}
                    />
                    </GridListTile>
                ))}
                </GridList>}

                {this.state.selectedItem != null && 
                <Modal
                aria-labelledby="image-modal"
                aria-describedby="view image"
                open={this.state.imageModalOpen}
                onClose={this.closeImageModal}
                style={styles.imageModal}
                >
                <Data item={this.state.selectedItem}/>
                </Modal>}
                </div>

        );
    }

}

export default Profile;