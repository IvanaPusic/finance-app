import React, { useState } from "react";
import "./add-new-pot-modal.scss";
import type { Pot } from "../../types";
import closeBtn from "../../assets/images/close-button.png";
import { useAuth } from "../../contexts/AuthContext";
import { addPot } from "../../firebase/dataManipulation";

interface AddNewPotProps {
  handleCloseModal: () => void;
  pots: Pot[];
}

const AddNewPotModal = ({ handleCloseModal }: AddNewPotProps) => {
  const { currentUid } = useAuth();

  const [potData, setPotData] = useState<Pot>({
    name: "",
    target: 0,
    theme: "",
    total: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPotData({
      ...potData,
      [name]: name === "target" ? +value : value,
    });
  };

  const handleAddPot = async (e: React.FormEvent) => {
    e.preventDefault();
    addPot(currentUid, potData);
    handleCloseModal();
  };

  return (
    <div className="new-pot-overlay">
      <div className="new-pot-overlay__container">
        <div className="new-pot-overlay__container-title-button">
          <h1 className="new-pot-overlay__container-title">Add new pot</h1>
          <button
            className="new-pot-overlay__container-close-btn"
            onClick={handleCloseModal}
          >
            <img src={closeBtn} alt="close-button" />
          </button>
        </div>
        <p className="new-pot-overlay__container-info">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases
        </p>
        <form
          className="new-pot-overlay__container-form"
          onSubmit={handleAddPot}
        >
          <div className="new-pot-overlay__container-form-input">
            <label htmlFor="name">Pot name</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={30}
              placeholder="e.g. Rainy Days"
              onChange={handleChange}
            />
          </div>
          <div className="new-pot-overlay__container-form-input">
            <label htmlFor="target">Target</label>
            <input
              type="text"
              id="target"
              name="target"
              placeholder="$ e.g. 2000"
              onChange={handleChange}
            />
          </div>
          <div className="new-pot-overlay__container-form-input">
            <label htmlFor="theme">Theme</label>
            <select name="theme" id="theme" onChange={handleChange}>
              <option value="#277C78">Green</option>
              <option value="#82C9D7">Cyan</option>
              <option value="#F2CDAC">Yellow</option>
              <option value="#626070">Navy</option>
              <option value="#C94736">Red</option>
              <option value="#826CB0">Purple</option>
            </select>
          </div>
          <button className="new-pot-overlay__container-form-btn" type="submit">
            Add Pot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPotModal;
