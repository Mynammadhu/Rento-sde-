// screens/MessagesScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const initialMessages = {
  user1: [],
  user2: [],
  user3: []
};

export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentChat, setCurrentChat] = useState('user1');

  const handleSend = () => {
    if (currentMessage) {
      setMessages({
        ...messages,
        [currentChat]: [...messages[currentChat], currentMessage]
      });
      setCurrentMessage('');
    }
  };

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <FlatList
        data={Object.keys(messages)}
        renderItem={({ item }) => (
          <Button title={`Chat with ${item}`} onPress={() => setCurrentChat(item)} />
        )}
        keyExtractor={(item) => item}
      />
      <FlatList
        data={messages[currentChat]}
        renderItem={({ item }) => <Animatable.Text animation="fadeIn">{item}</Animatable.Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={currentMessage}
        onChangeText={setCurrentMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={handleSend} />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
