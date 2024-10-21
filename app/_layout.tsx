import {Stack} from "expo-router";

import "../global.css"

const RootLayout=()=>{
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)/index"  />
        </Stack>
    );
}
export default RootLayout;