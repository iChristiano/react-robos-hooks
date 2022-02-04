import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import SearchBox from '../../components/searchbox/SearchBox';
import CardList from '../../components/cardlist/CardList';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundary from '../errorboundary/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobots, setSelectedRobot, updateModal } from '../../actions';
import ModalCard from '../../components/modalcard/ModalCard';

function App() {

    const dispatch = useDispatch();

    const searchField = useSelector(state => state.searchReducer.searchField);
    const robots = useSelector(state => state.requestReducer.robots);
    const isPending = useSelector(state => state.requestReducer.isPending);
    const error = useSelector(state => state.requestReducer.error);
    const selectedRobot = useSelector(state => state.selectedRobotReducer.selectedRobot);
    const modal = useSelector(state => state.modalReducer.modal);

    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value))
    };
    const onRequestRobots = () => dispatch(requestRobots());
    const onSelectedRobotChange = (selectedRobot) => {
        dispatch(setSelectedRobot(selectedRobot))
        dispatch(updateModal(true))
    };
    const closeModal = (modal) => {
        dispatch(updateModal(modal))
    };

    useEffect(() => {
        onRequestRobots();
    },[]);

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
        
    return ( ((!robots.length && isPending)) ?
        <h1 className='tc'>Loading...</h1> :
        <div className='tc'>
            <h1 className='f1'>Robos Hooks</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} onSelectedRobotChange={onSelectedRobotChange} error={error}/>
                </ErrorBoundary>
            </Scroll>
            <ModalCard selectedRobot={selectedRobot} closeModal={closeModal} modal={modal}/>
        </div>);
}

export default App;