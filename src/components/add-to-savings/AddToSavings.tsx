import React from "react";
import "./add-to-savings.scss";

interface AddToSavingsProps {
  handleSavingsClose: () => void;
}
const AddToSavings = ({ handleSavingsClose }: AddToSavingsProps) => {
  return (
    <div className="add-to-savings-overlay">
      <div className="add-to-savings-overlay__container"></div>
    </div>
  );
};

export default AddToSavings;
