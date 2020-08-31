function _search(arr, id) {
    return arr.find(item => item.id == id);
}

module.exports = {
    add(cart, item) {
        cart.contents.push(item);
        return cart;
    },
    change(cart, id, amount) { //amount == 1/-1
        let find = _search(cart.contents, id);
        find.amount += amount;
        return cart;
    },
    delete(cart, id) {
        let find = _search(cart.contents, id);
        cart.contents.splice(cart.contents.indexOf(find), 1);
        return cart;
    }
}