import { StyleSheet, Text, View } from "react-native"


const CurrentDate = () => {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let currentDate = new Date().toLocaleDateString('pt-BR', options);

    // Função para deixar a primeira letra maiúscula
    currentDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{currentDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CurrentDate;



