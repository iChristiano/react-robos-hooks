import React from 'react';

const SearchBox = ({searchChange}) => {
    return(
        <div className='pa2'>
            <input 
                className='pa3 ba b--green bg-lightest-blue'
                style={{border: '2px solid #0ccac4'}}
                type='search' 
                placeholder='Search members'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;