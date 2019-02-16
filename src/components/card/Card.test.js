import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
        <Card id={'id'} name={'name'} email={'email'} />
    </div>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
