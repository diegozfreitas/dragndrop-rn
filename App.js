import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Draggable from './Draggable';

const App = () => {
  const ref = useRef();
  const [selected, setSelected] = useState([]);
  const [dropArea1, setDropArea1] = useState({});

  const data = [
    {id: 1, value: 1, label: 'opção 1'},
    {id: 2, value: 2, label: 'opção 2'},
    {id: 3, value: 3, label: 'opção 3'},
    {id: 4, value: 4, label: 'opção 4'},
    {id: 5, value: 5, label: 'opção 5'},
  ];

  const findPositionAndDimensions = layout => {
    const {x, y, width, height} = layout;
    setDropArea1({
      x: Math.trunc(x),
      y: Math.trunc(y),
      width: Math.trunc(width),
      height: Math.trunc(height),
    });
  };

  const isInArray = (arrayState, item) => {
    if (arrayState.findIndex(find => find.id === item.id) !== -1) {
      return true;
    }
  };

  const addRemoveItem = (arrayState, setArrayState, item) => {
    if (isInArray(arrayState, item)) {
      const thisArray = arrayState.indexOf(item);

      if (thisArray !== -1) {
        arrayState.splice(
          data.findIndex(find => find.id === item.id),
          1,
        );
        setArrayState(arrayState => [...arrayState]);
        return;
      }
    }

    setArrayState(arrayState => [...arrayState, item]);
    return;
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={styles.dropZone}
        ref={ref}
        onLayout={event => {
          findPositionAndDimensions(event.nativeEvent.layout);
        }}>
        {selected.length === 0 && (
          <Text style={styles.text}>Drop them here!</Text>
        )}

        {selected.map((item, key) => (
          <Text
            key={key}
            style={{
              backgroundColor: '#9de1fe',
              width: 60,
              height: 60,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            {item.label}
          </Text>
        ))}
      </View>
      <View style={styles.ballContainer} />
      <View style={styles.row}>
        {data.map((item, key) => (
          <Draggable
            key={key}
            data={item}
            addRemoveItem={addRemoveItem}
            selected={selected}
            setSelected={setSelected}
            DropArea={dropArea1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  row: {
    flexDirection: 'row',
  },
  dropZone: {
    marginTop: 180,
    height: 200,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#00334d',
    flexDirection: 'row',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default App;
