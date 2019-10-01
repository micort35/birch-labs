import React, { Component } from 'react';
import Header from './components/layout/Header';
import Team from './components/Team'
import './css/normalize.css';
import './css/style.css';

class App extends Component {
	render () {
        return (
            <div className="app">
                <Header />
                <Team />
            </div>
        )
    }
}

export default App;