import category from 'app/entities/category/category.reducer';
import product from 'app/entities/product/product.reducer'
import cart from 'app/entities/cart/cart.reducer'
import cartLineItem from 'app/entities/cart-line-item/cart-line-item.reducer'
import orders from 'app/entities/orders/orders.reducer'
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  category,
  product,
  cart,
  cartLineItem,
  orders,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
