const INITIALIZE_STOREFRONT_EDIT = 'INITIALIZE_STOREFRONT_EDIT';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_STOREFRONT_EDIT:
      return {
        storefront: action.storefront
      };
    default:
      return state;
  }
};

export const initializeEditStorefront = storefront => ({type: INITIALIZE_STOREFRONT_EDIT, storefront});

export default reducer;
