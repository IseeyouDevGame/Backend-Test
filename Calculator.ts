function roundToNearestFiveCents(value) {
    return Math.ceil(value * 20) / 20;
}

function isExempt(item) {
    const exemptCategories = ['book', 'chocolate', 'pill']; 
    return exemptCategories.some(category => item.includes(category));
}
