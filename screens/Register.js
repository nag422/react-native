import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ToastAndroid,
  Dimensions,
  ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import FormInput from "../components/FormInput";
import { Card } from "react-native-paper";
import FormButton from "../components/FormButton";
import { ScrollView } from "react-native-gesture-handler";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../contexts/AuthContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [re_password, setRe_password] = React.useState("");
  const [first_name, setFirst_name] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);

  const { signup, signuperror, signupsuccess } = React.useContext(AuthContext);

  const handleSubmit = async (first_name, email, password, re_password) => {
    setIsloading(true)
    const issignupval = await signup(first_name, email, password, re_password)

    
    
    
    
    if(issignupval){
      setIsloading(false)
      ToastAndroid.show("Success! Check your email to activate !", ToastAndroid.LONG);

    } else{
      setIsloading(false)
      ToastAndroid.show("Fail! Check your credentials !", ToastAndroid.LONG);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}></View>

        <View style={styles.middle}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require("../assets/imgs/digitalbox.png")}
            style={styles.logo}
          />
          <View style={styles.formArea}>
            <Text style={[styles.textContainer, styles.signin]}>Register</Text>

            <Animatable.View
              animation="slideInLeft"
              duraton="1500"
              style={styles.forminputs}
            >
              <FormInput
                labelValue={first_name}
                onChangeText={(first_name) => setFirst_name(first_name)}
                placeholderText="Name"
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
              <Text style={{color:'red'}}>
                {password.length > 6
                  ? password === re_password
                    ? ''
                    : 'Two passwords are should be matched!'
                  : 'Password is should be a minimum 6 characters!'}
              </Text>
                  {!isloading?
              <FormButton
                style={styles.button}
                buttonTitle="Sign Up"
                disabled={
                  password.length > 6
                    ? password === re_password
                      ? false
                      : true
                    : true
                }
                onPress={() => handleSubmit(first_name, email, password, re_password)}
              />
                :
              <ActivityIndicator size="large" color="#000020" />
                }

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.navButtonText}>
                  Already have an acount? Login here
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{" "}
          </Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                  <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
                    <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                      Terms of service
                    </Text>
                  </TouchableOpacity>

                
                  <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                    Privacy Policy
                  </Text>
          </View>
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
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  top: {
    position: "relative",
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  bottom: {
    position: "relative",
    height: "100%",
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: "#fff",
  },
  textContainer: {
    color: "#FCFDFF",
    fontSize: 24,
    marginBottom: 30,
    position: "relative",
    top: "20%",
    alignSelf: "center",
  },
  formArea: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    top: "20%",
    padding: 5,
    paddingBottom: 40,
  },
  signin: {
    top: 0,
    color: "#2D3057",
    marginTop: 15,
  },
  logo: {
    top: windowHeight - (windowHeight - 80),
    alignSelf: "center",
    height: 50,
    width: 150,
    alignContent: "center",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  bottom: {
    top: windowHeight - windowHeight / 2.5,
    position: "relative",
    height: "100%",
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: "#ffffff",
    zIndex: 4,
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
    fontWeight: "500",
    color: "#2e64e5",
    alignSelf: "center",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "400",
    // fontFamily: 'Lato-Regular',
    color: "grey",
  },
});
