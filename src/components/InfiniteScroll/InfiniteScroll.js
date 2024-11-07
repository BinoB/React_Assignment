import React, { useState, useEffect } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(20);

  useEffect(() => {
    addMoreItems();
  }, []);

  const addMoreItems = () => {
    setItems((prevItems) => {
      const newItems = Array.from(
        { length: 20 },
        (_, i) => i + 1 + prevItems.length
      );
      return [...prevItems, ...newItems];
    });
    setItemCount(itemCount + 20);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= scrollHeight - 10) {
      addMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div className="container">
      <h1>Infinite Scroll</h1>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteScroll;
