import React from 'react'
import { View, Text } from 'react-native'
import twi, { tw } from "~/lib/tailwind";

export default function Divider() {
    return (
        <View style={tw`flex-row mt-5 border-t border-gray-400 dark:border-gray-900`}></View>
    )
}
