import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-full z-0" />

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50, // Ensures space at the bottom
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        
      </ScrollView>
    </View>
  );
}
