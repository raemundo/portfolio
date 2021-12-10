import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native'
import { tw } from "~/lib/tailwind";
import Card from "~/component-lib/Card";

export default function index() {
    const { t } = useTranslation();
    return (
        <>
            <View style={tw`mx-auto w-1/2`}>
                <Card><Text style={tw`dark:text-white text-center text-2xl`}>About me</Text></Card>
                <Card><Text style={tw`dark:text-white text-center text-2xl`}>Skills</Text></Card>
                <Card><Text style={tw`dark:text-white text-center text-2xl`}>Projects</Text></Card>
                <Card><Text style={tw`dark:text-white text-center text-2xl`}>Testimonials</Text></Card>
                <Card><Text style={tw`dark:text-white text-center text-2xl`}>Contact</Text></Card>
            </View>
        </>
    )
}
