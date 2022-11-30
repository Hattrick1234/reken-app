import React from "react";
import MainNavigation from "./MainNavigation";
import styled from "styled-components";

const StyledMain = styled.main`
  text-align: center;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <MainNavigation />
      <StyledMain>{children}</StyledMain>
    </div>
  );
};

export default Layout;
