import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { UserCircleIcon, ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

interface HeaderData {
    address: string;
    screenName: string; // Thêm prop mới
}

interface HeaderData {
    address: string;
    screenName: string;
}

const Header: React.FC<HeaderData> = ({ address, screenName }) => {
    const navigation = useNavigation();

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const getScreenDescription = (screenName: string) => {
        switch (screenName) {
            case 'Swap':
                return 'Swap your coins';
            case 'Store':
                return 'NFT Collection';
            case 'Owns':
                return 'Your NFT';
            default:
                return 'Welcome';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.blockHeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftCircleIcon color='black' size="30" />
                </TouchableOpacity>
                <Text style={styles.Address}>{shortenAddress(address)}</Text>
                <UserCircleIcon color='black' size="40" />
            </View>
            <View style={styles.screenDescription}>
                <Text style={[styles.description]}>
                    {getScreenDescription(screenName)}
                </Text>
            </View>
        </View>
    );
};

export default Header;
