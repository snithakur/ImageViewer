import React, {Component} from 'react';
import './Header.css';
import Modal from 'react-modal';
class Header extends Component {
    render(){
        return (
            <div>
                <header className="app-header">Image Viewer</header>
                <Modal></Modal>
            </div>


        )

    }
}
export default Header;