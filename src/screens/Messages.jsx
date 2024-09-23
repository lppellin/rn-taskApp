import { StyleSheet, Text, View } from "react-native";


export default function MessagesScreen() {

    return (
        <View style={styles.container}>
            <Text>Não há mensagens para serem lidas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})