let add = (cart, req) => {
  cart.contents.push(req.body);
  cart.countGoods++;
  cart.amount += +req.body.price;
  return JSON.stringify(cart, null, 2);
};

let change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  cart.countGoods++;
  cart.amount += find.price;
  return JSON.stringify(cart, null, 2);
};

let remove = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity > 1) {
    find.quantity--;
  } else {
    cart.contents.splice(cart.contents.findIndex(el => el.id_product === +req.params.id), 1);
  }
  cart.countGoods--;
  cart.amount -= find.price;
  return JSON.stringify(cart, null, 2);
};

module.exports = {
  add,
  change,
  remove
};
