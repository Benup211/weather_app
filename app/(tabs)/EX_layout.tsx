import { Tabs } from "expo-router";
import { House } from "lucide-react-native";

const TabLayout=()=>{
    return(
        <Tabs>
            <Tabs.Screen name="index"
            options={{
                headerTitle: "Home",
                title: "Home",
                tabBarIcon: ({ color, size }:{
                    color: string;
                    size: number;
                }) => (
                    <House color={'black'}/>
                ),
                headerShown: false,
                tabBarShowLabel: false
            }}
            />
        </Tabs>
    );
}
export default TabLayout;