import React, {PureComponent} from 'react';

// import './Home.css'

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState(prestate =>({
            count: prestate.count+1
        }));
    }

    render() {
        return (
            <div className='wrap'>
                this is home~<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}