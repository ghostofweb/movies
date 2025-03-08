import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-light-100 font-bold">Welcome</Text>
      <Link href={"/movies/[id]"}>HEllo world</Link>
    </View>
  );
}
