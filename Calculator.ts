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

const input1 = [
    '2 book at 12.49',
    '1 music CD at 14.99',
    '1 chocolate bar at 0.85'
];

const input2 = [
    '1 imported box of chocolates at 10.00',
    '1 imported bottle of perfume at 47.50'
];

const input3 = [
    '1 imported bottle of perfume at 27.99',
    '1 bottle of perfume at 18.99',
    '1 packet of headache pills at 9.75',
    '3 imported boxes of chocolates at 11.25'
];

console.log('Output 1:\n' + calculateReceipt(input1) + '\n');
console.log('Output 2:\n' + calculateReceipt(input2) + '\n');
console.log('Output 3:\n' + calculateReceipt(input3) + '\n');