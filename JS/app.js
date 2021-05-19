import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import userProductModal from './productModal.js';
const api = 'https://vue-course-api.hexschool.io/api/';
const path = 'ototoki';
const { defineRule, Form, Field, ErrorMessage, configure, resetForm } =
  VeeValidate;
const { required, email } = VeeValidateRules;
const { localize } = VeeValidateI18n;
/*☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ*/
defineRule('required', required);
defineRule('email', email);

configure({
  generateMessage: localize('zh_TW'),
});
/*☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ*/
createApp({
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      products: [],
      product: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
      coupon_code: '',
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    // submit: function () {
    //   // バリデートの判定
    //   this.$validator.validateAll().then((result) => {
    //     if (result === false) {
    //       // エラー時の処理
    //       alert('Validate NG.');
    //       return false;
    //     }
    //     //エラーがなかった時の処理を下に記述
    //     alert('Submit OK.');
    //   });
    // },
    getProducts() {
      const url = `${api}${path}/products/all`;
      axios.get(url).then((res) => {
        console.log(res.data);
        this.products = res.data.products;
      });
    },
    getProduct(id) {
      const url = `${api}${path}/product/${id}`;
      axios.get(url).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          $('.modale').addClass('opened');
          $('body').addClass('body-opened');
        } else {
          alert(res.data.message);
        }
      });
    },
    getCart() {
      const url = `${api}${path}/cart`;
      axios.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
        } else {
          alert(res.data.message);
        }
      });
    },
    addToCart(id, qty = 1) {
      console.log('123');
      const url = `${api}${path}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((res) => {
        console.log(res);
        if (res.data.success) {
          alert(res.data.message);
          this.getCart();
        } else {
          alert(res.data.message);
        }
      });
    },
    getCart() {
      const url = `${api}${path}/cart`;
      axios.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          console.log(this.cart);
        } else {
          alert(res.data.message);
        }
      });
    },
    removeCartItem(id) {
      const url = `${api}${path}/cart/${id}`;
      axios.delete(url).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          this.getCart();
        } else {
          alert(res.data.message);
        }
      });
    },
    createOrder() {
      const url = `${api}${path}/order`;
      const order = this.form;
      console.log(this.$refs.form);
      axios.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        } else {
          alert(res.data.message);
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
})
  .component('userProductModal', userProductModal)
  .mount('#app');
