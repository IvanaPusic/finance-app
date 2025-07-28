import React from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { SinglePot } from "../components";
import AddNewPotModal from "../components/add-new-pot-modal/AddNewPotModal";
import AddToSavings from "../components/add-to-savings/AddToSavings";

const PotsPage: React.FC = () => {
  const {
    pots,
    isNewPotModalOpen,
    setIsNewPotModalOpen,
    isAddToSavingsOpen,
    setIsAddToSavingsOpen,
  } = useGlobal();
  console.log(pots);

  const handleOpenModal = () => {
    setIsNewPotModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewPotModalOpen(false);
  };

  const handleSavingsOpen = () => {
    setIsAddToSavingsOpen(true);
  };

  const handleSavingsClose = () => {
    setIsAddToSavingsOpen(false);
  };
  return (
    <main className="pots-page">
      {isNewPotModalOpen && (
        <AddNewPotModal handleCloseModal={handleCloseModal} pots={pots} />
      )}
      {isAddToSavingsOpen && (
        <AddToSavings handleSavingsClose={handleSavingsClose} />
      )}
      <div className="pots-page__container">
        <h1 className="pots-page__container-title">Pots</h1>
        <button className="pots-page__container-btn" onClick={handleOpenModal}>
          + Add New Pot
        </button>
      </div>
      <div className="pots-page__info">
        {pots.map((pot) => {
          return <SinglePot key={pot.name} pot={pot} han />;
        })}
      </div>
    </main>
  );
};

export default PotsPage;
