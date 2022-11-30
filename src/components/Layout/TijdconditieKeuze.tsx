import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { keuzeActions } from "../../store/keuze-slice";

// import { TypeEindconditie } from "../HergebruikElementen/Types_Constanten_etc";

const StyledInputNumeriek = styled.input`
  width: 3rem;
  margin-left: 0.4rem;
`;

const StyledCheckBox = styled.input`
  margin: 6px 10px 5.8px 3px;
  border-radius: 2px;
  border: solid 1px #c6c4d2;
  /* width: 5%; */
  float: left;
  background: ${(props) => (props.checked ? "#482474" : "#fbfcff")};
`;

const StyledDivKolom = styled.div`
  display: flex;
  flex-direction: column;
`;

type PropsTijdconditieKeuze = {};

const TijdconditieKeuze = (props: PropsTijdconditieKeuze) => {
  const tijdConditieVanToepassing = useAppSelector(
    (state) => state.keuze.tijdconditieVanToepassing
  );
  const tijdconditieAantalMinuten = useAppSelector(
    (state) => state.keuze.tijdconditieAantalMinuten
  );
  const tijdconditieAantalSeconden = useAppSelector(
    (state) => state.keuze.tijdconditieAantalSeconden
  );

  const dispatch = useAppDispatch();
  const toggleTijdconditieVanToepassing = () => {
    dispatch(keuzeActions.toggleTijdconditieVanToepassing());
  };
  const setMinuten = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(keuzeActions.setTijdconditieAantalMinuten(event.target.value));
  };
  const setSeconden = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(keuzeActions.setTijdconditieAantalSeconden(event.target.value));
  };

  return (
    <React.Fragment>
      <h3>Tijdconditie</h3>
      <label>
        <StyledCheckBox
          type="checkbox"
          checked={tijdConditieVanToepassing}
          onChange={toggleTijdconditieVanToepassing}
        />
        Tijdconditie van toepassing
      </label>
      {tijdConditieVanToepassing && (
        <StyledDivKolom>
          <label htmlFor="tijdConditieMinuten">
            Minuten
            <StyledInputNumeriek
              id="tijdConditieMinuten"
              type="number"
              value={tijdconditieAantalMinuten}
              onChange={setMinuten}
              min={0}
              max={59}
            />
          </label>
          <label htmlFor="tijdConditieSeconden">
            Seconden
            <StyledInputNumeriek
              id="tijdConditieSeconden"
              type="number"
              value={tijdconditieAantalSeconden}
              onChange={setSeconden}
              min={0}
              max={59}
            />
          </label>
        </StyledDivKolom>
      )}
    </React.Fragment>
  );
};

export default TijdconditieKeuze;
