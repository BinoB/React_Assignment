import React, { useState } from 'react';
import './NestedList.css';

// Sample data for the nested list
const data = [
  {
    id: 1,
    name: 'Documents',
    children: [
      {
        id: 2,
        name: 'Work',
        children: [
          { id: 3, name: 'Report.docx' },
          { id: 4, name: 'Presentation.pptx' },
        ],
      },
      {
        id: 5,
        name: 'Personal',
        children: [
          { id: 6, name: 'Resume.pdf' },
          { id: 7, name: 'Photo.jpg' },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Downloads',
    children: [
      {
        id: 9,
        name: 'Movies',
        children: [
          { id: 10, name: 'IronMan.mp4' },
          { id: 11, name: 'Trailer.mkv' },
        ],
      },
    ],
  },
];

// Recursive Component for Nested List
const NestedList = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className="nested-list">
      {items.map((item) => (
        <li key={item.id} className="nested-item">
          <div className="item-file" onClick={() => toggleExpand(item.id)}>
            {item.children ? (
              <span className="folder-icon">{expandedItems[item.id] ? '📂' : '📁'}</span>
            ) : (
              <span className="file-icon">📄</span>
            )}
            <span className="item-name">{item.name}</span>
          </div>
          {expandedItems[item.id] && item.children && (
            <NestedList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

// Main Component
const NestedListComponent = () => {
  return (
    <div className="nested-list-container">
      <h3>File Manager</h3>
      <NestedList items={data} />
    </div>
  );
};

export default NestedListComponent;
