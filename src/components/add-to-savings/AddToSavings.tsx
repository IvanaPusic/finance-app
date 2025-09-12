import React from "react";
import "./add-to-savings.scss";
import closeBtn from "../../assets/images/close-button.png";

interface AddToSavingsProps {
  handleSavingsClose: () => void;
}
const AddToSavings = ({ handleSavingsClose }: AddToSavingsProps) => {
  return (
    <div className="add-to-savings-overlay">
      <div className="add-to-savings-overlay__container">
        <div className="add-to-savings-overlay__container-title-button">
          <h1>
            Add to <q>Savings</q>
          </h1>
          <button>
            <img src={closeBtn} alt="close-btn" />
          </button>
        </div>
        <p className="add-to-savings-overlay__container-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>
      </div>
    </div>
  );
};

export default AddToSavings;
