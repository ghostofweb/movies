import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      {/* Background Image - Fixed in place */}
      <ImageBackground 
        source={images.bg} 
        className="w-full h-64 absolute top-0 left-0" 
        resizeMode="cover" 
      />

      {/* Content wrapper - Remove KeyboardAvoidingView */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          minHeight: "100%",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Image 
          source={icons.logo} 
          className="w-12 h-10 mt-20 mb-5 mx-auto" 
          resizeMode="contain"
        />
        <View className="mt-5">
          <SearchBar onPress={()=>{
            router.push("/search")}
            } placeholder="Search for the movie"/>
        </View>
      </ScrollView>
    </View>
  );
}