import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Container, Icon } from './styles';

type InputProps = TextInputProps & {
  icon: React.FC<SvgProps>;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder = 'text', icon: Icons, ...rest }) => {
  return (
    <Container>
      <Icon>
        <Icons stroke="#FE0562" width={25} height={25} />
      </Icon>
      <TextInput placeholder={placeholder} style={{ width: '100%', height: 50, fontSize: 18, padding: 10 }} {...rest} />
    </Container>
  )
};
