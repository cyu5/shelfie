const initialState = {
  inventory: []
};

// Action types
const INVENTORY_UPDATE = "INVENTORY_UPDATE";

function reducer(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_UPDATE:
      return Object.assign({}, state, { inventory: action.inventory });

    default:
      return state;
  }
}

// Action creator

export function inventoryUpdate(inventory) {
  return {
    type: INVENTORY_UPDATE,
    inventory
  };
}

export default reducer;
