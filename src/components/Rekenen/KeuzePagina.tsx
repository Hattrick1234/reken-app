import React, { useEffect, useState } from "react";
import ListItem from "../Layout/ListItem";
import Modal from "../UI/Modal";
import styled from "styled-components";
import {
  TypeEindconditie,
  TypeOperator,
  TypeTelParameter,
} from "../HergebruikElementen/Types_Constanten_etc";
import EindconditieKeuze from "../Layout/EindconditieKeuze";
import TijdconditieKeuze from "../Layout/TijdconditieKeuze";
import { useAppDispatch } from "../../store/hooks";
import { uiActions } from "../../store/ui-slice";

const StyledContainerMetOpties = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledKolomMetOpties = styled.div`
  margin-right: 1rem;
`;

type PropsKeuzePagina = {
  initialValues: string[];
  eindconditie: TypeEindconditie;
  eindconditieParameter: number;
  operator: TypeOperator;
  telParameter: TypeTelParameter;
  onClose: () => void;
  passData: (
    gekozenGetallen: string[],
    eindconditie: TypeEindconditie,
    eindconditieParameter: number,
    operator: TypeOperator,
    telParameter: TypeTelParameter,
    keuzePaginaVolledigIngevuld: boolean
  ) => void;
};

const KeuzePagina = (props: PropsKeuzePagina) => {
  const [eindconditie, setEindconditie] = React.useState(props.eindconditie);
  const [eindconditieParameter, setEindconditieParameter] = React.useState(
    props.eindconditieParameter
  );
  const [operator, setOperator] = React.useState(props.operator);
  const [telParameter, setTelParameter] = React.useState(props.telParameter);
  const [keuzePaginaVolledigIngevuld, setKeuzePaginaVolledigIngevuld] =
    useState(false);
  const [gekozenTafels, setGekozenTafels] = React.useState<{
    selections: string[];
  }>({
    selections: props.initialValues,
  });
  const tafelOpties = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "15",
    "25",
  ];
  const dispatch = useAppDispatch();

  const checkboxItemsTafels = () => {
    return (
      <React.Fragment>
        {tafelOpties.map((option, index) => (
          <ListItem
            autoFocus={index === 0 ? true : false}
            key={option}
            text={option}
            handleOnChange={() => handleCheckboxChange(option)}
            selected={gekozenTafels.selections.includes(option)}
          ></ListItem>
        ))}
      </React.Fragment>
    );
  };

  const keuzesBijOptellenEnAftrekken = () => {
    return (
      <React.Fragment>
        <div>
          <input
            type="radio"
            value={TypeTelParameter.EENHEDEN}
            checked={telParameter === TypeTelParameter.EENHEDEN}
            onChange={handleTelParameterChange}
          />
          {TypeTelParameter.EENHEDEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeTelParameter.TIENTALLEN}
            checked={telParameter === TypeTelParameter.TIENTALLEN}
            onChange={handleTelParameterChange}
          />
          {TypeTelParameter.TIENTALLEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeTelParameter.HONDERDTALLEN}
            checked={telParameter === TypeTelParameter.HONDERDTALLEN}
            onChange={handleTelParameterChange}
          />
          {TypeTelParameter.HONDERDTALLEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeTelParameter.DUIZENDTALLEN}
            checked={telParameter === TypeTelParameter.DUIZENDTALLEN}
            onChange={handleTelParameterChange}
          />
          {TypeTelParameter.DUIZENDTALLEN}
        </div>
      </React.Fragment>
    );
  };

  const handleCheckboxChange = (key: string) => {
    let sel = gekozenTafels.selections;
    let find = sel.indexOf(key); //zoek of deze key al in vinkjesarray voorkomt
    if (find > -1) {
      //gevonden dan verwijderen om uit te vinken
      sel.splice(find, 1);
    } else {
      //niet gevonden dan toevoegen aan array van selected items
      sel.push(key);
    }

    setGekozenTafels({
      selections: sel,
    });
  };

  const keuzeOperatorSchermItems = () => {
    return (
      <React.Fragment>
        <h3>Soort som</h3>
        <div>
          <input
            type="radio"
            value={TypeOperator.VERMENIGVULDIGING}
            checked={operator === TypeOperator.VERMENIGVULDIGING}
            onChange={handleOperatorChange}
          />
          {TypeOperator.VERMENIGVULDIGING}
        </div>
        <div>
          <input
            type="radio"
            value={TypeOperator.DELEN}
            checked={operator === TypeOperator.DELEN}
            onChange={handleOperatorChange}
          />
          {TypeOperator.DELEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeOperator.OPTELLEN}
            checked={operator === TypeOperator.OPTELLEN}
            onChange={handleOperatorChange}
          />
          {TypeOperator.OPTELLEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeOperator.AFTREKKEN}
            checked={operator === TypeOperator.AFTREKKEN}
            onChange={handleOperatorChange}
          />
          {TypeOperator.AFTREKKEN}
        </div>
        <div>
          <input
            type="radio"
            value={TypeOperator.MEETEENHEDEN_OMREKENEN}
            checked={operator === TypeOperator.MEETEENHEDEN_OMREKENEN}
            onChange={handleOperatorChange}
          />
          {TypeOperator.MEETEENHEDEN_OMREKENEN}
        </div>
      </React.Fragment>
    );
  };

  const handleOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let gekozenOperator = event.target.value as TypeOperator;

    if (Object.values(TypeOperator).includes(gekozenOperator)) {
      setOperator(gekozenOperator);
    }
  };

  const handleTelParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let gekozenTelParameter = event.target.value as TypeTelParameter;

    if (Object.values(TypeTelParameter).includes(gekozenTelParameter)) {
      setTelParameter(gekozenTelParameter);
    }
  };

  const handleEindconditieChange = (gekozenEindconditie: TypeEindconditie) => {
    setEindconditie(gekozenEindconditie);
  };

  const handleEindconditieParameterChange = (
    gekozenEindconditieParameter: number
  ) => {
    setEindconditieParameter(gekozenEindconditieParameter);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    //const onSubmitHandler = () => {
    event.preventDefault();

    props.passData(
      gekozenTafels.selections,
      eindconditie,
      eindconditieParameter,
      operator,
      telParameter,
      keuzePaginaVolledigIngevuld
    );
    props.onClose();
  };

  useEffect(() => {
    if (
      operator === TypeOperator.DELEN ||
      operator === TypeOperator.VERMENIGVULDIGING
    ) {
      setKeuzePaginaVolledigIngevuld(gekozenTafels.selections.length >= 1);
    } else if (
      operator === TypeOperator.OPTELLEN ||
      operator === TypeOperator.AFTREKKEN
    ) {
      setKeuzePaginaVolledigIngevuld(
        Object.values(TypeTelParameter).includes(telParameter)
      );
    } else if (operator === TypeOperator.MEETEENHEDEN_OMREKENEN) {
      //Bij meeteenheden moet je niet de onder elkaar optie tonen, ook niet als die daar al op stond van een vorige andere operator
      dispatch(uiActions.zetWeergaveOnderElkaar(false));
      setKeuzePaginaVolledigIngevuld(true);
    }
  }, [operator, gekozenTafels, telParameter, dispatch]);

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={onSubmitHandler}>
        {/* <form> */}
        <StyledContainerMetOpties>
          <StyledKolomMetOpties>
            {keuzeOperatorSchermItems()}
            <EindconditieKeuze
              eindconditie={eindconditie}
              eindconditieParameter={eindconditieParameter}
              onEindconditieChange={handleEindconditieChange}
              onEindconditieParameterChange={handleEindconditieParameterChange}
            />
            <TijdconditieKeuze />
          </StyledKolomMetOpties>
          {(operator === TypeOperator.VERMENIGVULDIGING ||
            operator === TypeOperator.DELEN) && (
            <StyledKolomMetOpties>
              <h3>Kies de tafels</h3>
              {checkboxItemsTafels()}
            </StyledKolomMetOpties>
          )}
          {(operator === TypeOperator.AFTREKKEN ||
            operator === TypeOperator.OPTELLEN) && (
            <StyledKolomMetOpties>
              <h3>Optellen/Aftrekken met</h3>
              {keuzesBijOptellenEnAftrekken()}
            </StyledKolomMetOpties>
          )}
        </StyledContainerMetOpties>
        <button onClick={props.onClose}>Sluiten</button>
        <button
          disabled={!keuzePaginaVolledigIngevuld}
          //onClick={onSubmitHandler}
          type="submit"
        >
          Ok
        </button>
      </form>
    </Modal>
  );
};

export default KeuzePagina;
