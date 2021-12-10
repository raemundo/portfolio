import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import OkCommunitiesPage from "~/screens/OkCommunitiesPage"
import OkCommunityProfile from "~/screens/OkCommunityProfile"
import OkHashtagPage from "~/screens/OkHashtagPage"
import OkLoginPage from "~/screens/OkLoginPage"
import OkMenuPage from "~/screens/OkMenuPage"
import OkNotificationsPage from "~/screens/OkNotificationsPage"
import OkNowPage from "~/screens/OkNowPage"
import OkPostPage from "~/screens/OkPostPage"
import OkRegisterPage from "~/screens/OkRegisterPage"
import OkRequestPasswordResetPage from "~/screens/OkRequestPasswordResetPage"
import OkResetPasswordPage from "~/screens/OkResetPasswordPage"
import OkTimelinePage from "~/screens/OkTimelinePage"
import OkUserProfilePage from "~/screens/OkUserProfilePage"


const screenList = [
    { name: "OkCommunitiesPage", Screen: OkCommunitiesPage },
    { name: "OkCommunityProfile", Screen: OkCommunityProfile },
    { name: "OkHashtagPage", Screen: OkHashtagPage },
    { name: "OkLoginPage", Screen: OkLoginPage },
    { name: "OkMenuPage", Screen: OkMenuPage },
    { name: "OkNotificationsPage", Screen: OkNotificationsPage },
    { name: "OkNowPage", Screen: OkNowPage },
    { name: "OkPostPage", Screen: OkPostPage },
    { name: "OkRegisterPage", Screen: OkRegisterPage },
    { name: "OkRequestPasswordResetPage", Screen: OkRequestPasswordResetPage },
    { name: "OkResetPasswordPage", Screen: OkResetPasswordPage },
    { name: "OkTimelinePage", Screen: OkTimelinePage },
    { name: "OkUserProfilePage", Screen: OkUserProfilePage },
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