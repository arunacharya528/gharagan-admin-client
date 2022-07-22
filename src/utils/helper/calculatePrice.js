/**
 * 
 * @param {Number} price Price to be discounted from 
 * @param {Number} discountPercent Discount percent
 * @returns Discounted price
 */
export const getDiscountedPrice = (price, discountPercent) => {
    const discountedPrice = price - (price * 0.01 * discountPercent)

    return Math.round((discountedPrice + Number.EPSILON) * 100) / 100
}


/**
 * Get total price of item in inventory by passing inventory instance from database
 * @param {JSON} inventory instance of inventory
 * @returns discounted price of inventory instance
 */
export const getTotalPrice = (inventory) => {
    if (!inventory.discount || inventory.discount.active === 0) {
        return inventory.price;
    } else {
        const discountPercent = inventory.discount.discount_percent
        const price = inventory.price;
        return getDiscountedPrice(price, discountPercent);
    }
}


/**
 * Get final price by passing price and quantity
 * @param {Number} price the selling price
 * @param {Number} quantity quantity
 * @returns price by multiplying SP and quantity (rounded off)
 */
export const getSumTotal = (price, quantity) => {
    const total = price * quantity;
    return Math.round((total + Number.EPSILON) * 100) / 100
}

/**
 * 
 * @param {JSON} items the instannce array of cart item or order item
 * @returns  sum of all inventory prices from cart or order
 */
export const getSubTotal = (items) => {
    var sum = 0;
    items.map((item) => {
        sum += getSumTotal(getTotalPrice(item.inventory), item.quantity)
    })
    return sum;
}

/**
 * 
 * @param {Array} array Array of numbers to get sum from
 * @returns sum of all numbers of array
 */
export const getSumFromArray = (array) => {
    var sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseFloat(array[i]);
    }
    return sum;
}