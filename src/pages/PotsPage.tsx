import React from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { SinglePot } from "../components";

const PotsPage: React.FC = () => {
  const { pots } = useGlobal();
  console.log(pots);

  return (
    <main className="pots-page">
      <div className="pots-page__container">
        <h1 className="pots-page__container-title">Pots</h1>
        <button className="pots-page__container-btn">+ Add New Pot</button>
      </div>
      <div className="pots-page__info">
        {pots.map((pot) => {
          return <SinglePot key={pot.name} pot={pot} />;
        })}
      </div>
    </main>
  );
};

export default PotsPage;
