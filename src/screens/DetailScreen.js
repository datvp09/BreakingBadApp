import React, {useState, useRef} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '@theme';
import {isiOS} from '@utils';

const DetailScreen = ({navigation, route}) => {
  const scrollViewRef = useRef();
  const characterId = route?.params?.characterId;
  const {characters, quotes} = useSelector(state => state.list);
  const character = characters.find(x => x.char_id === characterId);

  if (!characterId || !character) {
    return <Text>{'No Data'}</Text>;
  }

  const {
    name,
    birthday,
    occupation,
    img,
    status,
    nickname,
    appearance,
    portrayed,
    category,
  } = character;

  const quoteList = quotes.filter(q => q.author === character.name);
  const [quoteRandomId, setQuoteRandomId] = useState(
    Math.floor(Math.random() * quoteList.length),
  );
  const quoteShow = quoteList?.[quoteRandomId]?.quote || '';

  const randomQuote = () =>
    setQuoteRandomId(Math.floor(Math.random() * quoteList.length));

  const navigateCommentScreen = () => {
    navigation.navigate('CommentScreen', {characterId});
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <KeyboardAvoidingView
        behavior={isiOS ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          style={styles.container}
          ref={scrollViewRef}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.content}>
          <View style={styles.topSection}>
            <FastImage
              source={{uri: img}}
              style={styles.image}
              resizeMode={'contain'}
            />
            <View style={styles.quoteSection}>
              {quoteShow !== '' && (
                <Text style={styles.quote}>{'`' + quoteShow + '`'}</Text>
              )}
              <TouchableOpacity
                onPress={randomQuote}
                style={styles.randomButton}>
                <Text style={styles.randomButtonText}>{'Random'}</Text>
              </TouchableOpacity>
              <Text style={styles.info}>{name}</Text>
              <Text style={styles.info}>{birthday}</Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Occupation:'}</Text>
            <Text style={styles.value}>{occupation.join(', ')}</Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Status:'}</Text>
            <Text style={styles.value}>{status}</Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Nickname:'}</Text>
            <Text style={styles.value}>{nickname}</Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Appearance:'}</Text>
            <Text style={styles.value}>
              {'Season ' + appearance.join(', ')}
            </Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Portayed:'}</Text>
            <Text style={styles.value}>{portrayed}</Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.field}>{'Category:'}</Text>
            <Text style={styles.value}>{category}</Text>
          </View>
          <TouchableOpacity
            onPress={navigateCommentScreen}
            style={styles.commentButton}>
            <Text>{'Comment'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 12},
  topSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  quoteSection: {flex: 1, marginLeft: 15},
  image: {width: 120, height: 180},
  quote: {
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10,
  },
  randomButton: {
    backgroundColor: Color.HeaderLight,
    padding: 8,
    borderRadius: 4,
    width: 70,
    marginBottom: 10,
  },
  randomButtonText: {
    color: 'white',
  },
  info: {
    fontSize: 16,
    lineHeight: 24,
  },
  extraInfo: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 4,
  },
  field: {flex: 2},
  value: {flex: 5},
  commentButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: Color.Grey,
    padding: 8,
    borderRadius: 4,
    width: 80,
    marginBottom: 10,
  },
});

export default DetailScreen;
