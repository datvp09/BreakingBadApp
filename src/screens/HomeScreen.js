import React, {useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {getCharacters, getQuotes} from '@redux/actions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {characters} = useSelector(state => state.list);

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getQuotes());
  }, []);

  const renderCharacters = ({item, index}) => {
    const {char_id, name, birthday, occupation, img, status} = item;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('DetailScreen', {characterId: char_id})
        }>
        <FastImage
          source={{uri: img}}
          style={styles.itemImage}
          resizeMode={'contain'}
        />
        <View style={styles.itemInfo}>
          <Text>{'Name:  ' + name}</Text>
          <Text>{'Birthday:  ' + birthday}</Text>
          <Text>{'Occupation:  ' + occupation.join(', ')}</Text>
          <Text>{'Status:  ' + status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={characters}
      keyExtractor={item => item.char_id}
      renderItem={renderCharacters}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  item: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
  },
  itemImage: {width: 80, height: 120},
  itemInfo: {flex: 1, marginLeft: 10},
});

export default HomeScreen;
