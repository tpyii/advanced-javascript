const products = [
  {id: 1, title: 'Notebook', price: 2000},
  {id: 2, title: 'Mouse', price: 20},
  {id: 3, title: 'Keyboard', price: 200},
  {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = ({title, price, img = 'https://picsum.photos/200/200'}) => (
  `<div class="product-item">
    <img src="${img}" alt="">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="btn btn-buy">Купить</button>
  </div>`
);

const renderPage = list => {
  const productsList = list.map(item => renderProduct(item));
  document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);
