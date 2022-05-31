import { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    children: ReactNode
}

const TaskSpaceRowIconComponent: FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default TaskSpaceRowIconComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5
    }
})

