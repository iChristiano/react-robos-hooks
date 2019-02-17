import React from 'react';
import SearchBox from '../../components/searchbox/SearchBox';
import CardList from '../../components/cardlist/CardList';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundary from '../errorboundary/ErrorBoundary';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response)=>{
                return response.json();
            })
            .then((users)=>{
                this.setState({robots: users});
            });
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

    render(){
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        let returnElement;
        if (!robots.length) {
            returnElement = <h1 className='tc'>Loading...</h1>;
        } else {
            returnElement = <div className='tc'>
                <h1 className='f1'>The Widget Team</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>;
        }
        return returnElement;
    }
}

export default App;