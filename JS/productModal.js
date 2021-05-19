export default {
  template: '#userProductModal',
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      qty: 1,
    };
  },
  methods: {
    openModal() {
      $('.modale').addClass('opened');
      $('body').addClass('body-opened');
    },
    hideModal() {
      $('.modale').removeClass('opened');
      $('body').removeClass('body-opened');
    },
  },
};
