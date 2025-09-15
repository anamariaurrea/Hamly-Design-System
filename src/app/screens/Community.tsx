import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import { FilterChip } from '../../design-system/components/Chip/FilterChip';
import ListItemImage from '../../design-system/components/List/ListItemImage';
import { spacing } from '../../design-system/tokens/spacing';

// Mock data para la comunidad
const communityData = [
  {
    id: 1,
    title: 'Noticias de QRZ',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/qrz/200',
    likesCount: 21,
  },
  {
    id: 2,
    title: 'Artículos de interés',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/articles/200',
    likesCount: 21,
  },
  {
    id: 3,
    title: 'Noticias de Radioafición',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/radio/200',
    likesCount: 21,
  },
  {
    id: 4,
    title: 'Videos, Podcasts y Blogs',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/videos/200',
    likesCount: 21,
  },
  {
    id: 5,
    title: 'DXpediciones',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/dx/200',
    likesCount: 21,
  },
  {
    id: 6,
    title: 'Hamfest',
    author: 'VK4HAT',
    date: 'Aug 11',
    year: '2018',
    preview: 'Descripción del foro',
    imageUri: 'https://picsum.photos/seed/hamfest/200',
    likesCount: 21,
  },
];

const Community: React.FC = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Tendencia');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Map<number, number>>(
    new Map(communityData.map(item => [item.id, item.likesCount]))
  );

  const handleLikePress = (itemId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      const isCurrentlyLiked = newSet.has(itemId);

      if (isCurrentlyLiked) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }

      // Update like count
      setLikeCounts(prevCounts => {
        const newCounts = new Map(prevCounts);
        const currentCount = newCounts.get(itemId) || 0;
        if (isCurrentlyLiked) {
          newCounts.set(itemId, Math.max(0, currentCount - 1));
        } else {
          newCounts.set(itemId, currentCount + 1);
        }
        return newCounts;
      });

      return newSet;
    });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Comunidad"
          leftIconName={undefined}
          style={{
            paddingHorizontal: spacing.lg,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
          rightIcons={
            <IconButton
              icon="magnify"
              size={24}
              onPress={() => { }}
              accessibilityLabel="Buscar"
            />
          }
        />

        <View style={{ flex: 1, marginTop: 0 }}>
          {/* Filter Chips */}
          <View style={styles.filtersContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContent}
            >
              <FilterChip
                label="Tendencia"
                selected={selectedFilter === 'Tendencia'}
                onSelectedChange={() => setSelectedFilter('Tendencia')}
                leadingIcon="trending-up"
                style={styles.chip}
              />
              <FilterChip
                label="Noticias"
                selected={selectedFilter === 'Noticias'}
                onSelectedChange={() => setSelectedFilter('Noticias')}
                leadingIcon="newspaper"
                style={styles.chip}
              />
              <FilterChip
                label="Top hoy"
                selected={selectedFilter === 'Top hoy'}
                onSelectedChange={() => setSelectedFilter('Top hoy')}
                leadingIcon="chart-bar"
                showCaret={true}
                style={styles.chip}
              />
            </ScrollView>
          </View>

          {/* Community List */}
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            {communityData.map((item) => (
              <ListItemImage
                key={item.id}
                title={item.title}
                author={item.author}
                date={item.date}
                year={item.year}
                preview={item.preview}
                imageUri={item.imageUri}
                liked={likedItems.has(item.id)}
                likesCount={likeCounts.get(item.id) || 0}
                onPress={() => { }}
                onLikePress={() => handleLikePress(item.id)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  filtersContainer: {
    paddingVertical: spacing.md,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    marginRight: spacing.sm,
  },
  listContainer: {
    flex: 1,
  },
});

export default Community;
