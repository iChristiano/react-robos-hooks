import React from 'react';
import Card from '../card/Card';

const CardList = ({robots, onSelectedRobotChange}) => {
    return(
        <div>
            {
                robots.map((user, i) => {
                    return(
                        <Card 
                            key={i} 
                            id={user.id} 
                            name={user.name} 
                            email={user.email} 
                            onSelectedRobotChange={onSelectedRobotChange}
                        />
                    );
                })
            }
        </div>      
    );
}

export default CardList;