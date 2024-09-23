import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LastActivityScreen from './src/screens/LastActivity';
import MessagesScreen from './src/screens/Messages';
import TaskScreen from './src/screens/TaskScreen';


const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Tarefas" screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "#78b7f1" } }}>

          <Tab.Screen name="Mensagens" component={MessagesScreen} />
          <Tab.Screen name="Tarefas" component={TaskScreen} />
          <Tab.Screen name="Últimas Atividades" component={LastActivityScreen} />

        </Tab.Navigator>

      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
});
