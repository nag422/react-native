import React, { useRef } from "react";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
  Switch,
} from "react-native";
import AppbarScreen from "./AppbarScreen";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Chip,
  IconButton,
  Colors,
} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

import FormButton from "../components/FormButton";
import axiosInstance from "../axiosmodelapi";
import { AuthContext } from "../contexts/AuthContext";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";

const PaymentScreen = (props) => {
  const refRBSheet = useRef();
  const { userdata, load_user } = React.useContext(AuthContext);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [paymentloading, setPaymentloading] = React.useState(false);
  const [country, setCountry] = React.useState("IN");
  const [pricedetails, setPricedetails] = React.useState([]);
  const [tier, setTier] = React.useState(1);
  const [paymentstatus, setPaymentstatus] = React.useState(0);
  const [receipturl, setReceipturl] = React.useState(
    "https://app.kiranvoleti.com"
  );
  const [creditcardvalues, setCreditcardvalues] = React.useState({
    valid: false,
    cvc: "",
    expiry: "",
    number: "",
    type: "",
  });

  

 

  const fetchpayment = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      await axiosInstance
        .get("https://app.kiranvoleti.com/paymentrates/", config)
        .then((res) => {
          setPricedetails(res.data?.response);

          if (userdata.tier !== "") {
            setTier(userdata.tier);
          }
        }).catch(err=>{
          console.log(err.message)
        })
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchpayment();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  React.useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey:
        "pk_test_51H2GwkFM3Q6O7DuK3XgFpJhO5snlKligZL0EKLRoyynRKVIfxsPFyN0Z9KPxZmmmYJCwJY7MbnzqKgRybQpiZz7000KK2MEv5c", // Your key
      androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
      //merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });
  }, []);

  const submit = async () => {
    const params = {
      // mandatory
      number: creditcardvalues.number,
      expMonth: +creditcardvalues.expiry.split("/")[0],
      expYear: +creditcardvalues.expiry.split("/")[1],
      cvc: creditcardvalues.cvc,
      // optional
      name: "Test User",
      currency: isEnabled ? "usd" : "inr",
      addressLine1: "123 Test Street",
      addressLine2: "Apt. 5",
      addressCity: "Test City",
      addressState: "Test State",
      addressCountry: "Test Country",
      addressZip: "55555",
    };

    setPaymentloading(true);
    const token = await Stripe.createTokenWithCardAsync(params);

    const form_data = new FormData();
    form_data.append("token", token.tokenId);
    form_data.append("currency", token.card.currency);
    form_data.append("tier", tier);
    form_data.append("email", userdata.email);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      await axiosInstance
        .post("https://app.kiranvoleti.com/createcharge/", form_data, config)
        .then((res) => {
          if (+res.data.status === 200) {
            setPaymentstatus(200);
            setReceipturl(res.data.receipt);
          } else {
            setPaymentstatus(400);
          }
        });
    } catch (err) {
      setPaymentstatus(400);
      console.log(err);
    }
  };

  const _onChange = (form) => {
    setCreditcardvalues({
      ...creditcardvalues,
      valid: form.valid,
      cvc: form.status.cvc != "incomplete" ? form.values.cvc : "incomplete",
      expiry:
        form.status.expiry != "incomplete" ? form.values.expiry : "incomplete",
      number:
        form.status.number != "incomplete" ? form.values.number : "incomplete",
      type: form.values.type,
    });
  };
  const _onDone = async () => {
    const values = await submit();
    setPaymentloading(false);
    return await load_user();

    // console.log(creditcardvalues)
  };

  return (
    <>
      <AppbarScreen
        navigation={props.navigation}
        visibleform={false}
        title="Payment"
        subtitle="Plans"
      />
      <View style={styles.switcher}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>Price in {isEnabled ? "USD" : "INR"}</Text>
      </View>
      {/* <View>
      <Text>Currency {isEnabled?'usd':'inr'}</Text>
    </View> */}

      <View style={styles.Container}>
        <SafeAreaView>
          <ScrollView
            style={{ marginHorizontal: 2 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {pricedetails.map((val, index) => {
              return (
                <Card style={styles.card} key={index}>
                  <Card.Content style={{ height: 250 }}>
                    <Title style={styles.tiertext}>Tier {val.tier}</Title>
                    <Title style={styles.pricetext}>
                      {!isEnabled ? "\u20B9" : "\u0024"}
                      {isEnabled ? val.usdprice : val.price}
                      {+val.validity * 30 >= 360 ? "/Yr" : "/Mo"}
                    </Title>
                    <Title style={styles.servicetext}>{val.services}</Title>
                    {userdata.tier === val.tier ? (
                      <Text style={styles.buttontext1}>
                        Current Active Plan
                      </Text>
                    ) : (
                      <FormButton
                        buttonTitle="Buy"
                        // onPress={() => submit()}
                        onPress={() => {
                          setTier(val.tier);
                          refRBSheet.current.open();
                        }}
                        // onPress={()=>Linking.openURL('https://buy.stripe.com/test_cN2aGpaa17VlbYs4gh')}
                        style={styles.buttontext}
                      />
                    )}
                  </Card.Content>
                </Card>
              );
            })}

            {/* <Card style={styles.card}>

              <Card.Content style={{ height: 270 }}>
                <Title style={styles.tiertext}>Tier 3</Title>
                <Title style={styles.pricetext}>$13.39/yr</Title>
                <Paragraph style={styles.servicetext}>Articles,Videos,Tools</Paragraph>
                <Paragraph style={styles.servicetext}>Digital Newsletter subscription</Paragraph>

                <FormButton

                  buttonTitle="Buy"
                  onPress={() => submit()}
                  style={styles.buttontext}
                />

              </Card.Content>



            </Card> */}

            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.tiertext}>Enterprise</Title>
                <Text style={{ padding: 5 }}>
                  Are you a business or agency that's interested in managing
                  multiple DigitalUpgrade? Talk to us about our enterprise
                  plans.
                </Text>

                <FormButton
                  buttonTitle="Contact Us"
                  onPress={() =>
                    Linking.openURL("https://www.kiranvoleti.com/contact-us")
                  }
                  style={styles.buttontext2}
                />
              </Card.Content>
            </Card>

            <View style={styles.card2}></View>

            {/* <Button onPress = {()=>submit()} title="Pay now" /> */}
          </ScrollView>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={600}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent",
                },
                draggableIcon: {
                  backgroundColor: "#000",
                },
              }}
            >
              <CreditCardInput onChange={_onChange} />

              {+paymentstatus === 200 && (
                <>
                  <Text style={styles.successbutton}>PaymentSuccess</Text>

                  <FormButton
                    buttonTitle="View Receipt"
                    onPress={() => Linking.openURL(receipturl)}
                    style={styles.buttontext2}
                  />
                </>
              )}
              {+paymentstatus === 400 && (
                <Text style={styles.errorbutton}>Payment is failed</Text>
              )}

              {paymentloading ? (
                <FormButton
                  buttonTitle="Processing dont go back...."
                  style={styles.buttontext2}
                />
              ) : (
                +paymentstatus != 200 && (
                  <FormButton
                    buttonTitle="Complete Payment"
                    onPress={() => _onDone()}
                    style={styles.buttontext2}
                  />
                )
              )}

              <FormButton
                buttonTitle="Reset"
                onPress={() => setPaymentstatus(0)}
                style={styles.buttontext2}
              />

              <Text style={{ color: "grey", textAlign: "center", top: 30 }}>
                Powered by Stripe
              </Text>
            </RBSheet>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    height: "100%",
  },
  card: {
    height: 290,
    position: "relative",
    borderRadius: 5,
    margin: 5,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(3, 13, 81, 0.9)",
  },
  card2: {
    height: 270,
    position: "relative",
    backgroundColor: "transparent",
  },
  tiertext: {
    color: "#fff",
    padding: 10,
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    alignSelf: "center",

    borderRadius: 5,
    width: "100%",
  },
  pricetext: {
    fontSize: 30,
    alignSelf: "center",
    top: 20,
  },
  servicetext: {
    fontSize: 20,
    alignSelf: "center",
    flexWrap: "wrap",
    top: 40,
    color: "grey",
    textTransform: "capitalize",
    textAlign: "center",
  },
  buttontext: {
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 60,
    marginBottom: 60,
  },
  buttontext1: {
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 60,
    marginBottom: 60,
    color: "#fff",
  },
  buttontext2: {
    backgroundColor: "rgba(3, 13, 81, 0.9)",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  switcher: {
    alignItems: "center",
    justifyContent: "center",
  },
  successbutton: {
    backgroundColor: "green",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
    color: "#fff",
  },
  errorbutton: {
    backgroundColor: "red",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
    color: "#fff",
  },
});
