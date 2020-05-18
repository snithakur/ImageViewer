import React, {Component} from 'react';
import './Header.css';
import Modal from 'react-modal';
import SearchIcon from '@material-ui/icons/Search';
import Search from '@material-ui/icons/Search';

import InputBase from '@material-ui/core/InputBase/index';

class Header extends Component {
    render(){
        return (
            <div>
                <header className="app-header">Image Viewer
                <div className="search">
                        <div className="searchIcon">
                            <Search/>
                        </div>
                        <InputBase className = "searchBox"
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}/>
                </div>                  
                </header>

                <Modal></Modal>
            </div>


        )

    }
}
export default Header;