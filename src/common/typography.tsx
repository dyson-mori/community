import { styled, css } from 'styled-components/native';

import theme from '../theme';

type TextProps = {
  width?: number;
  weight?: keyof typeof theme.font.weight;
  size?: keyof typeof theme.font.size;
  color?: keyof typeof theme.colors;
};

export const Text = styled.Text<TextProps>`
  ${({ width = 0, weight = '500', size = 'medium', color = 'text' }) => css`
    width: ${width > 0 ? `${width}px` : 'auto'};
    color: ${theme.colors[color]};
    font-weight: ${theme.font.weight[weight]};
    font-size: ${theme.font.size[size]};
  `}
`;