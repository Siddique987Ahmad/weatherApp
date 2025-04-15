import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decreament, increament, reset} from '../src/counterSlice';

const CounterScreen = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count:{count}</Text>
      <View style={styles.button}>
        <Button title="Increament" onPress={() => dispatch(increament())} />
        <Button title="Decreament" onPress={() => dispatch(decreament())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default CounterScreen;
