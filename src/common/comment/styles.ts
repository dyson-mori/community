import { styled, css } from "styled-components/native";

type ModalProps = {
  height?: number;
};

export const Container = styled.View<ModalProps>`
  position: absolute;
  bottom: 0;

  width: 100%;
  
  ${({ height }) => css`
    height: ${height}px;
  `};

  background-color: #000000aa;

  border-top-right-radius: 9px;
  border-top-left-radius: 9px;
`;

export const Header = styled.View`
  width: 100%;
  height: 40px;

  justify-content: center;
  align-items: center;
`;

export const Option = styled.View`
  width: 100%;
  padding: 10px;
  flex-direction: row;
`;

export const COption = styled.View`
  width: 100%;
  
  justify-content: space-around;

  padding: 0 10px 10px 5px;
`;
