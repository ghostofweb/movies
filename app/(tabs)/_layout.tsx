import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { ImageBackground } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home",tabBarIcon:({focused})=>(
        <>
        <ImageBackground source={images.highlight}/>
        </>
      ) }} />
      <Tabs.Screen name="search" options={{title:"Search",}}/>
      <Tabs.Screen name="profile" options={{title:"Profile"}}/>
      <Tabs.Screen name="saved" options={{title:"Saved"}}/>
    </Tabs>
  );
}
