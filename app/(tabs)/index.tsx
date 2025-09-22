import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductCategory, setSelectedProductCategory] = useState("Fashion");
  const router = useRouter();

  const categories = ["All", "Men", "Women", "Kids"];

  const productCategory = [
    { id: 1, name: "Fashion", image: require('../../assets/images/fashion.jpg') },
    { id: 2, name: "Beauty", image: require('../../assets/images/beauty.jpg') },
    { id: 3, name: "Home & Living", image: require('../../assets/images/homeandliving.jpg') },
    { id: 4, name: "Footwear", image: require('../../assets/images/footwear.jpg') },
    { id: 5, name: "Accessories", image: require('../../assets/images/accessories.jpg') },
  ];

  const brands = [
    { id: 1, name: "Nike", image: require('../../assets/images/nike.jpg') },
    { id: 2, name: "Adidas", image: require('../../assets/images/adidas.jpg') },
    { id: 3, name: "Titan", image: require('../../assets/images/titan.jpg') },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data?.products || []);
  };

  return (
    <LinearGradient
      colors={["orange", "yellow"]} // top → bottom
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, paddingTop: 40 }}>
        {/* 🔹 Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={20} color="black" />
            <Text style={styles.headerText}>Deliver to, 452001</Text>
          </View>

        </View>

        {/* Location + Search */}
        <View style={styles.locationAndSearchContainer}>
          <View style={styles.searchandIconsContainer}>
            <View style={styles.myntraImageContainer}>
              <Image
                source={require('../../assets/images/myntraLogo.png')}
                style={{ width: 35, height: 35 }}
              />
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Search"
                  style={styles.searchInput}
                />
                <EvilIcons name="search" size={24} color="black" />
              </View>
            </View>
            <View style={styles.bellAccountContainer}>
              <TouchableOpacity>
                <AntDesign name="bell" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <EvilIcons name="heart" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="account" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 🔹 Categories */}
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                { borderBottomColor: item === selectedCategory ? "red" : "transparent" },
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={{ color: item === selectedCategory ? "red" : "black", fontSize: 16 }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* 🔹 Product Category */}
        <FlatList
          data={productCategory}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedProductCategory(item.name)} style={styles.productCategory}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={{ textAlign: "center", marginTop: 10, fontSize: 15, color: selectedProductCategory === item.name ? "red" : "black" }}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* 🔹 Brands */}
        <FlatList
          data={brands}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          renderItem={({ item }) => (
            <View style={styles.brandCard}>
              <Image source={item.image} style={styles.brandImage} />
              <Text style={styles.brandText}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* 🔹 Products Grid */}
        <FlatList
          data={products}
          keyExtractor={(item:any) => item?.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }:any) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: "/product",
                  params: { item: JSON.stringify(item) },
                })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.productThumb} />
              <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
                {item?.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="rupee" size={14} color="black" />
                <Text>{item?.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: { fontSize: 14, fontWeight: "bold" },
  walletContainer: { flexDirection: "row", alignItems: "center" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "red",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  iconsRow: { flexDirection: "row", gap: 8 },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    marginLeft: 10,
  },
  productCategory: { alignItems: "center", margin: 10 },
  productImage: { width: 100, height: 100, borderRadius: 10 },
  brandCard: { width: 410, margin: 10, borderRadius: 8, overflow: "hidden" },
  brandImage: { width: "100%", height: 200 },
  brandText: {
    textAlign: "center",
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#333",
    color: "white",
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  productThumb: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  locationAndSearchContainer: {
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  locationandRupeeContainer: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliverToText: { fontSize: 16, color: 'black' },
  locationText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  rupeeContainer: {
    width: '15%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rupeeText: { fontSize: 16, color: 'black', marginLeft: 5 },
  searchandIconsContainer: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myntraImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '75%',
    height: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  searchInput: { height: '100%', width: '80%', paddingHorizontal: 10 },
  bellAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    height: '90%',
    borderRadius: 10,
    justifyContent: 'space-around',
    paddingLeft: 5,
  },



});
