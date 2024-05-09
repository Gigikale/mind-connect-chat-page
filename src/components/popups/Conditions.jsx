import * as React from "react";
import Checkbox from "../../commons/Checkbox";
import Modal from 'react-modal';
import { useState } from "react";

function Conditions({ id = '', onValueChanged, type = 'text' }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setShowModal(true); // Show the modal when clicked
  };

  const handleClose = () => {
    setShowModal(false); // Hide the modal when closed
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowModal(false); // Close the modal after selection
    onValueChanged(option); // Assuming you want to trigger the onValueChanged callback
  };

  return (
    <div>
      <input
        onClick={handleClick}
        id={id}
        type={type}
        title="Mental conditions (Optional)"
        placeholder="Please select"
        style={{ padding: '1rem' }}
        className="border bg-white-200 flex shrink-0 h-[50px] flex-col mt-1 rounded-md border-solid border-[color:var(--Gray-400,#BDBDBD)]"
        value={selectedOption || ''} // Display selected value if available
        readOnly
      />

      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
      >
        <div className="flex flex-col px-4 py-2 text-base tracking-normal leading-6 text-gray-900 bg-white rounded-2xl shadow-sm max-w-[330px]">
        <div className="flex-auto flex gap-2 justify-between">
        <Checkbox
          label={"Anxiety disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2">
        <Checkbox
          label={"Eating disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2">
        <Checkbox
          label={"Mood disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2">
        <Checkbox
          label={"Personality disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2">
        <Checkbox
          label={"Psychotic disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2 whitespace-nowrap">
        <Checkbox
          label={"Trauma and stress-related disorder"}
          value={value}
          checked={selectedOption === value}
          onValueChange={() => handleOptionChange(value)}
        />
      </div>
      <div className="flex-auto flex gap-2 justify-between mt-2">
        <Checkbox
          label={"Undiagnosed"}
          value={value}
          checked={selectedOption === value}
           onValueChange={() => handleOptionChange(value)}
         />
      </div>
      
        </div>
      </Modal>
    </div>
  );
}

export default Conditions;