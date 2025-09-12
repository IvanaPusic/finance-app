import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import avatarPlaceholder from "../../../public/avatars/user.png";
import type { Transaction } from "../../types";
import { addTransaction } from "../../firebase/dataManipulation";
import { useAuth } from "../../contexts/AuthContext";
import closeBtn from "../../assets/images/close-button.png";
import "./transaction-modal.scss";

interface TransactionModalProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const TransactionModal = ({ setIsModalVisible }: TransactionModalProps) => {
  const { currentUid } = useAuth();

  const [formData, setFormData] = useState<Transaction>({
    avatar: avatarPlaceholder,
    name: "",
    date: Timestamp.now(),
    category: "general",
    amount: 0,
    recurring: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const date = new Date(value);
    const firebaseTimestamp = Timestamp.fromDate(date);
    setFormData((prev) => ({
      ...prev,
      [name]: firebaseTimestamp,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsModalVisible(false);
    addTransaction(currentUid, formData);
  };

  return (
    <div className="modal__overlay" onClick={() => setIsModalVisible(false)}>
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        <div className="modal__header">
          <h3 className="modal__header-title">New Transaction</h3>
          <button
            onClick={() => setIsModalVisible(false)}
            className="modal__header-close-btn"
          >
            <img src={closeBtn} alt="Close modal" />
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="recipient-name" className="modal__form-label">
            Recipient name
          </label>
          <input
            required
            className="modal__input"
            type="text"
            name="name"
            id="recipient-name"
            onChange={handleChange}
          />

          <label htmlFor="category" className="modal__form-label">
            Category
          </label>
          <input
            required
            className="modal__input"
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
          />

          <label htmlFor="date" className="modal__form-label">
            Date
          </label>
          <input
            className="modal__input modal__input--date"
            type="date"
            name="date"
            id="date"
            onChange={handleDateChange}
          />

          <label htmlFor="amount" className="modal__form-label">
            Amount
          </label>
          <input
            required
            className="modal__input"
            type="number"
            name="amount"
            id="amount"
            onChange={handleChange}
          />

          <button className="modal__submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
