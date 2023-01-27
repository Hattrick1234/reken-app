import React, { Fragment, useEffect, useState, KeyboardEvent } from "react";
import styled from "styled-components";
import Plaatje from "../Layout/Plaatje";
import {
  TypePlaatje,
  TypeOperator,
  TypeMeeteenheid,
  MeeteenheidVolgordeArray,
} from "../HergebruikElementen/Types_Constanten_etc";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { uiActions } from "../../store/ui-slice";
import RekensomVerticaalWeergave from "../Layout/RekensomVerticaalWeergave";
import verplaatsKommaInGetal from "./RekenHulpFuncties";

type PropsBerekening = {
  getalUitGekozenTafels: number;
  getalOmMeeTeDelenOfVermenigvuldigen: number;
  hoogstePlusMinKeerGetal: number;
  laagstePlusMinKeerGetal: number;
  getalVoorOmrekenen: number;
  meeteenheidVanaf: TypeMeeteenheid;
  meeteenheidNaartoe: TypeMeeteenheid;
  operator: TypeOperator;
  onNaarVolgendeVraag: (vraagWasGoed: boolean) => void;
};

const StyledDivAlsGoedAntwoord = styled.div`
  color: green;
`;

const StyledDivAlsFoutAntwoord = styled.div`
  color: red;
`;

const StyledInputAntwoord = styled.input`
  width: 5rem;
  text-align: right;
`;

const Berekening = (props: PropsBerekening) => {
  const [antwoordIsGoed, setantwoordIsGoed] = useState(false);
  const [toonCheckKnop, setToonCheckKnop] = useState(true);
  const [toonNextKnop, setToonNextKnop] = useState(false);
  const [invoerRechtsNaarLinks, setInvoerRechtsNaarLinks] = useState(false);
  const [berekendeAntwoord, setBerekendeAntwoord] = useState(0);
  const antwoordInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const checkButtonRef =
    React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  const nextButtonRef =
    React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const toonSomOnderElkaar = useAppSelector(
    (state) => state.ui.toonSomOnderElkaar
  );
  const [tellerAlsDieOphoogtDanResetten, setTellerAlsDieOphoogtDanResetten] =
    useState(0);

  //uitrekenen wat het goede antwoord is zodat je daarna kan checken of dat goed is ingevuld
  useEffect(() => {
    switch (props.operator) {
      case TypeOperator.TAFELS:
        setBerekendeAntwoord(
          props.getalOmMeeTeDelenOfVermenigvuldigen *
            props.getalUitGekozenTafels
        );
        break;
      case TypeOperator.VERMENIGVULDIGEN:
        setBerekendeAntwoord(
          props.hoogstePlusMinKeerGetal * props.laagstePlusMinKeerGetal
        );
        break;
      case TypeOperator.DELEN:
        setBerekendeAntwoord(
          (props.getalOmMeeTeDelenOfVermenigvuldigen *
            props.getalUitGekozenTafels) /
            props.getalUitGekozenTafels
        );
        break;
      case TypeOperator.OPTELLEN:
        setBerekendeAntwoord(
          props.hoogstePlusMinKeerGetal + props.laagstePlusMinKeerGetal
        );
        break;
      case TypeOperator.AFTREKKEN:
        setBerekendeAntwoord(
          props.hoogstePlusMinKeerGetal - props.laagstePlusMinKeerGetal
        );
        break;
      case TypeOperator.MEETEENHEDEN_OMREKENEN:
        {
          const positieverschil =
            MeeteenheidVolgordeArray.indexOf(props.meeteenheidNaartoe) -
            MeeteenheidVolgordeArray.indexOf(props.meeteenheidVanaf);

          setBerekendeAntwoord(
            verplaatsKommaInGetal(props.getalVoorOmrekenen, positieverschil)
          );
        }
        break;
    }
  }, [
    props.getalOmMeeTeDelenOfVermenigvuldigen,
    props.getalUitGekozenTafels,
    props.operator,
    props.hoogstePlusMinKeerGetal,
    props.laagstePlusMinKeerGetal,
    props.getalVoorOmrekenen,
    props.meeteenheidVanaf,
    props.meeteenheidNaartoe,
  ]);

  const answerInputHandler = () => {
    if (toonNextKnop) {
      antwoordInputRef.current.value = "";
      props.onNaarVolgendeVraag(antwoordIsGoed);
      setToonCheckKnop(true);
      setToonNextKnop(false);
      setTellerAlsDieOphoogtDanResetten((huidig) => huidig + 1);
    } else if (toonCheckKnop) {
      if (antwoordInputRef.current.value === "") {
        setantwoordIsGoed(false);
        return;
      } else {
        setantwoordIsGoed(
          parseFloat(antwoordInputRef.current.value) === berekendeAntwoord
        );
      }
      setToonCheckKnop(false);
      setToonNextKnop(true);
    }
  };

  const toggleTekstInvoerRichtingHandler = () => {
    setInvoerRechtsNaarLinks((invoerRechtsNaarLinks) => !invoerRechtsNaarLinks);
  };

  const rekenSomInTekstVormHorizontaal = () => {
    let rekensomInTekst = "";
    switch (props.operator) {
      case TypeOperator.TAFELS:
        rekensomInTekst = `${props.getalOmMeeTeDelenOfVermenigvuldigen} x ${props.getalUitGekozenTafels} =`;
        break;
      case TypeOperator.VERMENIGVULDIGEN:
        rekensomInTekst = `${props.laagstePlusMinKeerGetal} x ${props.hoogstePlusMinKeerGetal} =`;
        break;
      case TypeOperator.DELEN:
        rekensomInTekst = `${
          props.getalOmMeeTeDelenOfVermenigvuldigen *
          props.getalUitGekozenTafels
        } : ${props.getalUitGekozenTafels} =`;
        break;
      case TypeOperator.OPTELLEN:
        rekensomInTekst = `${props.hoogstePlusMinKeerGetal} + ${props.laagstePlusMinKeerGetal} =`;
        break;
      case TypeOperator.AFTREKKEN:
        rekensomInTekst = `${props.hoogstePlusMinKeerGetal} - ${props.laagstePlusMinKeerGetal} =`;
        break;
      case TypeOperator.MEETEENHEDEN_OMREKENEN:
        rekensomInTekst = `${props.getalVoorOmrekenen.toLocaleString()} ${
          props.meeteenheidVanaf
        } is in ${props.meeteenheidNaartoe}`;
        break;
    }
    return rekensomInTekst;
  };

  const rekenSomHorizontaal = () => {
    return (
      <React.Fragment>
        <label htmlFor="berekening">{rekenSomInTekstVormHorizontaal()}</label>
        &nbsp;
      </React.Fragment>
    );
  };

  const dispatch = useAppDispatch();
  const toggleWeergaveHandler = () => {
    dispatch(uiActions.wisselWeergaveOnderOfNaastElkaar());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      answerInputHandler();
    } else if (invoerRechtsNaarLinks) {
      antwoordInputRef.current.setSelectionRange(0, 0);
      antwoordInputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <h4>Vul het antwoord in</h4>
      <div>
        {toonSomOnderElkaar && (
          <RekensomVerticaalWeergave
            getalUitGekozenTafels={props.getalUitGekozenTafels}
            getalOmMeeTeDelenOfVermenigvuldigen={
              props.getalOmMeeTeDelenOfVermenigvuldigen
            }
            hoogstePlusMinKeerGetal={props.hoogstePlusMinKeerGetal}
            laagstePlusMinKeerGetal={props.laagstePlusMinKeerGetal}
            getalVoorOmrekenen={props.getalVoorOmrekenen}
            meeteenheidVanaf={props.meeteenheidVanaf}
            meeteenheidNaartoe={props.meeteenheidNaartoe}
            operator={props.operator}
            tellerAlsDieOphoogtDanResetten={tellerAlsDieOphoogtDanResetten}
          />
        )}
        {!toonSomOnderElkaar && rekenSomHorizontaal()}
        <StyledInputAntwoord
          autoFocus
          id="berekening"
          type="text"
          readOnly={toonNextKnop}
          ref={antwoordInputRef}
          onKeyDown={handleKeyDown}
        ></StyledInputAntwoord>

        <br></br>
        {toonCheckKnop && (
          <button
            type="submit"
            id="check"
            ref={checkButtonRef}
            onClick={answerInputHandler}
          >
            Check antwoord
          </button>
        )}
        {toonNextKnop && (
          <button
            type="submit"
            id="next"
            ref={nextButtonRef}
            onClick={answerInputHandler}
          >
            Volgende vraag
          </button>
        )}
        <br />
        <br />
        {props.operator !== TypeOperator.MEETEENHEDEN_OMREKENEN && (
          <button
            type="button"
            id="bovenOfOnder"
            onClick={() => toggleWeergaveHandler()}
          >
            Toon {toonSomOnderElkaar ? "naast elkaar" : "onder elkaar"}
          </button>
        )}
        <button
          type="button"
          id="textrichting"
          onClick={toggleTekstInvoerRichtingHandler}
        >
          Van{" "}
          {invoerRechtsNaarLinks ? "links naar rechts" : " rechts naar links"}{" "}
          schrijven
        </button>
      </div>
      <br />
      {toonNextKnop && antwoordIsGoed && (
        <Fragment>
          <StyledDivAlsGoedAntwoord>
            Dat is juist {berekendeAntwoord}
          </StyledDivAlsGoedAntwoord>
          <Plaatje typePlaatje={TypePlaatje.GOED} />
        </Fragment>
      )}
      {toonNextKnop && !antwoordIsGoed && (
        <Fragment>
          <StyledDivAlsFoutAntwoord>
            Helaas, het juiste antwoord is: {berekendeAntwoord}
          </StyledDivAlsFoutAntwoord>
          <Plaatje typePlaatje={TypePlaatje.FOUT} />
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default Berekening;
