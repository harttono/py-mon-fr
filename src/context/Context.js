import React, { useContext, createContext, useReducer, useState } from "react";
import reducer from "./reducer";
import { API } from "../utils/util";
const baseUrlPoce = `https://pokeapi.co/`;

const AppContext = createContext();


const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const initialState = {
    loading: false,
    data: [],
    detailData:[],
    limit: 10,
    userData: null || localStorage.getItem("userData"),
    myListPoce:[]
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const {
        data: { results },
      } = await API.get(`${baseUrlPoce}api/v2/pokemon/?limit=${state.limit}`);
      let fetchingAll = results.map((item) => {
        return fetch(item.url).then((resp) => resp.json());
      });
      let response = Promise.all(fetchingAll);
      response.then((res) => {
        const pocemonsData = res.map((item) => {
          return {
            id: item.id,
            name: item.name,
            imgBackDefault: item.sprites.back_default,
            imgFrontDefault: item.sprites.front_default,
            imgBackShiny: item.sprites.back_shiny,
            imgFrontShiny: item.sprites.front_shiny,
            height: item.height,
            weight: item.weight,
            types:item.types
          };
        });

        dispatch({ type: "GET_DATA", payload: pocemonsData });
        setLoading(false);
      });
    } catch (err) {
      dispatch({ type: "GET_ERROR", err });
      setLoading(false);
    }
  };

  const getDetail = async (id) => {
    try {
      setLoading(true);
      const {data
      } = await API.get(`${baseUrlPoce}api/v2/pokemon/${id}`);
        dispatch({ type: "GET_DETAIL_DATA", payload: data });
        setLoading(false);
    } catch (err) {
      dispatch({ type: "GET_ERROR", err });
      setLoading(false);
    }
  };


  const collecsPoce = (data,selected) =>{
    dispatch({type:"MY_LIST_POCE",payload:{...data,selected:true}});
    document.getElementById('selected').style.color = 'red';
  }

  const handleLimit = () => {
    dispatch({ type: "UPDATE_LIMIT" });
  };


  return (
    <AppContext.Provider
      value={{
        ...state,
        collecsPoce,
        handleLimit,
        loading,
        setLoading,
        fetchData,
        dispatch,
        limit: state.limit,
        getDetail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// use context as global
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
