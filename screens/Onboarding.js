import React from 'react'
import { View, Text,Button, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';


const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Login</Text>
    </TouchableOpacity>
);

const Onboardingscreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Register")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/imgs/onboarding-img1.png')} />,
            title: 'Welcome to DigitalPlus',
            subtitle: 'A New Way To Connect With The Digital World',
          }
        //   {
        //     backgroundColor: '#fdeb93',
        //     image: <Image source={require('../assets/imgs/onboarding-img2.png')} />,
        //     title: 'Share Your Favorites',
        //     subtitle: 'Share Your Thoughts With Similar Kind of People',
        //   },
        //   {
        //     backgroundColor: '#e9bcbe',
        //     image: <Image source={require('../assets/imgs/onboarding-img3.png')} />,
        //     title: 'Become The Star',
        //     subtitle: "Let The Spot Light Capture You",
        //   },
        ]}
      />
    )
}

export default Onboardingscreen

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });
