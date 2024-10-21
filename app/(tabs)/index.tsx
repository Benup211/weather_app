import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIcon, Calendar } from "lucide-react-native";
import { useState, useEffect } from "react";
import { fetchLocationCoordinates } from "../services/locationData";

export default function App() {
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [apiData, setApiData] = useState<any>([]);
    const [DailyData, setDailyData] = useState<any>([]);
    useEffect(() => {
        const fetchData=async()=>{
            fetchLocationCoordinates("Lalitpur")
            .then((data) => {
                setApiData(data);
                setDailyData(data.list.slice(1, 6));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() =>{
                setIsLoading(false);
            });
        }
        fetchData();
    }, []);
    if (isLoading) {
        return (
            <View className="w-screen min-h-screen flex justify-center items-center">
                <Text className="text-white text-2xl">Loading...</Text>
            </View>
        );
    }
    return (
        <View className="w-screen min-h-screen flex">
            <ScrollView showsVerticalScrollIndicator={true}>
                <View className="flex flex-1 bg-gray-900 p-2 min-h-screen">
                    <SafeAreaView className="flex flex-1">
                        <View
                            className={`flex-row justify-end items-center rounded-full ${
                                !showSearch ? "bg-transparent" : "bg-gray-600"
                            } mt-2`}
                        >
                            {showSearch && (
                                <TextInput
                                    placeholder="Search City"
                                    placeholderTextColor={"white"}
                                    className="pl-6 h-10 flex-1 text-base text-white outline-none"
                                />
                            )}
                            <Pressable
                                className="rounded-full p-3 m-1 bg-slate-600"
                                onPress={() => {
                                    setShowSearch(!showSearch);
                                }}
                            >
                                <SearchIcon size={24} color={"#ffffff"} />
                            </Pressable>
                        </View>
                        {/* Data */}
                        <View className="mx-4 flex justify-around flex-1 mb-2 lg:justify-center  lg:items-center">
                            <Text className="text-white text-2xl text-center font-bold lg:mb-10">
                                {apiData.city.name},
                                <Text className="text-white text-lg text-center font-semibold">
                                    {apiData.city.country}
                                </Text>
                            </Text>
                            <View className="flex-row justify-center">
                                <Image
                                    source={require("../../assets/sun.png")}
                                    style={{ height: 240, width: 240 }}
                                />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-white text-6xl text-center font-bold ml-5">
                                    {(
                                        apiData.list[0].main.temp - 273.15
                                    ).toFixed(1)}
                                    °C
                                </Text>
                                <Text className="text-white text-xl text-center tracking-widest">
                                    {apiData.list[0].weather[0].description.toUpperCase()}
                                </Text>
                            </View>
                            {/* stat */}
                            <View className="flex flex-row justify-between mx-4 my-3 lg:w-80 lg:my-10">
                                <View className="flex flex-row items-center">
                                    <Image
                                        source={require("../../assets/icons/wind.png")}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text className="text-white font-semibold text-base ml-2">
                                        {apiData.list[0].wind.speed} km/h
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Image
                                        source={require("../../assets/icons/drop.png")}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text className="text-white font-semibold text-base ml-2">
                                        {apiData.list[0].main.humidity}%
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Image
                                        source={require("../../assets/icons/sun.png")}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text className="text-white font-semibold text-base ml-2">
                                        {new Date(
                                            apiData.city.sunrise * 1000
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Text>
                                </View>
                            </View>
                            {/* next few day */}
                            <View className="mb-2 space-y-3">
                                <View className="flex-row items-center mx-4 mb-4 space-x-5">
                                    <Calendar size={24} color={"white"} />
                                    <Text className="text-white text-sm">
                                        Daily Forecast
                                    </Text>
                                </View>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{
                                        paddingHorizontal: 10,
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {DailyData.map(
                                        (data: any, index: number) => {
                                            return (
                                                <View className="flex justify-center items-center w-28 rounded-3xl py-3 space-y-1 mr-4 bg-gray-600" key={index}>
                                                    <Image
                                                        source={require("../../assets/sun.png")}
                                                        style={{
                                                            height: 44,
                                                            width: 44,
                                                        }}
                                                    />
                                                    <Text className="text-white">
                                                        {new Date(
                                                            data.dt * 1000
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                weekday:
                                                                    "short",
                                                            }
                                                        )}
                                                    </Text>
                                                    <Text className="text-white text-xl font-semibold">
                                                        {(
                                                            data.main
                                                                .temp - 273.15
                                                        ).toFixed(1)}
                                                        °C
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </ScrollView>
        </View>
    );
}
