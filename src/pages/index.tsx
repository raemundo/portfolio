import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native'
import { tw } from "~/lib/tailwind";

export default function index() {
    const { t } = useTranslation();
    return (
        <View>
            <Text style={tw`text-red-500 text-3xl text-center`}>{t('msg')}</Text>
        </View>
    )
}
