import { StyleSheet, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// import firebase and firestore
import { initializeApp } from 'firebase/app'
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore'

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

export default function App() {
    const connectionStatus = useNetInfo();

    // Web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAfHH4_emhXuXu2xkqxH5xVQhJbEGUCUaU",
        authDomain: "shopping-list-demo-1.firebaseapp.com",
        projectId: "shopping-list-demo-1",
        storageBucket: "shopping-list-demo-1.appspot.com",
        messagingSenderId: "830011648135",
        appId: "1:830011648135:web:1173d5d624b5fdf46d3022"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);


    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!");
            disableNetwork(db);
        } else {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen
                    name='ShoppingLists'
                >
                    {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
