import React from 'react';

import { Container, Header, Option, COption } from './styles';

import { Text } from '../typography';
import { Image, View } from 'react-native';
import { formatData } from '../../utils';

type Props = {
  data: Array<any>;
  height: number;
};

export const Comment: React.FC<Props> = ({ data, height }) => {
  return (
    <Container height={height/1.5}>
      <Header>
        <Text color='white' weight='800'>15 Comments</Text>
      </Header>
      {!!data ? data.map((item, index) => (
        <Option key={index}>
          <Image source={{ uri: 'https://scontent.cdninstagram.com/v/t51.2885-19/440552233_752749567038722_6495970711537168673_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=y55HWdf-XMkAb5fMtBN&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBVjN69q1hSOfQ8WhTBjfJ4kvKLyPWef1dcSYcmRuHocQ&oe=6634A34A&_nc_sid=10d13b' }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <COption>
            <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text color='white' weight='700'>{item.name || 'unknown'}</Text>
              <Text color='white' weight='500' size='light'>{formatData(item.created_at)}</Text>
            </View>
            <Text color='white' weight='400' size='normal'>{item.message}</Text>
          </COption>
        </Option>
      )): null}
    </Container>
  )
};
