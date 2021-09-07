import React from "react";
import Fade from "react-reveal/Fade";
import { useGlobalContext } from "../context/Context";
import {Link} from "react-router-dom";

function MyListPoce() {
  const { myListPoce } = useGlobalContext();
  return (
    <div className="d-flex justify-content-evenly align-items-center flex-wrap mt-5">
      <div className="row">
        {myListPoce
          ? myListPoce.map((item, index) => (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-4" key={index}>
                <Fade top>
                  <Link className="text-decoration-none" to={`detail/${item.id}`}>
                  <div className="itemBg p-3 m-2 border border-secondary border-1">
                    <h1>{item.name}</h1>
                    <div className="d-flex align-items-center justify-content-between">
                    <div>
                    {item.types && item.types.map( typeOf => (
                         <p className="types">{typeOf.type.name}</p>
                    ))}
                    </div>
                    <div className="img-container">
                     <img src={item.sprites.front_default}  alt="pict-of-pokemon" />
                    </div>        
                    </div>
                  </div>
                  </Link>
                </Fade>
              </div>
            ))
          : MyListPoce.length == 0 && <div className="d-flex justify-content-center align-items-center mt-5">No Data Available</div>}
      </div>
    </div>
  );
}

export default MyListPoce;
