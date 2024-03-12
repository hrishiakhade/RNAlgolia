import React, { forwardRef } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-core';

export const InfiniteHits = forwardRef(
    ({ hitComponent: Hit, ...props }, ref) => {

        const { hits, isLastPage, showMore } = useInfiniteHits({
            ...props,
            escapeHTML: false,
        });

        return (
            <FlatList
                data={hits}
                ref={ref}
                keyExtractor={(item) => item.objectID}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                onEndReached={() => {
                    if (!isLastPage) {
                        showMore();
                    }
                }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.poster_path }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                        <Hit hit={item} />
                    </View>
                )}
            />
        );
    });

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});