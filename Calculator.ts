function roundToNearestFiveCents(value) {
    return Math.ceil(value * 20) / 20;
}

function isExempt(item) {
    const exemptCategories = ['book', 'chocolate', 'pill']; 
    return exemptCategories.some(category => item.includes(category));
}

function calculateReceipt(input) {
    let totalTaxes = 0;
    let totalPrice = 0;
    let r = '';

    for (const line of input) {
        const match = line.match(/(\d+) (.+) at (\d+\.\d{2})/);
        if (!match) throw new Error(`Invalid Format: ${line}`);

        const [, quantityStr, itemName, priceStr] = match;
        const quantity = parseInt(quantityStr, 10);
        const price = parseFloat(priceStr);

        let itemTax = 0;

        if (!isExempt(itemName)) {
            itemTax += roundToNearestFiveCents(price * 0.10);
        }

        if (itemName.includes('imported')) {
            itemTax += roundToNearestFiveCents(price * 0.05);
        }

        const totalItemTax = itemTax * quantity;
        const totalItemPrice = (price + itemTax) * quantity;

        totalTaxes += totalItemTax;
        totalPrice += totalItemPrice;

        r += `${quantity} ${itemName}: ${totalItemPrice.toFixed(2)}\n`;
    }

    r += `Sales Taxes: ${totalTaxes.toFixed(2)}\n`;
    r += `Total: ${totalPrice.toFixed(2)}`;

    return r;
}