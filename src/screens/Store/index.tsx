import React from "react";
import { RefreshControl, ScrollView, Text, View, Image } from "react-native";
import { ListedNFT, NftData } from "../../type";
import { ImageBackground } from 'react-native';
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
} from "wagmi";
import { styles } from "./styles";
import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
// import { WriteContract } from '../../components/WriteContract';

import { bscTestnet } from "wagmi/chains";
import NFTCard from "../../components/NFTCard";
import { WriteContract } from "../../components/WriteContract";
import { useStateContext } from "../../context";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../redux";
import { useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import Header from "../../components/Header";

const Store: React.FC = () => {
  const {
    isConnected,
    address,
    listedNfts,
    userTokenBalance,
    fetchListedNfts,
    userNfts,
    fetchUserNfts,
    tokenIdsOwnedByUser,
  } = useStateContext();

  const birdAddress = getBirdAddress();
  const birdABI = getBirdAbi();

  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();

  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();

  const dispatch = useDispatch();
  const { setListedNfts, setUserNfts } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.fetch);

  const [refreshing, setRefreshing] = React.useState(false);

  const { data: marketBalance } = useContractRead({
    address: birdAddress as any, // Bird address
    abi: birdABI,
    functionName: "balanceOf",
    args: [marketPlaceAddress as any],
    enabled: true,
    watch: true,
  });

  const { data: ronBalance } = useBalance({
    address: address,
    watch: true,
  });


  const { data: userNftBalance } = useContractRead({
    address: birdAddress as any, // Bird address
    abi: birdABI,
    functionName: "balanceOf",
    args: [marketPlaceAddress as any],
    enabled: true,
    watch: true,
  });

  const { data: nfts } = useContractRead({
    address: marketPlaceAddress as any,
    abi: birdMarketPlaceABI,
    functionName: "getListedNfts",
    enabled: true,
    watch: true,
    onSuccess(data) {
      fetchListedNfts(nfts);
    },
  });

  const birdContract = {
    address: birdAddress,
    abi: birdABI,
  };


  const { data: usersNftInfo } = useContractRead({
    address: birdAddress as any,
    abi: birdABI,
    functionName: "getAllTokensOwnedBy",
    args: [address],
    enabled: true,
    watch: true,
    onSuccess() {
      fetchUserNfts(usersNftInfo);
    }
  });

  React.useEffect(() => {
    console.log("UI Realoading...");
    fetchListedNfts(nfts);
    fetchUserNfts(usersNftInfo);
  }, [marketBalance, userNftBalance, nfts]);

  const onRefresh = React.useCallback(() => {
    fetchListedNfts(nfts);
    fetchUserNfts(usersNftInfo);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const navigation = useNavigation<NavigationProp<any>>();
  const handleCardPress = (nft: any, index: number) => {

    navigation.navigate("NftDetail", { data: nft, id: nfts[index]?.tokenId, price: nfts[index]?.price as any });
  };

  const handleDetailListPress = (nft: any, id: any) => {

    navigation.navigate("NftDetailList", { data: nft, id: id });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background_Store.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header address={address} screenName="Store" />

        <View style={styles.connectedView}>
          {/* FLP Balance */}
          {/* <View style={styles.card}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Text>Your FLP Balance </Text>
              <Image
                source={require('../../../src/assets/images/medal_gold.png')}
                style={styles.iconCoin}
              />
              <Text>
                {" "}
                {parseFloat((userTokenBalance as any)?.toString()) / 1e18}
              </Text>
            </View>
          </View> */}

          {/* RON balance */}
          {/* <View style={styles.card}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Text>Your RON Balance </Text>
              <Image
                source={require('../../../src/assets/images/ronin_logo.png')}
                style={styles.iconCoin}
              />
              <Text>
                {" "}
                {parseFloat((ronBalance?.value as any)?.toString()) / 1e18}
              </Text>
            </View>
          </View> */}

          {/* Trend now block */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 15, color: "white" }}>Trending Now </Text>
              <Image
                source={require('../../../src/assets/images/fire.png')}
                style={{ width: 7, height: 14 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: "white", marginRight: 5 }}>See More</Text>
              <ChevronDownIcon size={15} color="white" />
            </View>

          </View>
          <View style={styles.card}>
            {/* <Text>NFT for sells:</Text> */}

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20 }}
            >
              {state.listedNfts && state?.listedNfts.length > 0 ? (
                state.listedNfts?.map((nft, index) => {
                  return (
                    <NFTCard
                      key={index}
                      nft={nft?._j}
                      isLoading={false}
                      id={nfts[index]?.tokenId}
                      price={nfts[index]?.price as any}
                      isTransfer={true}
                      isList={false}
                      onPress={() => handleCardPress(nft, index)}
                    />
                  );
                })
              ) : (
                <Text>No Collectibles</Text>
              )}
            </ScrollView>
          </View>

           <View style={styles.card}>
            <Text>Your NFT:</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20 }}
            >
              {state?.userNfts && state?.userNfts.length > 0 ? (
                state?.userNfts?.map((nft, index) => {

                  return (
                    <NFTCard
                      key={index}
                      nft={nft?.tokenUrl?._j}
                      isLoading={false}
                      id={nft?.tokenId}
                      price={1200000}
                      isTransfer={false}
                      isList={true}
                      onPress={() => handleDetailListPress(nft, nft?.tokenId)}
                    />
                  );
                })
              ) : (
                <Text>No Collectibles</Text>
              )}
            </ScrollView>
          </View> 

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { Store };
