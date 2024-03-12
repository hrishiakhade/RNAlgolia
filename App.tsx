import React, { useRef } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-core';
import { SearchBox } from './SearchBox';
import { InfiniteHits } from './InfiniteHits';
import { ALGOLIA_APP_ID } from "@env"

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);

function Hit({ hit }: { hit: any }) {
  return (
    <Text style={{ color: 'black', flex: 1 }}>{hit.title}</Text>
  );
}

export default function App() {
  const listRef = useRef<FlatList>(null);
  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="movie">
          <SearchBox onChange={scrollToTop} />
          <InfiniteHits hitComponent={Hit} ref={listRef} />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
});
