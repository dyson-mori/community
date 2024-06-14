import { styled, css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Header = styled.View`
  position: absolute;

  width: 100%;
  height: 50px;

  top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: 600;
`;

export const SubTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;
