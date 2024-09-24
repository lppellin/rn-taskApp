import { Alert, Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import TaskCard from "../components/TaskCard";
import CurrentDate from "../components/CurrentDate";
// import tarefas from "../../listatarefas";
import { storeData, getData } from '../services/storage';

function TaskScreen() {
    const [modalVisible, setModalVisible] = useState(false)
    const [inputNome, setInputNome] = useState('');
    const [inputDescricao, setInputDescricao] = useState('');
    const [inputData, setInputData] = useState('');

    const [search, setSearch] = useState("")

    const [tarefas, setTarefas] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const existingTasks = await getData('tarefas');
            setTarefas(existingTasks ? existingTasks : []);
        };

        fetchTasks();
    }, []);


    const handleDateInput = (text) => {
        // Adiciona automaticamente as barras "/" à medida que o usuário digita
        let formattedText = text.replace(/\D/g, ''); // Remove tudo que não for número
        if (formattedText.length > 2) {
            formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
        }
        if (formattedText.length > 5) {
            formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5, 9)}`;
        }
        setInputData(formattedText);
    };


    const saveTask = async () => {
        // Validação dos inputs
        if (!inputNome || !inputDescricao || !inputData) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
            console.log('preencha todos os campos');
            return; // Interrompe a execução se algum campo estiver vazio
        }
        const newTask = {
            id: Date.now(),
            nome: inputNome,
            descricao: inputDescricao,
            data: inputData,
            status: false
        };

        try {
            const existingTasks = await getData('tarefas');
            const tarefas = existingTasks ? existingTasks : [];
            tarefas.push(newTask);
            await storeData('tarefas', tarefas);
            // Limpa os inputs
            setInputNome('');
            setInputDescricao('');
            setInputData('');

            setTarefas(tarefas); // Atualiza o estado das tarefas
            setModalVisible(false); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao salvar a tarefa', error);
        }
    };

    const filteredTasks = tarefas.filter(tarefa =>
        tarefa.nome.toLowerCase().includes(search.toLowerCase()) ||
        tarefa.descricao.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <View style={styles.container}>
            <View>
                <CurrentDate />
            </View>

            <View style={styles.tasksBar}>
                <TextInput style={styles.searchInput} placeholder='Buscar tarefa' onChangeText={setSearch} value={search} />
                <Button title='Criar Tarefa' onPress={() => setModalVisible(true)} />
            </View>


            <View style={styles.taskList}>
                <ScrollView >
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(tarefa => (
                            <TaskCard
                                key={tarefa.id}
                                nome={tarefa.nome}
                                descricao={tarefa.descricao}
                                status={tarefa.status}
                                data={tarefa.data}
                            />
                        ))
                    ) : (
                        <Text style={styles.warning}>Nenhuma tarefa encontrada.</Text>
                    )}
                </ScrollView>
            </View>


            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nova Tarefa</Text>
                        <TextInput
                            placeholder='Nome da Tarefa'
                            value={inputNome}
                            onChangeText={setInputNome}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Descrição da Tarefa'
                            value={inputDescricao}
                            onChangeText={setInputDescricao}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Data (dd/mm/aaaa)'
                            value={inputData}
                            onChangeText={handleDateInput}
                            keyboardType='numbers-and-punctuation'
                            maxLength={10} // Limita o input a 10 caracteres (dd/mm/aaaa)
                            style={styles.input}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title='Cancelar' onPress={() => setModalVisible(false)} />
                            <Button title='Salvar' onPress={saveTask} />
                        </View>
                    </View>
                </View>
            </Modal>




        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    warning: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },


    tasksBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginRight: 10
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 10

    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    taskList: {
        flex: 1,
        width: '90%',
        paddingHorizontal: 20
    },

});



export default TaskScreen