import { useAppSelector } from "../../store/hooks";
import { Fragment, useEffect, useState } from "react";
import Berekening from "./Berekening";
import {
  TypeEindconditie,
  TypeOperator,
  TypePlaatje,
  TypeTelParameter,
  TypeMeeteenheid,
  MeeteenheidVolgordeArray,
} from "../HergebruikElementen/Types_Constanten_etc";
import Plaatje from "../Layout/Plaatje";
import Timer from "../UI/Timer";

type PropsBerekeningen = {
  gekozenTafels: string[];
  eindConditie: TypeEindconditie;
  eindConditieParameter: number;
  operator: TypeOperator;
  telParameter: TypeTelParameter;
  onClose: () => void;
};

const Berekeningen = (props: PropsBerekeningen) => {
  const [aantalVragenBeantwoord, setAantalvragenBeantwoord] = useState(0);
  const [aantalVragenGoedBeantwoord, setAantalvragenGoedBeantwoord] =
    useState(0);
  const [aantalVragenNogTeDoen, setaantalVragenNogTeDoen] = useState(
    props.eindConditieParameter
  );
  const [aantalVragenGoedNogTeDoen, setaantalVragenGoedNogTeDoen] = useState(
    props.eindConditieParameter
  );
  const [percentageDoelBereikt, setPercentageDoelBereikt] = useState(0);
  const [cijfer, setCijfer] = useState(0);
  const [eindconditieBereikt, setEindconditieBereikt] = useState(false);
  const [tijdIsVerstreken, setTijdIsVerstreken] = useState(false);
  const tijdConditieVanToepassing = useAppSelector(
    (state) => state.keuze.tijdconditieVanToepassing
  );
  const tijdconditieAantalMinuten = useAppSelector(
    (state) => state.keuze.tijdconditieAantalMinuten
  );
  const tijdconditieAantalSeconden = useAppSelector(
    (state) => state.keuze.tijdconditieAantalSeconden
  );
  const waardenOmMeeTeRekenen = [
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
  ];
  const randomGetalUitGekozenTafels =
    props.gekozenTafels[Math.floor(Math.random() * props.gekozenTafels.length)];
  const randomGetalOmMeeTeRekenen =
    waardenOmMeeTeRekenen[
      Math.floor(Math.random() * waardenOmMeeTeRekenen.length)
    ];
  const randomMeetEenheidVanaf =
    MeeteenheidVolgordeArray[
      Math.floor(Math.random() * MeeteenheidVolgordeArray.length)
    ];

  const volgendeVraagHandler = (vraagWasGoed: boolean) => {
    setAantalvragenBeantwoord(
      (prevAantalvragenBeantwoord) => prevAantalvragenBeantwoord + 1
    );
    if (vraagWasGoed) {
      setAantalvragenGoedBeantwoord(
        (prevAantalVragenGoedBeantwoord) => prevAantalVragenGoedBeantwoord + 1
      );
    }
    //let op je on hier niet direct de eindconditiebereikt bepalen als je die baseert
    //op de states die zojuist gewijzigd zijn omdat die via batch worden bijgewerkt
    //daarom eruit gehaald en naar useEffect verplaatst die altijd gebeurt zodra
    //de states of props in de dependencies wijzigen
  };

  //Hoogste en laagste plus/min getal afleiden
  const berekenPlusMinWaarde = () => {
    switch (props.telParameter) {
      case TypeTelParameter.EENHEDEN:
        return Math.floor(Math.random() * 10);
      case TypeTelParameter.TIENTALLEN:
        return Math.floor(Math.random() * 100);
      case TypeTelParameter.HONDERDTALLEN:
        return Math.floor(Math.random() * 1000);
      case TypeTelParameter.DUIZENDTALLEN:
        return Math.floor(Math.random() * 10000);
      default:
        return 0;
    }
  };

  const plusMinGetal1 = berekenPlusMinWaarde();
  const plusMinGetal2 = berekenPlusMinWaarde();
  let hoogstePlusMinGetal = 0;
  let laagstePlusMinGetal = 0;
  if (plusMinGetal1 > plusMinGetal2) {
    hoogstePlusMinGetal = plusMinGetal1;
    laagstePlusMinGetal = plusMinGetal2;
  } else {
    hoogstePlusMinGetal = plusMinGetal2;
    laagstePlusMinGetal = plusMinGetal1;
  }

  const alsTimerIsAfgelopen = () => {
    //als eindconditie al bereikt is staat er al een plaatje doel behaald
    //dan niet setTijdIsVerstreken op true zetten omdat deze stateverandering dan weer een nieuw plaatje van doel bereikt gaat inladen wat niet gewenst is
    if (!eindconditieBereikt) {
      setTijdIsVerstreken(true);
    }
  };

  //Eindconditie afleiden
  useEffect(() => {
    switch (props.eindConditie) {
      case TypeEindconditie.AANTALGOED:
        setaantalVragenGoedNogTeDoen(
          props.eindConditieParameter - aantalVragenGoedBeantwoord
        );
        let cijferOnafgerond =
          (aantalVragenGoedBeantwoord /
            (aantalVragenGoedBeantwoord + aantalVragenGoedNogTeDoen)) *
          100;
        setPercentageDoelBereikt(Math.round(cijferOnafgerond * 10) / 10);

        if (aantalVragenGoedBeantwoord >= props.eindConditieParameter) {
          setEindconditieBereikt(true);
        }
        break;
      case TypeEindconditie.AANTALVRAGEN:
        setaantalVragenNogTeDoen(
          props.eindConditieParameter - aantalVragenBeantwoord
        );
        setPercentageDoelBereikt(0);
        if (aantalVragenBeantwoord >= props.eindConditieParameter) {
          setEindconditieBereikt(true);
        }
        break;
    }
  }, [
    props.eindConditie,
    props.eindConditieParameter,
    aantalVragenBeantwoord,
    aantalVragenGoedBeantwoord,
    aantalVragenGoedNogTeDoen,
  ]);

  //Percentage doel bereikt en cijfer afleiden
  useEffect(() => {
    let cijferOnafgerond = 0;
    if (
      props.eindConditie === TypeEindconditie.AANTALGOED ||
      props.eindConditie === TypeEindconditie.AANTALVRAGEN
    ) {
      cijferOnafgerond =
        aantalVragenGoedBeantwoord / props.eindConditieParameter;
    } else {
      cijferOnafgerond = aantalVragenGoedBeantwoord / aantalVragenBeantwoord;
    }
    setCijfer(Math.round(cijferOnafgerond * 100) / 10);

    switch (props.eindConditie) {
      case TypeEindconditie.AANTALGOED:
        let percentageOnafgerondBijConditieAantalGoed =
          (aantalVragenGoedBeantwoord / props.eindConditieParameter) * 100;
        setPercentageDoelBereikt(
          Math.round(percentageOnafgerondBijConditieAantalGoed * 10) / 10
        );
        break;
      case TypeEindconditie.AANTALVRAGEN:
        let percentageOnafgerondBijConditieAantalVragen =
          (aantalVragenBeantwoord / props.eindConditieParameter) * 100;
        setPercentageDoelBereikt(
          Math.round(percentageOnafgerondBijConditieAantalVragen * 10) / 10
        );
        break;
    }
  }, [
    props.eindConditie,
    props.eindConditieParameter,
    aantalVragenBeantwoord,
    aantalVragenGoedBeantwoord,
  ]);

  return (
    <div>
      {!eindconditieBereikt && !tijdIsVerstreken && (
        <Berekening
          getalUitGekozenTafels={parseInt(randomGetalUitGekozenTafels)}
          getalOmMeeTeDelenOfVermenigvuldigen={parseInt(
            randomGetalOmMeeTeRekenen
          )}
          hoogstePlusMinGetal={hoogstePlusMinGetal}
          laagstePlusMinGetal={laagstePlusMinGetal}
          getalVoorOmrekenen={3.14}
          meeteenheidVanaf={randomMeetEenheidVanaf}
          meeteenheidNaartoe={TypeMeeteenheid.CM}
          operator={props.operator}
          onNaarVolgendeVraag={volgendeVraagHandler}
        ></Berekening>
      )}
      {eindconditieBereikt && (
        <Fragment>
          <h2>Doel gehaald!</h2>
          <Plaatje typePlaatje={TypePlaatje.DOELBEREIKT} />
        </Fragment>
      )}
      {tijdIsVerstreken && !eindconditieBereikt && (
        <Fragment>
          <h2>De tijd is voorbij.</h2>
          <h4>Bekijk je behaalde resultaten.</h4>
          <Plaatje typePlaatje={TypePlaatje.TIJDVERSTREKEN} />
        </Fragment>
      )}
      <br />
      <hr />
      {aantalVragenBeantwoord > 0 && (
        <Fragment>
          <h4>
            {Math.round(
              (aantalVragenGoedBeantwoord / aantalVragenBeantwoord) * 100
            )}
            % van de ingevulde vragen goed
          </h4>
          {props.eindConditie !== TypeEindconditie.ONBEPERKT && (
            <h4>{percentageDoelBereikt}% van doel behaald.</h4>
          )}
          <h4>Cijfer: {cijfer}</h4>{" "}
        </Fragment>
      )}
      <h5>
        <p>
          {tijdConditieVanToepassing && !eindconditieBereikt && (
            <Timer
              initMins={tijdconditieAantalMinuten}
              initSecs={tijdconditieAantalSeconden}
              onTimerExpires={alsTimerIsAfgelopen}
            ></Timer>
          )}
          {aantalVragenGoedBeantwoord} goed,{" "}
          {aantalVragenBeantwoord - aantalVragenGoedBeantwoord} fout.
        </p>
        <p>
          {props.eindConditie === TypeEindconditie.AANTALGOED &&
            `Nog ${aantalVragenGoedNogTeDoen} vragen goed beantwoorden tot doel van ${props.eindConditieParameter} vragen.`}
          {props.eindConditie === TypeEindconditie.AANTALVRAGEN &&
            `Nog ${aantalVragenNogTeDoen} vragen beantwoorden tot doel van ${props.eindConditieParameter} vragen goed.`}
        </p>
      </h5>
      <button type="button" onClick={props.onClose}>
        Keuzepagina
      </button>
    </div>
  );
};

export default Berekeningen;
