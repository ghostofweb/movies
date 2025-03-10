import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text } from "react-native";

const TabIcon = ()=>{
  return(
    <ImageBackground source={images.highlight} className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center overflow-hidden">
    <Image source={icons.home}/>
     <Text className="text-secondary text-base font-semibold mg-2">Home</Text>
  </ImageBackground>
  )
}
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home",tabBarIcon:({focused})=>(
        <>
        <TabIcon/>
       </>
      ) }} />
      <Tabs.Screen name="search" options={{title:"Search", }}/>
      <Tabs.Screen name="profile" options={{title:"Profile"}}/>
      <Tabs.Screen name="saved" options={{title:"Saved"}}/>
    </Tabs>
  );
}
