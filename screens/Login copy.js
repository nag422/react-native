import React from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable';
import FormInput from '../components/FormInput'
import { Card } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { ScrollView } from 'react-native-gesture-handler';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../contexts/AuthContext';




const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // const [isloading, setIsloading] = React.useState(true)
  const [sociallogin, setSociallogin] = React.useState(false)
  const { login, loginerror, isLoading } = React.useContext(AuthContext)
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const showToast = React.useCallback(() => {
    setSociallogin(true);
    wait(1000).then(() => setSociallogin(false));
  }, [sociallogin]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.leftbubble}>
            <View style={styles.innerleftbubble}></View>
          </View>
          <View style={styles.rightbubble}>
            <View style={styles.innerrightbubble}></View>
          </View>

          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/imgs/digitalbox.png')}
            style={styles.logo}
          />

          <Text style={styles.text}>Login</Text>
          {sociallogin && ToastAndroid.show('signIn/signUp with email login method !', ToastAndroid.SHORT)}
          {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          {loginerror && <Text style={{ color: 'red' }}>Invalid Credentials</Text>}
          <Animatable.View animation="slideInLeft" duraton="1500">

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

          <FormButton

            buttonTitle="Sign In"
            onPress={() => login(email, password)}
          />

          <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noaccountButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navButtonText}>
              Don't have an acount? Create here
        </Text>
          </TouchableOpacity>

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


        
        </ScrollView>
      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20

  },
  logo: {
    marginTop: 50,
    height: 100,
    width: 250,
    alignContent: 'center',
    resizeMode: 'contain',
  },
  text: {

    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
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
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
  leftbubble: {
    position: 'absolute',
    top: -10,
    left: -50,
    width: 120,
    height: 120,
    backgroundColor: '#2e64e5',
    opacity: 0.2,
    borderRadius: 200,
    zIndex: 0
  },
  rightbubble: {
    position: 'absolute',
    bottom: -10,
    right: -50,
    width: 120,
    height: 120,
    backgroundColor: '#2e64e5',
    opacity: 0.2,
    borderRadius: 200,
    zIndex: 0
  },
  innerleftbubble: {
    position: 'absolute',
    top: -10,
    right: -50,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 200,
    zIndex: 0

  },
  innerrightbubble: {
    position: 'absolute',
    bottom: -10,
    left: -50,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 200,
    zIndex: 0

  }
});
