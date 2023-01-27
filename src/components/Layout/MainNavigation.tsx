import styled from "styled-components";

const StyledHeader = styled.header`
  top: 0;
  left: 0;
  background: #2ddf5c; //orchid;

  & h1 {
    margin: 0;
    text-align: center;
  }
`;

const MainNavigation = () => {
  return (
    <StyledHeader>
      <h1>Reken app</h1>
    </StyledHeader>
  );
};

export default MainNavigation;
