import React from 'react';
import { connect } from 'react-redux'; 
import SearchBox from '../../components/searchbox/SearchBox';
import CardList from '../../components/cardlist/CardList';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundary from '../errorboundary/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobots, setSelectedRobot, updateModal } from '../../actions';
import ModalCard from '../../components/modalcard/ModalCard';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchReducer.searchField,
        robots: state.requestReducer.robots,
        isPending: state.requestReducer.isPending,
        error: state.requestReducer.error,
        selectedRobot: state.selectedRobotReducer.selectedRobot,
        modal: state.modalReducer.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => {
            dispatch(setSearchField(event.target.value))
        },
        onRequestRobots: () => dispatch(requestRobots()),
        onSelectedRobotChange: (selectedRobot) => {
            dispatch(setSelectedRobot(selectedRobot))
            dispatch(updateModal(true))
        },
        closeModal: (modal) => {
            dispatch(updateModal(modal))
        }
    };
};

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render(){
        const { searchField, onSearchChange, robots, isPending, selectedRobot, onSelectedRobotChange, modal, closeModal } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        let returnElement;
        if (!robots.length && isPending) {
            returnElement = <h1 className='tc'>Loading...</h1>;
        } else {
            returnElement = <div className='tc'>
                <h1 className='f1'>React Robos</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} onSelectedRobotChange={onSelectedRobotChange}/>
                    </ErrorBoundary>
                </Scroll>
                <ModalCard selectedRobot={selectedRobot} closeModal={closeModal} modal={modal}/>
            </div>;
        }
        return returnElement;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);