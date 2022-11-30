// import styled from 'styled-components';

import React, { useState } from "react";
import Berekeningen from "./Berekeningen";
import KeuzePagina from "./KeuzePagina";
import {
  TypeEindconditie,
  TypeOperator,
  TypeTelParameter,
} from "../HergebruikElementen/Types_Constanten_etc";

const HoofdPagina = () => {
  const [keuzeTafelsIsShown, setKeuzeTafelsIsShown] = useState(false);
  const [keuzeStartenIsShown, setKeuzeStartenIsShown] = useState(false);
  const [rekenOefeningIsShown, setRekenOefeningIsShown] = useState(false);
  const [gekozenTafels, setGekozenTafels] = useState<string[]>([]);
  const [eindconditie, setEindconditie] = React.useState(
    TypeEindconditie.ONBEPERKT
  );
  const [eindconditieParameter, setEindconditieParameter] = React.useState(10);
  const [operator, setOperator] = React.useState(
    TypeOperator.VERMENIGVULDIGING
  );
  const [telParameter, setTelParameter] = React.useState(
    TypeTelParameter.TIENTALLEN
  );

  const passData = (
    gekozenGetallen: string[],
    eindconditie: TypeEindconditie,
    eindconditieParameter: number,
    operator: TypeOperator,
    telParameter: TypeTelParameter,
    keuzePaginaVolledigIngevuld: boolean
  ) => {
    setGekozenTafels(gekozenGetallen);
    setKeuzeStartenIsShown(keuzePaginaVolledigIngevuld);
    setEindconditie(eindconditie);
    setEindconditieParameter(eindconditieParameter);
    setOperator(operator);
    setTelParameter(telParameter);
  };

  const showKeuzePagina = () => {
    setKeuzeTafelsIsShown(true);
  };

  const handleKeuzePaginaGesloten = () => {
    setKeuzeTafelsIsShown(false);
    showRekenOefening();
  };

  const showRekenOefening = () => {
    setRekenOefeningIsShown(true);
  };

  const handleBerekeningenGesloten = () => {
    setRekenOefeningIsShown(false);
    showKeuzePagina();
  };

  return (
    <React.Fragment>
      <h2>{operator}</h2>
      {!rekenOefeningIsShown && (
        <button onClick={showKeuzePagina}>Kies wat je wilt doen</button>
      )}
      {keuzeStartenIsShown && !rekenOefeningIsShown && (
        <button onClick={showRekenOefening}>Start</button>
      )}
      {keuzeTafelsIsShown && (
        <KeuzePagina
          initialValues={gekozenTafels}
          eindconditie={eindconditie}
          eindconditieParameter={eindconditieParameter}
          operator={operator}
          onClose={handleKeuzePaginaGesloten}
          passData={passData}
          telParameter={telParameter}
        />
      )}
      {operator === TypeOperator.DELEN ||
        (operator === TypeOperator.VERMENIGVULDIGING && (
          <p>Gekozen tafels: {gekozenTafels.toString()}</p>
        ))}
      <hr></hr>
      {rekenOefeningIsShown && (
        <Berekeningen
          gekozenTafels={gekozenTafels}
          eindConditie={eindconditie}
          eindConditieParameter={eindconditieParameter}
          operator={operator}
          telParameter={telParameter}
          onClose={handleBerekeningenGesloten}
        />
      )}
    </React.Fragment>
  );
};

export default HoofdPagina;
