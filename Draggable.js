/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {StyleSheet, PanResponder, Animated, Text} from 'react-native';

const Draggable = ({data, addRemoveItem, selected, setSelected, DropArea}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const [showDraggable, setShowDraggable] = useState(true);
  const [opacity] = useState(new Animated.Value(1));

  console.log('dropArea', 'out', DropArea);

  const isDropArea = gesture => {
    console.log('dropArea', 'in', DropArea);

    return (
      gesture.moveY > 180 &&
      gesture.moveY < 180 + 200 &&
      gesture.moveX > 39 &&
      gesture.moveX < 39 + 314
    );

    //x                  moveY    width                moveY + height
    //x                  y       width                 height
    //39.272727966308594 180      314.18182373046875   200
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: (e, gesture) => {
        if (isDropArea(gesture)) {
          addRemoveItem(
            selected,
            setSelected,
            e._targetInst.memoizedProps.data,
          );
          Animated.timing(opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            setShowDraggable(false);
          });
        }
      },
    }),
  ).current;

  if (!showDraggable) {
    return null;
  }

  return (
    <Animated.View
      data={data}
      {...panResponder.panHandlers}
      style={[
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
        styles.circle,
      ]}>
      <Text>{data.label}</Text>
    </Animated.View>
  );
};

let CIRCLE_RADIUS = 30;

let styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default Draggable;
