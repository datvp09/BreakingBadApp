import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setCommentList} from '@redux/actions';
import {Color} from '@theme';
import {isiOS} from '@utils';

const CommentScreen = ({route}) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const characterId = route?.params?.characterId;
  const {comments} = useSelector(state => state.list);
  const [comment, setComment] = useState('');
  const commentsOfCharacter = comments.find(x => x.characterId === characterId)
    ?.comments;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);

  const _keyboardDidShow = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd();
      }
    }, 0);
  };

  const submitComment = () => {
    dispatch(setCommentList({characterId, comment}));
    setComment('');
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
          <View style={styles.commentSection}>
            <View style={styles.inputWrap}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                numberOfLines={3}
                multiline={true}
                style={styles.input}
                placeholder={'Input your comment...'}
              />
            </View>
            <TouchableOpacity
              onPress={submitComment}
              style={styles.commentButton}>
              <Text>{'Comment'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.recentComment}>{'Recently commented'}</Text>
          {commentsOfCharacter?.map((c, cid) => (
            <View key={cid} style={styles.commentRow}>
              <Text style={styles.commentText}>{c}</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 12},
  commentSection: {marginBottom: 20},
  inputWrap: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 70,
    padding: Platform.select({
      ios: 10,
      android: 5,
    }),
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
  },
  commentButton: {
    marginTop: 5,
    alignSelf: 'flex-end',
    backgroundColor: Color.Grey,
    padding: 8,
    borderRadius: 4,
    width: 80,
    marginBottom: 10,
  },
  recentComment: {fontSize: 16, marginBottom: 20},
  commentRow: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey,
    paddingBottom: 5,
  },
  commentText: {fontStyle: 'italic', color: Color.TextBlur},
});

export default CommentScreen;
