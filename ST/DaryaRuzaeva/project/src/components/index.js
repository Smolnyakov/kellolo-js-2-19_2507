import app from './js/app.js'
export default () => {
    let appVue = new Vue(app);
}


/*
import { Basket, Catalog } from './js/lists';

export default () => {
    let basket = new Basket('/basket.json', '#basket');
    let catalog = new Catalog('/catalog.json', '#catalog', basket);
}
*/
/*
import basket from './js/basket';

import catalog from './js/catalog';

export default () => {
    basket.init();
    catalog.init(8, basket);
}
*/
