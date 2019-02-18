import React from 'react';
import { connect } from 'react-redux'; 
import SearchBox from '../../components/searchbox/SearchBox';
import CardList from '../../components/cardlist/CardList';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundary from '../errorboundary/ErrorBoundary';
import './App.css';

import { setSearchField } from '../../actions'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => {
            dispatch(setSearchField(event.target.value))
        }
    };
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: []
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

    render(){
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        let returnElement;
        if (!robots.length) {
            returnElement = <h1 className='tc'>Loading...</h1>;
        } else {
            returnElement = <div className='tc'>
                <h1 className='f1'>The Widget Team</h1>
                <SearchBox searchChange={onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);