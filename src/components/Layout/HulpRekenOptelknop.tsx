import styled from "styled-components";
import React, { useEffect, useState } from "react";

const StyledHulpButtonVeldNumeriek = styled.button`
  width: 0.63rem;
  padding: 0px;
  margin-left: 0.25rem;
  text-align: center;
`;

type PropsHulpRekenOptelKnop = {
  tellerAlsDieOphoogtDanResetten: number;
};

const HulpRekenOptelKnop = (props: PropsHulpRekenOptelKnop) => {
  const [waarde, setWaarde] = useState(0);

  useEffect(() => {
    setWaarde(0);
  }, [props.tellerAlsDieOphoogtDanResetten]);

  const onClickHandler = () => {
    // console.log("ingedrukt");
    setWaarde((vorige_waarde) => {
      return vorige_waarde === 9 ? 0 : vorige_waarde + 1;
    });
  };

  return (
    <StyledHulpButtonVeldNumeriek type="button" onClick={onClickHandler}>
      {waarde}
    </StyledHulpButtonVeldNumeriek>
  );
};

export default HulpRekenOptelKnop;
