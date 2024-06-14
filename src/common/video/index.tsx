import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Image } from "react-native";

import { ResizeMode, Video as VideoAV } from "expo-av";

import { Container, Controllers, Footer, Header, Actions, Button, Tags } from "./styles";
import { Text } from "../typography";

import { videos } from '../../services/data.json';

import { InputSlider } from "../inputSlider";

import { Heart, Comment, Archive } from '../../assets/svg/bold';
import { formatNumber } from "src/utils";

export type Props = {
  data: {
    _count: {
      comments: number;
      feedbacks: number;
      folders: number;
    },
    admin_id: string;
    comments: [],
    created_at: string;
    description: string;
    duration: number;
    height: number;
    id: string;
    likes: number,
    name: string;
    preview: string;
    public: 'unlogged' | 'logged';
    tags: string[];
    type: string;
    url: string;
    width: number;
  };
  // dimension
  width: number;
  height: number;
  setComment: (id: string) => void;
  setLike: (id: string) => void;
  setSave: (id: string) => void;
};

type VideoActionsProps = {
  play: () => void;
  stop: () => void;
  unload: () => void;
}

const SvgStyles = {
  marginBottom: 3,
  shadowColor: "#888",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 3,
};

const VideoComponent = forwardRef<VideoActionsProps, Props>(({ data, width, height, setComment, setLike, setSave }, parentRef) => {
  const ref = useRef<VideoAV>(null);

  const [currentTime, setCurrentTime] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop
  }), []);

  useEffect(() => {
    return () => {
      unload();
    }
  }, [])

  const play = async () => {
    if (ref.current === null) {
      return console.log('play is null');
    }

    try {
      await ref.current.playAsync()
    } catch (error) {
      console.log(error);
    }
  };

  const stop = async () => {
    if (ref.current === null) {
      return console.log('stop is null')
    };

    const status = await ref.current.getStatusAsync();

    if (!status.isLoaded) {
      return;
    }

    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync()
    } catch (error) {
      console.log(error);
    }
  };

  const unload = async () => {
    if (ref.current === null) {
      return console.log('unload is null')
    };
    try {
      await ref.current.unloadAsync()
    } catch (error) {
      console.log(error);
    }
  };

  const setPositionMills = async (position: number) => {
    if (ref.current === null) {
      return console.log('play is null');
    };

    try {
      await ref.current.setPositionAsync(position);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data?.tags);

  return (
    <Container width={width} height={height}>
      <VideoAV
        ref={ref}
        source={{ uri: data.url }}
        shouldPlay={false}
        resizeMode={ResizeMode.COVER}
        style={{
          width: width,
          height: data.height / (data.width / width),
        }}
        isLooping
        onPlaybackStatusUpdate={(event) => {
          // console.log(event);

          if (event.isLoaded) {
            // slider.current = event.positionMillis;
            setCurrentTime(event.positionMillis);
          };
        }}
      />
      <Controllers style={{ width, height: data.height / (data.width / width) }}>
        {/* <Header>
          <Image
            src={data.user?.photo}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
          <View style={{ width: 5 }} />
          <Text size="medium" weight="700">{data.user?.name}</Text>
        </Header> */}

        <Actions>
          <Button onPress={() => setLike(data.id)}>
            <Heart stroke="#fff" width={28} height={28} style={SvgStyles} />
            <Text size="extra_light" weight="700" color="white">{formatNumber(data._count.feedbacks)}</Text>
          </Button>
          <Button onPress={() => setComment(data.id)}>
            <Comment stroke="#fff" width={28} height={28} style={SvgStyles} />
            <Text size="extra_light" weight="700" color="white">{formatNumber(data._count.comments)}</Text>
          </Button>
          <Button onPress={() => setSave(data.id)}>
            <Archive stroke="#fff" width={28} height={28} style={SvgStyles} />
            <Text size="extra_light" weight="700" color="white">{formatNumber(data._count.folders)}</Text>
          </Button>
        </Actions>

        <Footer>
          <Text size="semi_bold" weight="700" color="white">{data?.name}</Text>
          <View style={{ height: 10 }} />
          {data.description && (
            <Text size="semi_bold" weight="400" width={350} color="white">{data.description}</Text>
          )}
          <Tags>
            {data.tags.sort().map((tags) => (
              <Text key={tags} size="medium" weight="700" color="white">{tags} </Text>
            ))}
          </Tags>

          <InputSlider
            position={currentTime}
            max={data.duration}
            onValueChange={setPositionMills}
          />
        </Footer>
      </Controllers>
    </Container>
  )
});

export {
  VideoComponent as Video
}