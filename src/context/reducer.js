const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_ERROR":
      return {
        ...state,
        err: action.payload,
      };
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "MY_LIST_POCE":
      return{
        ...state,
        myListPoce:[...state.myListPoce,action.payload]
      }
    case "UPDATE_LIMIT":
      return {
        ...state,
        limit: state.limit + 10,
      };
    case "GET_DETAIL_DATA":
      return{
        ...state,
        detailData:action.payload
      }
    default:
      throw new Error("there is no matching type");
  }
};

export default reducer;
