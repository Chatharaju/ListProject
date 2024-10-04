import React from "react";
import { View, Text, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Styles from './Styles'

interface GistItemProps {
  owner: {
    avatar_url: string;
  };
  fileName: string;
  onImagePress: () => void;
}

const GistItem: React.FC<GistItemProps> = ({ owner, fileName, onImagePress }) => {
  return (
    <TouchableOpacity onPress={onImagePress}>
      <View style={Styles.gistItem}>
        <Image source={{ uri: owner.avatar_url }} style={Styles.avatar} />
        <Text style={Styles.fileName}>{fileName}</Text>
      </View>
    </TouchableOpacity>
  );
};

//I am adding this to do custom comparison for Advanced Memoization. This way I have more control over re-render logic
export default React.memo(GistItem, (prevProps, nextProps) => {
  return (
    prevProps.owner.avatar_url === nextProps.owner.avatar_url &&
    prevProps.fileName === nextProps.fileName &&
    prevProps.onImagePress === nextProps.onImagePress
  );
});