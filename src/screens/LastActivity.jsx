import { View, Text, StyleSheet } from 'react-native';

const LastActivityScreen = () => {


    return (
        <View style={styles.container}>

            <Text style={styles.warning}>Nenhuma atividade recente.</Text>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default LastActivityScreen