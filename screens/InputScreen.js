import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { Divider,Card } from 'react-native-paper';
const InputScreen = () => {
    const [category,setCategory] = React.useState('Articles')
    const [order,setOrder] = React.useState('newest')
    return (
        <>
        <Card>
        <Card.Content>
        <RNPickerSelect
            value={category}
            onValueChange={(value) => setCategory(value)}
            items={[
                { label: 'Articles', value: 'Articles' },
                { label: 'Videos', value: 'Videos' },
                { label: 'Tools', value: 'Tools' },
            ]}
        />
        <Divider />
        <RNPickerSelect
            value={order}
            onValueChange={(value) => setOrder(value)}
            items={[
                { label: 'newest', value: 'newest' },
                { label: 'oldest', value: 'oldest' }
            ]}
        />
        </Card.Content>
        </Card>
        </>
    );
};

export default InputScreen;