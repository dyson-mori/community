import React, { useState } from 'react';

import { View, useWindowDimensions } from 'react-native';

import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

type Props = {
  max: number;
  position: number;
  onValueChange: (progress: number) => void;
}

export const InputSlider: React.FC<Props> = ({ position = 0, max, onValueChange }) => {
  const [scroll, setScroll] = useState(false);
  const { width } = useWindowDimensions();

  const sliderWidth = width - 20;

  const value = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      console.log({
        evt: _.translationX,
        ctx: context.startX
      });
      context.startX = value.value;
      runOnJS(setScroll)(true);
    },
    onActive: (event, context) => {
      if (context.startX + event.translationX < 0) {
        value.value = 0
      } else if (context.startX + event.translationX > sliderWidth) {
        value.value = sliderWidth
      } else {
        value.value = context.startX + event.translationX
      }
    },
    onEnd: () => {
      runOnJS(onValueChange)(Math.floor(value.value / (sliderWidth / max)));
      runOnJS(setScroll)(false);
    }
  });

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: 0 }],
    width: scroll ? value.value : Math.floor(sliderWidth / (max / position)),
  }));

  const content: any = {
    position: 'absolute',
    justifyContent: 'center',
    width: sliderWidth,
    height: 20,
  };

  const sliderFront: any = {
    position: 'absolute',
    height: 2,
    backgroundColor: '#3F4CF6',
  }

  const sliderBack = {
    height: 2,
    backgroundColor: '#ddd',
    // backgroundColor: '#ffffffaa',
  };

  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={content}>
          <View style={sliderBack}>
            <Animated.View style={[sliderFront, sliderStyle]} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}