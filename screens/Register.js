import React from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet,ToastAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FormInput from '../components/FormInput'
import { Card } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { ScrollView } from 'react-native-gesture-handler';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../contexts/AuthContext';

const Register = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [re_password, setRe_password] = React.useState('')
    const [first_name,setFirst_name] = React.useState('')

    const { signup,signuperror,signupsuccess } = React.useContext(AuthContext)


   
   
    


    return (
        <ScrollView contentContainerStyle={styles.container}>
            
      
    
      <Image
        source={require('../assets/imgs/digitalbox.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Create Account</Text>
      {signuperror&& <Text style={{color:'red'}}>Check User Credentials</Text>}
      {signupsuccess&& <Text style={{color:'green'}}>Success please check your email and verify then login to your account!</Text>}
      <FormInput
        labelValue={first_name}
        onChangeText={(first_name) => setFirst_name(first_name)}
        placeholderText="name"
        iconType="user"        
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        require
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
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
      <FormInput
        labelValue={re_password}
        onChangeText={(userPassword) => setRe_password(userPassword)}
        placeholderText="Re-Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <Text>{password.length > 6 ? password === re_password?'':'Two passwords should be matched':null}</Text>
      <FormButton
        buttonTitle="Sign Up"   
        disabled={password.length > 6 ? password === re_password?false:true:true}     
        onPress={() => signup(first_name, email, password, re_password)}
      />


    <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

     
      

      {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Already have an acount? Login here
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
    )
}

export default Register

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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
    color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
    },
  });
