import React, {Component} from 'react';
import './Header.css';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.loggedIn,
            selectedElement: null
        }
    }

    click = (event) =>{
        this.setState({
            selectedElement: event.currentTarget
        })
      }
    
      myProfile = ()=>{
        this.props.myProfile();
        this.close();
      }
    
      logout = ()=>{
        this.props.logout();
        this.close();
      }
    
      close = () =>{
        this.setState({ anchorEl: null });
      }

    render(){
        return (
            <div>
                <header className="app-header">
                <div style={{display : 'inline-block', float : 'left'}}>
                <a href="/home"><span className="header-logo">Image Viewer</span></a>
                </div>
                        {sessionStorage.getItem("username")!=null &&
                        <div style={{display : 'inline-block', float :'right'}}>
                        <IconButton onClick={this.click}>
                          <Avatar alt="Profile Pic" src={this.props.userProfilePic}  style={{border: "1px solid #fff" ,height: '50px', width : '50px' }}/>
                        </IconButton>
                        <Popover
                          id="simple-menu"
                          anchorEl={this.state.selectedElement}
                          open={Boolean(this.state.selectedElement)}
                          onClose={this.close}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}>
                            <div style={{padding:'5px'}}>

                                <div>
                                  <MenuItem onClick={this.myProfile}>My Account</MenuItem>
                                  <div className='hr'/>
                                </div>

                              <MenuItem onClick={this.logout}>Logout</MenuItem>
                            </div>
                        </Popover>
                      </div>}     
                </header>
            </div>
        )
    }
}
export default Header;