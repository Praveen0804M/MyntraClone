import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../redux/slices/addToCart";

export default function BagScreen() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: any) => state.addToCart.cart);
  // console.log("12 -- cartProducts - ", cartProducts);
  const router = useRouter();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (item: any) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.title}" from the cart?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(removeFromCart(item.id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const itemQuantity = item?.quantity ? Number(item.quantity) : 1;
    const itemPrice = Number(item?.price);
    const subtotal = (itemPrice * itemQuantity).toFixed(2);

    return (
      <View style={styles.renderItemContainer}>
        {/* Top part - Image + text */}
        <View style={styles.renderItemImageContainer}>
          <Image
            source={{ uri: item?.images[0] }}
            style={styles.renderItemImage}
            resizeMode="contain"
          />
          <View style={styles.renderItemTextContainer}>
            <Text style={styles.renderItemTitle} numberOfLines={2}>{item?.title}</Text>
            <Text style={styles.renderItemdescText}>Brand: {item?.brand}</Text>
            <Text style={styles.renderItemdescText}>Rating: {item?.rating}</Text>
            <Text style={styles.renderItemdescText}>Category: {item?.category}</Text>
            <Text style={styles.renderItemdescText}>Stock: {item?.stock}</Text>
            <Text style={styles.renderItemPriceText}>
              <FontAwesome name="rupee" size={18} color="black" /> {subtotal}
            </Text>
          </View>
        </View>

        {/* Bottom part - Quantity and Remove button */}
        <View style={styles.renderItemActionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{itemQuantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.renderItemRemoveButton} onPress={() => handleRemove(item)}>
            <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      "Place Order",
      `Are you sure you want to place the order?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Order Placed",
              `Your order has been placed successfully.`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    setTimeout(() => {
                      router.replace("/");
                    }, 2000);
                  },
                  style: "default",
                },
              ],
              { cancelable: true }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  let total = 0;
  for (const item of cartProducts) {
    const quantity = item.quantity ?? 1;
    const price = Number(item.price);
    total += price * quantity;
  }
  const formattedTotal = total.toFixed(2);

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "#c6ddeb" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>My Bag</Text>
      <FlatList
        data={cartProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        ListEmptyComponent={() => (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          </View>
        )}
      />

      {cartProducts.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: <FontAwesome name="rupee" size={18} color="black" />{formattedTotal}</Text>
          <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    backgroundColor: "#c6ddeb",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  totalContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgreen",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "gray",
    borderBottomColor: "gray",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeOrderButton: {
    backgroundColor: "green",
    padding: 10,
    width: 120,
    alignItems: "center",
    borderRadius: 20,
  },
  placeOrderText: {
    color: "white",
    fontWeight: "bold",
  },
  renderItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 3,
  },
  renderItemImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  renderItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  renderItemTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  renderItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  renderItemPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
  },
  renderItemdescText: {
    fontSize: 12,
    color: "#666",
  },
  renderItemActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#f0f0f0",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  renderItemRemoveButton: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "orange",
    flex: 1,
    marginLeft: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: "gray",
  },
});