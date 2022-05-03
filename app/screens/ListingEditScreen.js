import React from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import { Form, FormField, FormPicker, SubmitButton } from '../components/forms'
import CategoryPickerItem from '../components/CategoryPickerItem'
import FormImagePicker from '../components/forms/FormImagePicker'
import listingsApi from '../api/listings'
import Screen from '../components/Screen'
import useLocation from '../hooks/useLocation'
import UploadScreen from '../components/UploadScreen'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
})

const categories = [
  {
    label: 'Furniture',
    value: 1,
    backgroundColor: '#fc5c65',
    icon: 'floor-lamp',
  },
  {
    label: 'Clothing',
    value: 2,
    backgroundColor: '#2bcbba',
    icon: 'shoe-heel',
  },
  { label: 'Cameras', value: 3, backgroundColor: '#fed330', icon: 'camera' },
  { label: 'Cars', value: 4, backgroundColor: '#fd9644', icon: 'car' },
  { label: 'Games', value: 5, backgroundColor: '#26de81', icon: 'cards' },
  { label: 'Sports', value: 6, backgroundColor: '#45aaf2', icon: 'basketball' },
  {
    label: 'Movies & Music',
    value: 7,
    backgroundColor: '#4b7bec',
    icon: 'headphones',
  },
]

function ListingEditScreen() {
  const location = useLocation()
  const [uploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(false)

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true)
    const { ok } = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress),
    )

    if (!ok) {
      setUploadVisible(false)
      return alert("Couldn't save the listing.")
    }

    resetForm();
  }

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: '',
          price: '',
          description: '',
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <FormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default ListingEditScreen
