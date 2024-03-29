import styled from "styled-components";
import React from "react";
import {
  TypeOperator,
  TypeMeeteenheid,
} from "../HergebruikElementen/Types_Constanten_etc";
import HulpRekenOptelKnop from "../Layout/HulpRekenOptelknop";

const StyledDivRekenSomContainerOnderElkaar = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivRekenSomElementOnderElkaar = styled.div`
  margin-left: auto;
`;

const StyledDivContainerGetallenNaastElkaar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledDivGetalMetMargeLinksEnRechts = styled.div`
  padding-left: 0.33rem;
  color: purple;
`;

type PropsRekensomVerticaalWeergave = {
  getalUitGekozenTafels: number;
  getalOmMeeTeDelenOfVermenigvuldigen: number;
  hoogstePlusMinKeerGetal: number;
  laagstePlusMinKeerGetal: number;
  getalVoorOmrekenen: number;
  meeteenheidVanaf: TypeMeeteenheid;
  meeteenheidNaartoe: TypeMeeteenheid;
  operator: TypeOperator;
  tellerAlsDieOphoogtDanResetten: number;
};

const RekensomVerticaalWeergave = (props: PropsRekensomVerticaalWeergave) => {
  let bovensteGetal = "";
  let ondersteGetal = "";
  let operator = "";
  let aantalKaraktersGrootsteGetal = 0;
  switch (props.operator) {
    case TypeOperator.TAFELS:
      bovensteGetal = `${props.getalOmMeeTeDelenOfVermenigvuldigen}`;
      ondersteGetal = `${props.getalUitGekozenTafels}`;
      operator = "_______x";
      aantalKaraktersGrootsteGetal =
        props.getalUitGekozenTafels.toString().length;
      break;
    case TypeOperator.VERMENIGVULDIGEN:
      bovensteGetal = `${props.hoogstePlusMinKeerGetal}`;
      ondersteGetal = `${props.laagstePlusMinKeerGetal}`;
      operator = "_______x";
      aantalKaraktersGrootsteGetal =
        props.hoogstePlusMinKeerGetal.toString().length;
      break;
    case TypeOperator.DELEN:
      bovensteGetal = `${
        props.getalOmMeeTeDelenOfVermenigvuldigen * props.getalUitGekozenTafels
      }`;
      ondersteGetal = `${props.getalUitGekozenTafels}`;
      operator = "_______:";
      aantalKaraktersGrootsteGetal =
        props.getalUitGekozenTafels.toString().length;
      break;
    case TypeOperator.OPTELLEN:
      bovensteGetal = `${props.hoogstePlusMinKeerGetal}`;
      ondersteGetal = `${props.laagstePlusMinKeerGetal}`;
      operator = "_______+";
      aantalKaraktersGrootsteGetal =
        props.hoogstePlusMinKeerGetal.toString().length;
      break;
    case TypeOperator.AFTREKKEN:
      bovensteGetal = `${props.hoogstePlusMinKeerGetal}`;
      ondersteGetal = `${props.laagstePlusMinKeerGetal}`;
      operator = "_______-";
      aantalKaraktersGrootsteGetal =
        props.hoogstePlusMinKeerGetal.toString().length;
      break;
    case TypeOperator.MEETEENHEDEN_OMREKENEN:
      bovensteGetal = "0";
      ondersteGetal = `0`;
      operator = `${props.getalVoorOmrekenen.toLocaleString()} ${
        props.meeteenheidVanaf
      } is in ${props.meeteenheidNaartoe}`;
      aantalKaraktersGrootsteGetal = 0;
      break;
  }

  const toonSubGetallenNaastElkaarOpAfstandVanElkaar = (getal: number) => {
    const numArray = getal.toString().split("");

    return (
      <StyledDivContainerGetallenNaastElkaar>
        {numArray.map((element, index) => (
          <StyledDivGetalMetMargeLinksEnRechts key={index}>
            {element}
          </StyledDivGetalMetMargeLinksEnRechts>
        ))}
      </StyledDivContainerGetallenNaastElkaar>
    );
  };

  const hulpInputBovenSom = (aantalHulpvelden: number) => {
    return (
      <React.Fragment>
        {aantalHulpvelden >= 4 && (
          <HulpRekenOptelKnop
            tellerAlsDieOphoogtDanResetten={
              props.tellerAlsDieOphoogtDanResetten
            }
          ></HulpRekenOptelKnop>
        )}
        {aantalHulpvelden >= 3 && (
          <HulpRekenOptelKnop
            tellerAlsDieOphoogtDanResetten={
              props.tellerAlsDieOphoogtDanResetten
            }
          ></HulpRekenOptelKnop>
        )}
        {aantalHulpvelden >= 2 && (
          <HulpRekenOptelKnop
            tellerAlsDieOphoogtDanResetten={
              props.tellerAlsDieOphoogtDanResetten
            }
          ></HulpRekenOptelKnop>
        )}
        <HulpRekenOptelKnop
          tellerAlsDieOphoogtDanResetten={props.tellerAlsDieOphoogtDanResetten}
        ></HulpRekenOptelKnop>
        <HulpRekenOptelKnop
          tellerAlsDieOphoogtDanResetten={props.tellerAlsDieOphoogtDanResetten}
        ></HulpRekenOptelKnop>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <StyledDivRekenSomContainerOnderElkaar>
        <StyledDivRekenSomElementOnderElkaar>
          {hulpInputBovenSom(aantalKaraktersGrootsteGetal)}
        </StyledDivRekenSomElementOnderElkaar>
        <StyledDivRekenSomElementOnderElkaar>
          {toonSubGetallenNaastElkaarOpAfstandVanElkaar(
            parseInt(bovensteGetal)
          )}
        </StyledDivRekenSomElementOnderElkaar>
        <StyledDivRekenSomElementOnderElkaar>
          {toonSubGetallenNaastElkaarOpAfstandVanElkaar(
            parseInt(ondersteGetal)
          )}
        </StyledDivRekenSomElementOnderElkaar>
        <StyledDivRekenSomElementOnderElkaar>
          {operator}
        </StyledDivRekenSomElementOnderElkaar>
      </StyledDivRekenSomContainerOnderElkaar>
      <br />
    </React.Fragment>
  );
};

export default RekensomVerticaalWeergave;
