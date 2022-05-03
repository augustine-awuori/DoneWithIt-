import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Card from '../components/Card'
import colors from '../config/colors'
import Button from '../components/Button'
import listingsApi from '../api/listings'
import Screen from '../components/Screen'
import AppText from '../components/AppText'
import ActivityIndicator from '../components/ActivityIndicator'

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    setLoading(true);
    const { data, ok } = await listingsApi.getListings()
    setLoading(false);

    if (!ok) return setError(true)

    setError(false)
    setListings(data)
  }

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={loadListings} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={'$' + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate('ListingDetails', item)}
          />
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    paddingBottom: 0,
    backgroundColor: colors.light,
  },
})

export default ListingsScreen
