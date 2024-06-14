import { styled, css } from 'styled-components/native';
import { Props } from '.';

export const Container = styled.View<Omit<Props, 'data' | 'setComment' | 'setLike' | 'setSave'>>`
  position: relative;

  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `};

  justify-content: center;
  align-items: center;
`;

export const Controllers = styled.View`
  position: absolute;

  align-items: center;
  justify-content: space-between;

  /* background-color: rgba(60, 60, 60, 0.01); */
`;

export const Header = styled.View`
  /* height: 50px; */
  width: 100%;

  padding: 10px;

  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const Footer = styled.View`
  position: absolute;

  bottom: 0;

  /* height: 50px; */
  width: 100%;

  padding: 0 10px;

  align-items: flex-start;
  justify-content: center;
`;

export const Actions = styled.View`
  position: absolute;

  right: 0;
  bottom: 50px;
`;

export const Button = styled.TouchableOpacity`
  position: relative;

  justify-content: center;
  align-items: center;

  padding: 10px 0;
  margin-right: 15px;
`;

export const Tags = styled.View`
  width: 70%;

  padding: 10px 0;

  flex-wrap: wrap;
  flex-direction: row;
`;