import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { TagProp } from '.';

export const TagsList = styled(FlatList<TagProp>)`
  flex: 1;
  /* background-color: #EBEEF7; */
`;

export const Tags = styled.View`
  width: 100%;
  height: 50px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;

  padding: 15px 0;
`;

export const Remove = styled.View`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

export const Selected = styled.View`
  width: 100%;
  flex-flow: wrap;
`;

export const ButtonTagsSelected = styled.TouchableOpacity`
  flex-grow: 1;

  height: 40px;

  justify-content: center;

  background-color: #FE2C55;
  
  margin: 1px;
  padding: 0 15px;

  border-radius: 3px;
`;