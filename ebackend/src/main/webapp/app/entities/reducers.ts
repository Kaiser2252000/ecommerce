import category from 'app/entities/category/category.reducer';
import product from 'app/entities/product/product.reducer';
import lineItem from 'app/entities/line-item/line-item.reducer';
import orders from 'app/entities/orders/orders.reducer';
import bill from 'app/entities/bill/bill.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  category,
  product,
  lineItem,
  orders,
  bill,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
