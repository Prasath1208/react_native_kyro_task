import React from 'react';
import {View, StatusBar} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
function CustomSafeArea(props) {
  const CustomStatusBar = ({
    backgroundColor,
    barStyle = 'dark-content',
    //add more props StatusBar
  }) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{height: insets.top, backgroundColor}}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={props.backgroundColor} />
      <View style={props.style}>{props.children}</View>
    </SafeAreaProvider>
  );
}

export default CustomSafeArea;
