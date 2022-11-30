import React from "react";
import styled from "styled-components";
import { TypeEindconditie } from "../HergebruikElementen/Types_Constanten_etc";

const StyledInputNumeriek = styled.input`
  width: 3rem;
`;

type PropsEindconditieKeuze = {
  eindconditie: TypeEindconditie;
  eindconditieParameter: number;
  onEindconditieChange: (gekozenEindconditie: TypeEindconditie) => void;
  onEindconditieParameterChange: (eindconditieParameter: number) => void;
};

const EindconditieKeuze = (props: PropsEindconditieKeuze) => {
  const [eindconditie, setEindconditie] = React.useState(
    //TypeEindconditie.ONBEPERKT
    props.eindconditie
  );
  const [eindconditieParameter, setEindconditieParameter] = React.useState(
    props.eindconditieParameter
  );

  const handleRadioButtonEindconditieChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let gekozenEindconditie = TypeEindconditie.ONBEPERKT;
    switch (event.target.value) {
      case TypeEindconditie.AANTALGOED:
        gekozenEindconditie = TypeEindconditie.AANTALGOED;
        break;
      case TypeEindconditie.AANTALVRAGEN:
        gekozenEindconditie = TypeEindconditie.AANTALVRAGEN;
        break;
    }
    setEindconditie(gekozenEindconditie);

    props.onEindconditieChange(gekozenEindconditie); //let op gebruik niet de state eindconditie anders houdt hij de vorige waarde bij
  };

  const handleInputNumberEindconditieParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let gekozenEindConditieParameter = 0;
    if (event.target.value !== "") {
      gekozenEindConditieParameter = parseInt(event.target.value);
    }

    setEindconditieParameter(gekozenEindConditieParameter);
    props.onEindconditieParameterChange(gekozenEindConditieParameter); //let op gebruik niet de state eindconditieParameter anders houdt hij de vorige waarde bij
  };

  return (
    <React.Fragment>
      <h3>Eindconditie</h3>
      <div>
        <input
          type="radio"
          value={TypeEindconditie.ONBEPERKT}
          checked={eindconditie === TypeEindconditie.ONBEPERKT}
          onChange={handleRadioButtonEindconditieChange}
        />
        {TypeEindconditie.ONBEPERKT}
      </div>
      <div>
        <input
          type="radio"
          value={TypeEindconditie.AANTALVRAGEN}
          checked={eindconditie === TypeEindconditie.AANTALVRAGEN}
          onChange={handleRadioButtonEindconditieChange}
        />
        {TypeEindconditie.AANTALVRAGEN}
      </div>
      <div>
        <input
          type="radio"
          value={TypeEindconditie.AANTALGOED}
          checked={eindconditie === TypeEindconditie.AANTALGOED}
          onChange={handleRadioButtonEindconditieChange}
        />
        {TypeEindconditie.AANTALGOED}
      </div>
      <br></br>
      {eindconditie !== TypeEindconditie.ONBEPERKT && (
        <div>
          <label htmlFor="eindconditieParameter">T/m</label>
          &nbsp;
          <StyledInputNumeriek
            id="eindconditieParameter"
            type="number"
            value={eindconditieParameter}
            onChange={handleInputNumberEindconditieParameterChange}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default EindconditieKeuze;
