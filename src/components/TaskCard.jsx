import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";


export default function TaskCard({ nome, descricao, status, data }) {

    const [isChecked, setChecked] = useState(status);

    return (
        <View style={styles.card}>
            <Text>Nome: {nome}</Text>
            <Text>Descricao: {descricao}</Text>
            <View style={styles.checkbox}>
                <Text>Data: {data}</Text>
                <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e8e8e8',
        height: 'auto',
        padding: 14,
        borderRadius: 8,
        marginBottom: 10
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    }
})