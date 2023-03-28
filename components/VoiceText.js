import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-community/voice';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const VoiceText = ({
  icon,
  containerstyle,
  resultValue = () => { }

}) => {

  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)

  const customProps = {
    icon: icon === undefined ? <MaterialCommunityIcons name="microphone" size={25}  /> : icon,
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    resultValue(text);
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }


  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onLongPress={startRecording}
      onPressOut={stopRecording}
    >
      {customProps.icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent : 'center',
    // padding: 8,
  }
});

export default VoiceText;