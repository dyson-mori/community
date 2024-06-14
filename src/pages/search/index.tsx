import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Text } from '../../common';
import { Clock, CloseCircle } from '../../assets/svg/linear';

import { Tags, Name, Remove, TagsList, Selected, ButtonTagsSelected } from './styles';
import { api } from 'src/services';
import { useNavigation } from '@react-navigation/native';

export type TagProp = {
  id: string;
  name: string;
  type: 'category' | 'creator';
  created_at: string;
  _count:  {
    post:  number
  },
}

const getTags = () => {
  const [data, setData] = useState({
    tags: [],
    loading: true,
  });

  (async() => {
    const { data } = await api.get('/tags');

    return setData({
      tags: data,
      loading: false
    })
  })();

  return {
    tags: data.tags,
    loading: data.loading
  };
};

export default function Search() {
  // const { tags, loading } = getTags();
  const navigation = useNavigation();

  const [tags, setTags] = useState([] as TagProp[]);
  const [tagsSelected, setTagsSelected] = useState([] as TagProp[]);
    
  useEffect(() => {
    (async() => {
      const { data } = await api.get('/tags');
      return setTags(data);
    })();
  }, []);

  const handleSelect = (item: TagProp) => {
    const find = tagsSelected.find(i => i.id === item.id);
    
    if (!!find) {
      const filter = tagsSelected.filter(i => i.id !== item.id);
      return setTagsSelected(filter);
    };

    return setTagsSelected(prev => [...prev, item]);
  };

  const render: ListRenderItem<TagProp> = ({ item, index }) => (
    <Tags key={index.toString()}>
      {
        item.type === 'creator' ? (
          <CloseCircle style={{ marginHorizontal: 22 }} width={20} height={20} />
        ): (
          <Clock style={{ marginHorizontal: 22 }} width={20} height={20} />
        )
      }
      <Name activeOpacity={.5} onPress={() => handleSelect(item)}>
        <Text weight='400'>{item?.name.replace('#', '')} <Text color='gray' size='light'>{item?._count.post} posts</Text></Text>
      </Name>
      <Remove>
        <CloseCircle stroke="#303030" style={{ marginHorizontal: 22 }} width={20} height={20} />
      </Remove>
    </Tags>
  );

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       hideWhenScrolling: false,
  //       inputType: "text",
  //       placeholder: "Search assets",
  //       onChangeText: (event) => {
  //         // console.log(event);
  //         const filter = tags.filter(e => e.name == event)
  //         console.log(filter);
          
  //         // if (event === '' && filter.length === 0) {
  //         //   return setTags([]);
  //         // };

  //         setTags(filter);
          
  //         // setSearchParams((params) => ({
  //         //   ...params,
  //         //   search: event.nativeEvent.text,
  //         // }));
  //       },
  //     },
  //   });
  // }, [navigation]);

  return (
    <>
      {tagsSelected.length > 0 && (
        <Selected>
          {tagsSelected.sort((a, b) => b.name - a.name).map((item) => (
            <ButtonTagsSelected key={item.id} onPress={() => handleSelect(item)}>
              <Text color='white' weight='700'>{item?.name.replace('#', '')}</Text>
            </ButtonTagsSelected>
          ))}
        </Selected>
      )}
      <TagsList
        data={tags.sort((a, b) => b._count.post - a._count.post)}
        keyExtractor={({ id }) => id}
        renderItem={render}
      />
    </>
  );
};
