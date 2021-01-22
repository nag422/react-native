import React from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FormInput from '../components/FormInput'
import { Card } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { ScrollView } from 'react-native-gesture-handler';
import SocialButton from '../components/SocialButton';
const Login = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    return (
        <ScrollView contentContainerStyle={styles.container}>
            
      
    
      <Image
        source={require('../assets/imgs/digitalbox.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Login</Text>

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

      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
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
  });
