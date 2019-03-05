import React, {Component} from 'react';

import './Page1.less';

import image from './images/Koala.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className="pageWrap">
                <span className="description">this is page1!!!!!</span>
                <img src={image}/>
            </div>
        )
    }
}