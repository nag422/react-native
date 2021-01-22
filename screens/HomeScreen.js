import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar,Surface,Text, Avatar, Button, Card, Title, Paragraph, Divider,Dialog, Portal } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const HomeScreen = () => {
    const [active, setActive] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    return (
        <>     
        
    
<ScrollView>
    <Surface style={styles.surface}>
        <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  <Divider />
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    
  </Surface>
  
  </ScrollView>
  
  
  
  </>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    bottom: {
      position: 'absolute',
      left: 0,      
      right: 0,
      bottom: 0,
    },
    surface: {
        top:40,
        padding: 8,        
        elevation: 4,
      }
  });
