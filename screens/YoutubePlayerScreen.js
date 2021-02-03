import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const YoutubePlayerScreen = ({videourl,...rest})=> {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={{padding:4}}>
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videourl}
        onChangeState={onStateChange}
        
      />
      {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
    </View>
  );
}
export default YoutubePlayerScreen;