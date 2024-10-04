import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { fetchGists, Gist } from '../../api/fetchGists';
import GistItem from '../../components/GistItem';
import styles from './styles';

const LandingPage = () => {
    const [gists, setGists] = useState<Gist[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const screenCenter = Dimensions.get('window');
    
    const sinceDate = '2024-10-01T00:00:00Z'; // I have added sinceData const to pass the since query param.

    useEffect(() => {
        loadGists();
    }, [page]);

    const loadGists = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const newGists = await fetchGists(sinceDate, page);
            setGists((prevGists) => [...prevGists, ...newGists]);
        } catch (error) {
            console.error('Error fetching gists:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleImagePress = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        // Start fade-in animation
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, //This is where I can control FadeIn animation time
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000, //This is where I handle how long the image should stay before it fade out
                useNativeDriver: true,
            })
        ]).start(() => setSelectedImage(null));
    };

    const renderItem = ({ item }: { item: Gist }) => {
        const { owner, files } = item;
        const fileName = Object.keys(files)[0]; //This is where am taking the first file from the files object

        return <GistItem owner={owner} fileName={fileName} onImagePress={() => handleImagePress(owner.avatar_url)} />;
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Gists</Text>
            </View>
            <FlatList
                data={gists}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={5}
                removeClippedSubviews={true}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
            />
            {selectedImage && (
                <Animated.Image
                    source={{ uri: selectedImage }}
                    style={[
                        styles.centeredAvatar,
                        { opacity: fadeAnim, top: screenCenter.height / 2 - 50, left: screenCenter.width / 2 - 50 },
                    ]}
                />
            )}
        </View>
    );
};

export default LandingPage;