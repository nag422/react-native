import React, { useRef } from "react";
import { View, Text, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// import InputScreen from './InputScreen'

export default function BottomrawScreen() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        {/* <YourOwnComponent /> */}
        <View>
            <Text>
                
                {/* <InputScreen /> */}
                BottomrawScreen
            </Text>
        </View>
      </RBSheet>
    </View>
  );
}