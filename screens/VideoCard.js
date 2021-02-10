import * as React from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Chip, IconButton, Colors } from 'react-native-paper';

import moment from 'moment';

const LeftContent = props => <Avatar.Icon {...props} icon="earth" />




const VideoCard = (props) => {

  const { dataitem, sharescreen, statechanger, navigation } = props
  // const navigation = useNavigation();

  return (
    <>



      <Card>
        <Card.Cover onTouchEnd={() => sharescreen((dataitem.URL).split('?')[1].replace('v=', ''))} source={{ uri: dataitem.image ? dataitem.image : 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg' }} />
        {/* <Card.Title style={{fontSize:15,fontFamily:'Raleway-Regular'}} title={dataurl} left={LeftContent} /> */}
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', top: 8 }}>
            <View style={{ marginLeft: 6, top: 2 }}>
              <Avatar.Icon icon="earth" size={30} style={{ color: 'gray', backgroundColor: 'white' }} />
            </View>
            <View>

              <Text style={{ fontSize: 15, fontFamily: 'Raleway-Regular', color: 'gray' }}>
                <Text onTouchEnd={() => navigation.navigate('webview', { url: `https://www.youtube.com/channel/${dataitem.channelId}` })}>

                  {dataitem.channel_title.slice(0, 20)}
                </Text>
              </Text>
            </View>
          </View>
          <Card.Content>
            <View style={{ flex: 1, top: 16 }}>
              <Paragraph onTouchEnd={() => sharescreen((dataitem.URL).split('?')[1].replace('v=', ''))} style={{ fontSize: 20, fontFamily: 'Raleway-SemiBold', lineHeight: 25 }}>{dataitem.title}</Paragraph>
              {/* <Paragraph>{dataitem.time_elapsed}</Paragraph> */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                <View>
                  <IconButton
                    icon="tag-outline"
                    color='gray'
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                </View>


                {(dataitem.keytags).map((val, index) => <Chip onPress={() => statechanger(val)} style={styles.tags} key={index}>{val}</Chip>)}

              </View>
            </View>
          </Card.Content>

          <Card.Actions>
            <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
            <View style={styles.datestyle}>
              <View style={{ top: 2 }}>
                <IconButton
                  icon="alarm"
                  color='gray'
                  size={18}

                />
              </View>

              <View>
                <Text style={{ fontSize: 15, fontFamily: 'Raleway-Regular', color: 'gray' }}> {moment(dataitem.time_elapsed, 'YYYY-MM-DD h:mm:ss').fromNow()} </Text>
              </View>
            </View>

            <View style={styles.viewstyle}>
              <View style={{ top: 3 }}>
                <IconButton
                  icon="eye-outline"
                  color='gray'
                  size={18}

                />
              </View>

              <View>
                <Text style={{ fontSize: 15, fontFamily: 'Raleway-Regular', color: 'gray' }}> {dataitem.views} </Text>
              </View>
            </View>

            </View>
          </Card.Actions>
        </View>
      </Card>
    </>
  )
};

export default VideoCard;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // marginTop: StatusBar.currentHeight || 0,
  },
  tags: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    color: '#fff',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  datestyle: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  viewstyle: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  absoluteFillobject: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',

    justifyContent: "center",

  },

  loginform: {
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  }
});