import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/addToCart";

const { width } = Dimensions.get("window");

export default function Product() {
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) : null;
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleAddToCart = () => {
    // console.log("15 -- item in product - ", item);
    if (item) {
      dispatch(addToCart(item));
      router.push("/bag");
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / width);
    setActiveIndex(currentIndex);
  };

  const renderPagination = () => {
    const images = item?.images;
    if (!images || !Array.isArray(images) || images.length === 0) return null;

    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index: any) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const productImages = Array.isArray(item.images)
    ? item.images
    : [item.thumbnail];
    
  const productSizes = Array.isArray(item.sizes) ? item.sizes : [];

  return (
    <View style={styles.container}>
      <View style={styles.imageGalleryContainer}>
        <FlatList
          ref={flatListRef}
          data={productImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item: imageUri }) => (
            <Image
              source={{ uri: imageUri }}
              style={styles.productImage}
              resizeMode="contain"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {renderPagination()}
      </View>

      <View style={styles.detailsContainer}>
        {/* Product Info Section */}
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>

        {/* Price and Discount Section */}
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>
            <FontAwesome name="rupee" size={16} color="#000" />
            {item.price}
          </Text>
          {item.mrp && (
            <Text style={styles.originalPrice}>
              <FontAwesome name="rupee" size={12} color="gray" />
              {item.mrp}
            </Text>
          )}
          {item.discountPercentage && (
            <Text style={styles.discountPercentage}>
              {item.discountPercentage}% OFF
            </Text>
          )}
        </View>

        {/* Ratings and Reviews */}
        <View style={styles.ratingContainer}>
          {item.rating && (
            <Text style={styles.ratingText}>
              <FontAwesome name="star" size={14} color="gold" />
              {item.rating}
            </Text>
          )}
          {item.reviews && (
            <Text style={styles.reviewsText}>{item.reviews.length} reviews</Text>
          )}
        </View>

        {/* Size Selection Section */}
        {productSizes.length > 0 && (
          <View style={styles.sizeSection}>
            <Text style={styles.sectionHeader}>Select Size</Text>
            <View style={styles.sizeOptionsContainer}>
              {productSizes.map((size: any) => (
                <TouchableOpacity key={size.name} style={styles.sizeButton}>
                  <Text style={styles.sizeButtonText}>{size.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Action Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    paddingBottom: 20,
  },
  imageGalleryContainer: {
    height: "60%",
  },
  productImage: {
    width: width,
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "blue",
  },
  detailsContainer: {
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    elevation: 5,
  },
  brandText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 10,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: "gray",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  discountPercentage: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  reviewsText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  sizeSection: {
    marginVertical: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeButtonText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  buyNowButton: {
    backgroundColor: "#ff9f00",
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});