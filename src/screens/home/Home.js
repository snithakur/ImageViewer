import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Data from './Data';

class Home extends Component {

    constructor(){
      super();
      this.state = {
        postsData : [],
        profileImageUrl : ''
      }

    }

    componentDidMount(){

      fetch('https://api.instagram.com/v1/users/self?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',{
        method: 'GET',
      })
      .then(res => res.json())
      .then((body) => {
        this.setState({ profileImageUrl: body.data.profile_picture,
      })
      })
      .catch(console.log)
    
        fetch('https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',{
            method: 'GET',
          })
          .then(res => res.json())
          .then((body) => {
            this.setState({ postsData : body.data
          })
          })
          .catch(console.log)
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
          logout = {this.logout}
          myProfile = {this.myProfile}
          userProfilePic = {this.state.profileImageUrl}
        />
        <div className="grid-container">
          <GridList className="grid-item" cellHeight={'auto'}>
            {this.state.postsData.map(item => (
              <GridListTile key={item.id}>
                <Data item={item}/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>

       );

    }
}

export default Home;