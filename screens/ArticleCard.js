import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ArticleCard = ({item}) => (
    
  <Card>
    <Card.Title title={item.title} subtitle="its ming" left={LeftContent} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph>{item.description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/300' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  
);

export default ArticleCard;