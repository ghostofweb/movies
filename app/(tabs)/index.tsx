import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      {/* Background Image - Keep outside KeyboardAvoidingView */}
      <ImageBackground 
        source={images.bg} 
        className="w-full h-full absolute top-0 left-0"
        resizeMode="cover"
      />

      {/* Content wrapper - Only what needs to shift up */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
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
            <SearchBar />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}