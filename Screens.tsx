import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Home from "~/screens/Home";



const screenList = [
    { name: "Home", Screen: Home },
];


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Screens() {
    return (
        <Stack.Navigator initialRouteName="OkLoginPage">
            {screenList.map(({ name, Screen }, idx) => (
                <Stack.Screen key={idx} name={name}>
                    {(props) => (
                        <Screen {...props} />
                    )}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
};