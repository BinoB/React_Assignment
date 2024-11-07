import React, { useState } from 'react';
import './ElementTransfer.css';

// Main Component
const ElementTransfer = () => {
  const [bucket1, setBucket1] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 5']);
  const [bucket2, setBucket2] = useState(['Item 4', 'Item 6']);
  
  // State to keep track of selected items in each bucket
  const [selectedBucket1, setSelectedBucket1] = useState([]);
  const [selectedBucket2, setSelectedBucket2] = useState([]);

  // Toggle selection for items in Bucket 1
  const toggleSelectionBucket1 = (item) => {
    setSelectedBucket1((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  // Toggle selection for items in Bucket 2
  const toggleSelectionBucket2 = (item) => {
    setSelectedBucket2((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  // Move selected items from Bucket 1 to Bucket 2
  const moveToBucket2 = () => {
    setBucket2([...bucket2, ...selectedBucket1]);
    setBucket1(bucket1.filter((item) => !selectedBucket1.includes(item)));
    setSelectedBucket1([]); // Clear selection after moving
  };

  // Move selected items from Bucket 2 to Bucket 1
  const moveToBucket1 = () => {
    setBucket1([...bucket1, ...selectedBucket2]);
    setBucket2(bucket2.filter((item) => !selectedBucket2.includes(item)));
    setSelectedBucket2([]); // Clear selection after moving
  };

  // Move all items from Bucket 1 to Bucket 2
  const moveAllToBucket2 = () => {
    setBucket2([...bucket2, ...bucket1]);
    setBucket1([]);
    setSelectedBucket1([]); // Clear all selections
  };

  // Move all items from Bucket 2 to Bucket 1
  const moveAllToBucket1 = () => {
    setBucket1([...bucket1, ...bucket2]);
    setBucket2([]);
    setSelectedBucket2([]); // Clear all selections
  };

  return (
    <div className="move-ui">

      <div>
                <h3>Bucket 1</h3>

      <div className="bucket">
        <ul>
          {bucket1.map((item) => (
            <li
              key={item}
              onClick={() => toggleSelectionBucket1(item)}
              className={selectedBucket1.includes(item) ? 'selected' : ''}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      </div>

      <div className="controls">
        <button onClick={moveToBucket2} disabled={!selectedBucket1.length}>Add</button>
        <button onClick={moveToBucket1} disabled={!selectedBucket2.length}>Remove</button>
        <button onClick={moveAllToBucket2} disabled={!bucket1.length}>Add All</button>
        <button onClick={moveAllToBucket1} disabled={!bucket2.length}>Remove All</button>
      </div>

      <div>
      <h3>Bucket 2</h3>

      <div className="bucket">
        <ul>
          {bucket2.map((item) => (
            <li
              key={item}
              onClick={() => toggleSelectionBucket2(item)}
              className={selectedBucket2.includes(item) ? 'selected' : ''}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default ElementTransfer;

























/* import React, { useState } from 'react';
import './ElementTransfer.css';

// Common Button Component for reusability
const Button = ({ onClick, label }) => {
  return <button onClick={onClick} className="button">{label}</button>;
};

// Main Component: ElementTransfer
const ElementTransfer = () => {
  // Initial elements in both buckets
  const [bucket1, setBucket1] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [bucket2, setBucket2] = useState([]);

  // State to track selected elements
  const [selectedBucket1, setSelectedBucket1] = useState([]);
  const [selectedBucket2, setSelectedBucket2] = useState([]);

  // Handle selection of elements in Bucket 1
  const toggleSelectionBucket1 = (item) => {
    setSelectedBucket1((prevState) =>
      prevState.includes(item)
        ? prevState.filter((i) => i !== item)
        : [...prevState, item]
    );
  };

  // Handle selection of elements in Bucket 2
  const toggleSelectionBucket2 = (item) => {
    setSelectedBucket2((prevState) =>
      prevState.includes(item)
        ? prevState.filter((i) => i !== item)
        : [...prevState, item]
    );
  };

  // Move selected elements from Bucket 1 to Bucket 2
  const moveToBucket2 = () => {
    const newBucket1 = bucket1.filter(item => !selectedBucket1.includes(item));
    const newBucket2 = [...bucket2, ...selectedBucket1];
    setBucket1(newBucket1);
    setBucket2(newBucket2);
    setSelectedBucket1([]); // Clear the selection after transfer
  };

  // Move selected elements from Bucket 2 to Bucket 1
  const moveToBucket1 = () => {
    const newBucket2 = bucket2.filter(item => !selectedBucket2.includes(item));
    const newBucket1 = [...bucket1, ...selectedBucket2];
    setBucket1(newBucket1);
    setBucket2(newBucket2);
    setSelectedBucket2([]); // Clear the selection after transfer
  };

  // Move all elements from Bucket 1 to Bucket 2
  const moveAllToBucket2 = () => {
    setBucket2([...bucket2, ...bucket1]);
    setBucket1([]);
  };

  // Move all elements from Bucket 2 to Bucket 1
  const moveAllToBucket1 = () => {
    setBucket1([...bucket1, ...bucket2]);
    setBucket2([]);
  };

  return (
    <div className="element-transfer">
      <div className="bucket-container">
        <h3>Bucket 1</h3>
        <ul>
          {bucket1.map((item) => (
            <li
              key={item}
              className={selectedBucket1.includes(item) ? 'selected' : ''}
              onClick={() => toggleSelectionBucket1(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <Button onClick={moveToBucket2} label="Move Selected to Bucket 2" />
        <Button onClick={moveAllToBucket2} label="Move All to Bucket 2" />
      </div>

      <div className="bucket-container">
        <h3>Bucket 2</h3>
        <ul>
          {bucket2.map((item) => (
            <li
              key={item}
              className={selectedBucket2.includes(item) ? 'selected' : ''}
              onClick={() => toggleSelectionBucket2(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <Button onClick={moveToBucket1} label="Move Selected to Bucket 1" />
        <Button onClick={moveAllToBucket1} label="Move All to Bucket 1" />
      </div>
    </div>
  );
};

export default ElementTransfer;
 */