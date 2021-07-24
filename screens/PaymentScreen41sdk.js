import React, { useState, useContext,useEffect } from 'react';
import { View, Image, Button, Alert } from 'react-native';
import { StripeProvider,CardField as Cardser, useStripe,initStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppbarScreen from './AppbarScreen';



const PaymentScreen =(props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [pyamentIntentsecret,setPyamentIntentsecret] = React.useState('')

  const fetchPaymentSheetParams = async () => {
    const API_URL = "https://app.kiranvoleti.com"
    const tokendetail = await AsyncStorage.getItem('logindetails');
    const parseditem = JSON.parse(tokendetail);      
    
    await axios.post(`${API_URL}/rncheckout/`, {
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${parseditem.access}`,    
      },
    })
    .then(response=> {
      const { paymentIntent, ephemeralKey, customer } = response.data;
      console.log(paymentIntent)
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };

    })
    
    

    
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    setPyamentIntentsecret(paymentIntent)

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    }).then(res=>{
      console.log('successmsg',res)
    }).catch(err=>{
      console.log('messages',err.message)
    })
    if (!error) {
      setLoading(true);
      
    }
    
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({ pyamentIntentsecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51H2GwkFM3Q6O7DuK3XgFpJhO5snlKligZL0EKLRoyynRKVIfxsPFyN0Z9KPxZmmmYJCwJY7MbnzqKgRybQpiZz7000KK2MEv5c">
    <View>
      {/* <AppbarScreen navigation={props.navigation} visibleform={false} title="Payment" subtitle='Paymentti' /> */}
      <Button
        variant="primary"
        // disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
    </StripeProvider>
  );
}
export default PaymentScreen