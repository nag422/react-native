import React from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable';
import FormInput from '../components/FormInput'
import { Card } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { ScrollView } from 'react-native-gesture-handler';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../contexts/AuthContext';
const Login = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isloading, setIsloading] = React.useState(false)
    const {login} = React.useContext(AuthContext)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
      
    
      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={require('../assets/imgs/digitalbox.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Login</Text>
      {isloading ? <ActivityIndicator size="large" color="#0000ff" />:null}
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
        onPress={() => login(email,password)}
      />
    
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View>
          
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
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
      height: 100,
      width: 250,
      alignContent:'center',
      resizeMode: 'contain',
    },
    text: {
      
      textAlign:'center',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
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
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  }
  });
