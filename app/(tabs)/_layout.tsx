import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View, StyleSheet, StatusBar } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

function TabIcon({ focused, icon, title }: any) {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full flex-1 min-w-[114px] min-h-20 mt-4 justify-center items-center rounded-full overflow-hidden mr-2"
    >
      <Image source={icon} tintColor="#151312" className="size-5" />
      <Text className="text-secondary text-base font-semibold ml-2">
        {title}
      </Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <>
      {/* Place StatusBar at the top level of the component */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ImageBackground source={images.bg} style={styles.background}>
        <View style={styles.container}>
          <Tabs
            screenOptions={{
              tabBarShowLabel: false,
              tabBarItemStyle: {
                justifyContent: "center",
                alignItems: "center",
              },
              tabBarStyle: {
                backgroundColor: "#0F0D23",
                borderRadius: 10,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#0F0D23",
              },
              headerStyle: {
                backgroundColor: "#000000", // Black header
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: "#FFFFFF", // White text for header if needed
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} icon={icons.home} title="Home" />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} icon={icons.search} title="Search" />
                ),
              }}
            />
            <Tabs.Screen
              name="saved"
              options={{
                title: "Save",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} icon={icons.save} title="Save" />
                ),
              }}
            />
          </Tabs>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
});