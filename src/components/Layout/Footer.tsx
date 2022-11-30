import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 50px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #333;
  background-color: pink;
`;

const Footer = () => {
  return (
    <StyledFooter>
      {/* <img src='DanHintzDesignLogo-DHSmileOutlined.svg' alt="Dan Hintz Logo" height="100%" /> */}
      <p>This is the Footer</p>
    </StyledFooter>
  );
};

export default Footer;
