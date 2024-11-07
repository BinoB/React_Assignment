import React, { useState } from 'react';
import ElementTransfer from './components/ElementTransfer/ElementTransfer';
import NestedListComponent from './components/NestedListComponent/NestedList';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';
import GameBox from './components/Game/GameBox';
import BoxSplit from './components/BoxSplit/BoxSplit';
import './HomePage.css';  // Import the CSS file

const HomePage = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'ElementTransfer':
        return <ElementTransfer />;
      case 'NestedListComponent':
        return <NestedListComponent />;
      case 'InfiniteScroll':
        return <InfiniteScroll />;
      case 'GameBox':
        return <GameBox />;
      case 'BoxSplit':
        return <BoxSplit />;
      default:
        return <p className='select'>Select a component to view</p>;
    }
  };

  return (
    <div className="container">
      <h1>Home Page</h1>
      <div className="button-container">
        <button onClick={() => setCurrentComponent('ElementTransfer')}>Element Transfer</button>
        <button onClick={() => setCurrentComponent('NestedListComponent')}>Nested List Component</button>
        <button onClick={() => setCurrentComponent('InfiniteScroll')}>Infinite Scroll</button>
        <button onClick={() => setCurrentComponent('GameBox')}>Game</button>
        <button onClick={() => setCurrentComponent('BoxSplit')}>Box Split</button>
      </div>

      <div className="component-container">
        {renderComponent()}
      </div>
    </div>
  );
};

export default HomePage;
