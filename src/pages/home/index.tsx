import { useRef,useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, useWindowDimensions, Animated, Modal, TouchableOpacity } from 'react-native';

import { api } from '../../services';

import { Container, Header } from "./styles";

import { Video, Text } from '../../common';
import { SearchNormal } from '../../assets/svg/linear';

type CommentProps = {
  message: string;
  created_at: string;
};

type DataProps = {
  url: string;
  preview: string;
  comments: Array<CommentProps>;
};

export default function Home() {
  const [data, setData] = useState<DataProps[]>([]);

  const [comment, setComment] = useState({ modal: false, id: '' });

  const scrollY = useRef(new Animated.Value(0)).current;
  const mediaRefs = useRef<any[]>([]);

  const { width, height } = useWindowDimensions();

  const onViewableItemsChanged = useRef(({ changed }: any) => {
    changed.forEach(({ key, isViewable, index }: any) => {
      const cell = mediaRefs.current[index];

      if (cell) {
        if (isViewable) {
          cell.play()
        } else {
          cell.stop()
        }
      }
    });
  });

  const handleLike = async (id: string) => {
    // const { data } = await api.post(`/like?user=${'skaokosakoaksak'}&post=${id}`);

    // success
  };

  const handleSave = async (id: string) => {
    // const { data } = await api.post(`/save?user=${'skaokosakoaksak'}&post=${id}`);

    // success
  };

  const render = useCallback(({ item, index }: any) => {
    // if (item.type === "image") {
    //   return (
    //     <View style={styles.position}>
    //       <Image
    //         style={{ width: width-10, height: h, borderRadius: 10 }}
    //         src={item.url}
    //         resizeMode="cover"
    //       />
    //       <Header>
    //         <Title style={styles.text}>{item.name}</Title>
    //         {/* <SubTitle style={styles.text}>Serra do Cipó • MG</SubTitle> */}
    //       </Header>
    //     </View>
    //   )
    // }
    return (
      <Video
        ref={post => mediaRefs.current[index] = post}
        data={item}
        width={width}
        height={height}
        setComment={id => setComment({ modal: true, id })}
        setLike={handleLike}
        setSave={handleSave}
      />
    )
  }, []);

  useEffect(() => {
    (async() => {
      const { data } = await api.get('/posts');

      setData(data);
    })()
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />

      <View style={StyleSheet.absoluteFill}>
        {data.map(({ preview }, index) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height
          ];

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.Image
              key={index.toString()}
              style={[
                StyleSheet.absoluteFillObject,
                { opacity }
              ]}
              src={preview}
              blurRadius={10}
              resizeMode="cover"
            />
          )
        })}
      </View>

      <Animated.FlatList
        data={data}
        windowSize={4}
        // initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80
        }}
        renderItem={render}
        // renderItem={({ item }) => render(item.files[0].url)}
        pagingEnabled
        decelerationRate="normal"
        onViewableItemsChanged={onViewableItemsChanged.current}

        showsHorizontalScrollIndicator={false}
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true
          })
        }
      />

      {/* <Header>
        <TouchableOpacity style={{ padding: 20 }}>
          <SearchNormal stroke="#fff" strokeWidth={0} />
        </TouchableOpacity>
        <Text size='semi_bold' weight='700' color='white'>Feed</Text>
        <TouchableOpacity style={{ padding: 20 }}>
          <SearchNormal stroke="#fff" strokeWidth={2} />
        </TouchableOpacity>
      </Header> */}

      {/* <Modal style={{ position: 'relative' }} animationType="slide" visible={comment.modal} transparent>
        <TouchableOpacity style={{ height: height/3 }} onPress={() => setComment({ ...comment, modal: false })} />
        <Comment height={height} data={data[0].comments} />
      </Modal> */}
    </Container>
  );
}
