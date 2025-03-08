import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{title:"Search"}}/>
      <Tabs.Screen name="profile" options={{title:"Profile"}}/>
      <Tabs.Screen name="saved" options={{title:"Saved"}}/>
    </Tabs>
  );
}
