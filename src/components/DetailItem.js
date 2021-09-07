import React,{useEffect, useState} from "react";
import { useGlobalContext } from "../context/Context";
import { BsHeart,BsArrowLeft } from 'react-icons/bs';
import {ProgressBar} from "react-bootstrap";

function DetailItem(props) {
  const {getDetail,detailData,loading,collecsPoce,myListPoce} = useGlobalContext();
  const [data,setData] = useState([]);
  const [active,setActive] = useState({active:true,type:'about'});

  const id = props.match.params.id;
  useEffect( () => {
    getDetail(id);
    setData([detailData]);
  },[id,active])

  let checking = (type) => {
      setActive({active:true,type:type});
  }
  return (
    loading ? <div>loading...</div> :  
    <div className="detail">
      <div className="mt-5  p-4">
          <div className="d-flex justify-content-between">
            <i onClick={() => props.history.goBack()}><BsArrowLeft/></i>
            <i id="selected" onClick={ () => collecsPoce(detailData,true)}><BsHeart/></i>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail-name">
              <h1>{detailData.name}</h1>
              {detailData.types && detailData.types.map( typeOf => (
                <span>{typeOf?.type?.name}</span>
              ))}
            </div>
            <h2>#0{detailData.id}</h2>
          </div>
          <div className="img-detail">
            <img src={detailData?.sprites?.front_default} alt="detail image"/>
          </div>
      </div>
      <div className="detail-content py-4 px-3 bg-light text-dark">
            <div className="d-flex justify-content-around list">
                <button onClick={ () => checking('about')}>About</button>
                <button  onClick={ () => checking('stats')} >Base Stats</button>
                <button  onClick={ () => checking('pictures')} >Pictures</button>
                <button  onClick={ () => checking('moves')} >Moves</button>

            </div>
               <div className="mt-4">

                {active.type === 'about' && active.active === true && data && data.map( (item,index) => (
                    <div key={index}>
                     <p>Species : <span>{item?.species?.name}</span> </p>
                     <p>Height  : <span>{item?.height}</span> </p>
                     <p>Weight  : <span>{item?.weight}</span> </p>
                     <p>Abilities  : {item?.abilities?.map( item => <span>{item?.ability?.name}</span>)} </p>  
                 </div>
               ))}
         

              {active.type === 'stats' && active.active === true && data &&
                data.map(  (item) => (
                   item.stats.map( (bStats,index) => (
                    <div className="row" key={index}>
                      <div className="col-3">
                         <span>{bStats?.stat?.name}</span> 
                      </div>
                      <div className="col-2">
                         <span>{bStats.base_stat}</span> 
                      </div>
                      <div className="col-7">
                      <ProgressBar variant={bStats?.base_stat > 10 && bStats?.base_stat < 80 ? 'warning' :bStats?.base_stat > 80 && bStats?.base_stat < 100 ?  'info':bStats?.base_stat > 100 && bStats?.base_stat < 120 ? 'success' : ''} now={bStats?.base_stat} />
                      </div>
                    </div> 
                   ))
               ))
              }

              {active.type === 'moves' && active.active === true && data &&
                data.map(  item => (
                   item.moves.map( styleMove => (
                    <div className="row border border-secondary">
                      <div className="col-lg-12">
                        <b>Name : </b>
                         <span>{styleMove.move?.name}</span> 
                      </div>
                      {styleMove?.version_group_details?.map( vgd => (
                        <div className="row">
                        <div className="col-lg-6">
                           <em>Method : </em>
                          <span>{vgd?.move_learn_method?.name}</span>
                        </div>
                        <div className="col-lg-6">
                           <em>Group Version : </em>
                          <span>{vgd?.version_group?.name}</span>
                        </div>
                        </div>
                      ))}
                    </div> 
                   ))
               ))
              }

              {active.type === 'pictures' && active.active === true && data && data.map( item => (
                    <div>
                      <p>Pictures : </p>
                      <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-4">
                          <span>back_default : </span>
                          <img  src={item?.sprites?.back_default} alt='pictures'/>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-4">   
                          <span>front_default : </span>
                         <img  src={item?.sprites?.front_default} alt='pictures'/>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-4">
                           <span>front_shiny : </span>
                            <img  src={item?.sprites?.front_shiny}alt='pictures'/>
                         </div>
                         <div className="col-xs-6 col-sm-6 col-md-3 col-lg-4" >
                           <span>back_shiny : </span>
                           <img  src={item?.sprites?.back_shiny} alt='pictures'/>
                         </div>
                      </div>
                 </div>
               ))}
            </div>
          </div>
    </div>
  );
}

export default DetailItem;
