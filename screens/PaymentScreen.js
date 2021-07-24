// App.ts
import React, { useState, useEffect } from 'react'
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
    Alert,
    Image
} from "react-native";
import {

    Card,
    Title
} from "react-native-paper";
import { StripeProvider, CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import AppbarScreen from './AppbarScreen';
import RBSheet from "react-native-raw-bottom-sheet";
import axiosInstance from "../axiosmodelapi";
import { AuthContext } from "../contexts/AuthContext";
import FormButton from "../components/FormButton";


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// PaymentScreen.ts


export default function PaymentScreen(props) {
    const { userdata, load_user } = React.useContext(AuthContext);
    const { confirmPayment, loading } = useConfirmPayment();
    const refRBSheet = React.useRef();
    const [tier, setTier] = React.useState(1);
    const [pricedetails, setPricedetails] = React.useState([]);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [pyamentIntentsecret, setPyamentIntentsecret] = React.useState('')
    const [paymentstatus, setPaymentstatus] = React.useState(0);
    const [paymentloading, setPaymentloading] = React.useState(false);
    const [pyamentintentid, setPyamentintentid] = React.useState(null)
    const [receipturl, setReceipturl] = React.useState(
        "https://app.kiranvoleti.com"
    );
    const [carddetails, setCarddetails] = React.useState({


        brand: "Visa",
        complete: false,
        expiryMonth: "04",
        expiryYear: "24",
        last4: "4242",
        postalCode: "534341",

    })


    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    // Fetching Data...
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
                }).catch(err => {
                    console.log(err.message)
                })
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchpayment();
    }, []);


    const fetchPaymentSheetParams = async (valtier) => {
        const API_URL = "https://app.kiranvoleti.com"
        const tokendetail = await AsyncStorage.getItem('logindetails');
        const parseditem = JSON.parse(tokendetail);

        if(+valtier == 1){
            setPyamentIntentsecret('dummy')
            
            return
        }

        await axios.post(`${API_URL}/rncheckout/`, {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${parseditem.access}`,
            },
        })
            .then(response => {
                const { client_secret, pyamentintent_id } = response.data;

                setPyamentintentid(pyamentintent_id)
                setPyamentIntentsecret(client_secret)

            })


    };




    // useEffect(() => {
    //     fetchPaymentSheetParams();
    // }, []);


    const paysubmit = async () => {

        setPaymentloading(true);
        const { paymentIntent, error } = await confirmPayment(pyamentIntentsecret, {
            type: 'Card', billingDetails: {
                email: userdata.email,
            }
        })
        if (error) {
            setPaymentstatus(400);

            Alert.alert('Error', 'You must provide valid card Details!')


        } else {
            setPaymentstatus(200);

            const form_data = new FormData();
            form_data.append("tier", tier);
            form_data.append("paymentintent_id", pyamentintentid);


            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            };

            
                await axiosInstance
                    .post("https://app.kiranvoleti.com/thanksmobile/", form_data, config)
                    .then((res) => {
                        
                        if (+res.data.status === 200) {

                            setReceipturl(res.data.receipt);
                        } else {

                            setReceipturl(receipturl)
                        }
                    }).catch(err=>{

                        console.log(err.message)
                Alert.alert('ViewRecipt', 'Login to your account in chrome Browser for receipt!')

                    });
            





        }



    }


    const _onDone = async () => {
        const values = await paysubmit();
        setPaymentloading(false);
        return await load_user();

        // console.log(creditcardvalues)
    };


    return (
        <><AppbarScreen navigation={props.navigation} visibleform={false} title="Payment" subtitle='Plans' />

            <View style={styles.switcher}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>Price in {isEnabled ? "USD" : "INR"}</Text>



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
                                            ) : +val.tier != 1 ?(
                                                <FormButton
                                                    buttonTitle="Buy"
                                                    // onPress={() => submit()}
                                                    onPress={() => {
                                                        setTier(val.tier);
                                                        fetchPaymentSheetParams(val.tier)
                                                        refRBSheet.current.open();
                                                    }}
                                                    // onPress={()=>Linking.openURL('https://buy.stripe.com/test_cN2aGpaa17VlbYs4gh')}
                                                    style={styles.buttontext}
                                                />
                                            ):null
                                            }
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
                                closeOnPressBack={true}
                                animationType="slide"
                                openDuration={600}
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
                            {/* <View style={{alignSelf:'flex-end',paddingEnd:20}}><Text style={{fontSize:20}}>&times;</Text></View> */}
                        
                                {/* Card */}
                                <Image
        style={{width: '30%',height:50,resizeMode:'contain',marginLeft:15}}
        source={require('../assets/imgs/stripebutton.png')} />

                                <View style={{backgroundColor:'#2e64e515',padding:10,marginBottom:10}}>
                                    
                                    

                                    
                                

                                <StripeProvider
                                    publishableKey='pk_live_V2A8RjOAB3v7ZYyDN6vBoPCh00oMSoiKEw'

                                >
                                    <CardField
                                        postalCodeEnabled={true}
                                        placeholder={{
                                            number: '4242 4242 4242 4242',
                                        }}
                                        cardStyle={{
                                            backgroundColor: '#FFFFFF',
                                            textColor: '#000000',
                                            borderWidth: 2,
                                            borderColor: 'grey'
                                        }}
                                        style={{
                                            width: '99%',
                                            height: 50,
                                            marginVertical: 60

                                        }}
                                        onCardChange={(cardDetails) => {
                                            setCarddetails({
                                                ...carddetails,
                                                brand: cardDetails.brand,
                                                complete: cardDetails.complete,
                                                expiryMonth: cardDetails.expiryMonth,
                                                expiryYear: cardDetails.expiryYear,
                                                last4: cardDetails.last4,
                                                postalCode: cardDetails.postalCode
                                            });
                                        }}
                                        onFocus={(focusedField) => {
                                            console.log('focusField', focusedField);
                                        }}
                                    />
                                </StripeProvider>

                                </View>


                                {/* end card */}

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
                                            disabled={loading}
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









            </View>

        </>
    );
}

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
