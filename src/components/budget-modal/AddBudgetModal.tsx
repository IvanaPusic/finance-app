import { addBudget } from "../../firebase/dataManipulation";
import type { Budget } from "../../types";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import x from "../../assets/svgs/x.svg";
import "./add-budget-modal.scss";

interface AddBudgetModalProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const AddBudgetModal = ({ setIsModalVisible }: AddBudgetModalProps) => {
  const { currentUid } = useAuth();

  const [formData, setFormData] = useState<Budget>({
    category: "",
    maximum: 0,
    theme: "#277C78",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maximum" ? parseFloat(value) : value,
    }));
    console.log("hadnleChange:", formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsModalVisible(false);
    addBudget(currentUid, formData);
    console.log("handleSubmit", formData);
  };
  return (
    <div
      className="add-budget-modal__overlay"
      onClick={() => {
        setIsModalVisible(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="add-budget-modal">
        <div className="add-budget-modal__new-budget-title-container">
          <h3 className="add-budget-modal__new-budget-title">New Budget</h3>
          <button
            onClick={() => {
              setIsModalVisible(false);
            }}
            className="add-budget-modal__close-modal"
          >
            <img src={x} alt="" />
          </button>
        </div>
        <form
          className="add-budget-modal__new-budget-form"
          onSubmit={handleSubmit}
          action=""
        >
          <label htmlFor="category">Category</label>
          <input
            required
            className="add-budget-modal__new-budget-input"
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
          />

          <label htmlFor="amount">Maximum ($)</label>
          <input
            required
            className="add-budget-modal__new-budget-input"
            type="number"
            name="maximum"
            id="maximum"
            onChange={handleChange}
          />

          <label htmlFor="theme">Theme</label>
          <select
            className="add-budget-modal__dropdown"
            onChange={handleChange}
            name="theme"
            id="theme"
          >
            <option value="#277C78">Green</option>
            <option value="#82C9D7">Cyan</option>
            <option value="#F2CDAC">Yellow</option>
            <option value="#626070">Navy</option>
            <option value="#C94736">Red</option>
            <option value="#826CB0">Purple</option>
          </select>
          <button className="add-budget-modal__new-budget-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
