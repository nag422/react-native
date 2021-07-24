import React from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator, ToastAndroid,Dimensions  } from 'react-native'
import * as Animatable from 'react-native-animatable';
import FormInput from '../components/FormInput'

import FormButton from '../components/FormButton';
// import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../contexts/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')  
  const [sociallogin, setSociallogin] = React.useState(false)
  const { login, loginerror,isLoading,signing } = React.useContext(AuthContext)


  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const showToast = React.useCallback(() => {
    setSociallogin(true);
    wait(1000).then(() => setSociallogin(false));
  }, [sociallogin]);

  

  if (isLoading) {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          <ActivityIndicator size="large" color="#417e92" />
        </Text>
        <Text>Loading..Wait</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.top}></View>
        <View style={styles.middle}>
        <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/imgs/digitalbox.png')}
            style={styles.logo}
          />
          <View style={styles.formArea}>
            <Text style={[styles.textContainer, styles.signin]}>Login</Text>
            {sociallogin && ToastAndroid.show('signIn/signUp with email login method !', ToastAndroid.SHORT)}
            
            {loginerror && <Text style={{ color: 'red' }}>Invalid Credentials</Text>}
            <Animatable.View animation="slideInLeft" duraton="1500" style={styles.forminputs}>

              <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}



              />

              <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
              />
            </Animatable.View>
            {signing && <ActivityIndicator size="large" color="#0000ff" />}
            <FormButton

              buttonTitle="LogIn"
              onPress={() => login(email, password)}
              style={styles.button}
            />
            


          </View>

        </View>
        <View style={styles.bottom}>
          {/* <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity> */}


          <TouchableOpacity
            style={styles.noaccountButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navButtonText}>
              Don't have an acount? Create here
        </Text>
          </TouchableOpacity>
          
          </View>        




        

        {/* {Platform.OS === 'android' ? (
        <View>

          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={showToast}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={showToast}
            
          />
         
        </View>
      ) : null} */}




      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  top: {
    position: 'relative',
    backgroundColor: 'rgba(3, 13, 81, 0.9)',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250
  },
  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
    
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: '#fff',
  },
  textContainer: {
    color: '#FCFDFF',
    fontSize: 24,
    marginBottom: 30,
    position: 'relative',
    top: '20%',
    alignSelf: 'center',
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    top: '20%',
    padding:5,
    paddingBottom: 40,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(3, 13, 81, 0.9)",
    
  },
  signin: {
    top: 0,
    color: '#2D3057',
    marginTop: 15,
  },
  logo: {
    top:windowHeight-(windowHeight-80),
    alignSelf:'center',
    height: 50,
    width: 150,
    alignContent: 'center',
    resizeMode: 'contain',
  },
  button:{
    
    backgroundColor: 'rgba(3, 13, 81, 0.9)',
    padding:10,
    alignSelf:'center',
    borderRadius:10,
    marginTop:10
  },
  bottom: {
    top:windowHeight-(windowHeight/1.8),
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: 'transparent',
    zIndex:4
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 25,
  },
  noaccountButton: {
    marginVertical: 1,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    alignSelf:'center'
  },
 

});
