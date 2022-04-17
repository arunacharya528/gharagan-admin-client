export const getDiscountedPrice = (price, discountId, discountList) => {
    if (!discountId) {
        return parseInt(price);
    }
    var discountedPrice = (price - (0.01 * discountList.find((element) => element.id === parseInt(discountId)).discount_percent * price))
    discountedPrice = Math.round((discountedPrice + Number.EPSILON) * 100) / 100;

    return discountedPrice;
}