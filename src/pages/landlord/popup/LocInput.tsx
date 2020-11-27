import React, { FormEvent, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { locationUrl } from "../../../components/urls";
import proj4 from "proj4";

function LocInput({ onChange, address }: any) {
  //좌표API기본 state설정
  const [loc_xy] = useState({
    confmKey: "devU01TX0FVVEgyMDIwMTAwOTIzMzMyODExMDI3NDA=",
    admCd: "",
    rnMgtSn: "",
    udrtYn: "",
    buldMnnm: 0,
    buldSlno: 0,
    resultType: "json",
    jibunjuso: "",
  });

  //주소 팝업창 생성
  const goPopup = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    window.open(locationUrl.locationGet, "pop", "width=490,height=400");
  };

  //주소정보 업데이트
  const update_info = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const loc = document.getElementById("info")?.getAttribute("value");

      if (loc != null && loc !== "") {
      const parse_loc = JSON.parse(loc);

      loc_xy.admCd = parse_loc.admCd;
      loc_xy.rnMgtSn = parse_loc.rnMgtSn;
      loc_xy.udrtYn = parse_loc.udrtYn;
      loc_xy.buldMnnm = parse_loc.buldMnnm;
      loc_xy.buldSlno = parse_loc.buldSlno;

      loc_xy.jibunjuso = parse_loc.jibunAddr;
    
    get_addr();
  }
  };

  //도로명주소 API에 전달할 파라미터 세팅
  const make_param = () => {
    let param = "?confmKey=" + loc_xy.confmKey;
    param += "&admCd=" + loc_xy.admCd;
    param += "&rnMgtSn=" + loc_xy.rnMgtSn;
    param += "&udrtYn=" + loc_xy.udrtYn;
    param += "&buldMnnm=" + loc_xy.buldMnnm;
    param += "&buldSlno=" + loc_xy.buldSlno;
    param += "&resultType=" + loc_xy.resultType;
    return param;
  };

  //주소API서버에 x,y좌표 요청
  const get_addr = () => {
    const url = "http://www.juso.go.kr/addrlink/addrCoordApi.do" + make_param();

    axios.post(url).then((res) => {
      const juso = res.data.results.juso !== null ? res.data.results.juso[0] : null;

      if(juso === null){
        alert(res.data.results.common.errorMessage);
        return;
      }        
      let x :number= parseFloat(juso.entX);
      let y :number= parseFloat(juso.entY);
      var grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
      var wgs84 = "+proj=longlat+ellps=WGS84+datum=WGS84+no_defs"; //to
   
      var p = proj4(grs80, wgs84, [x, y]);
    
      x = p[0];
      y = p[1];    
      onChange({ address: loc_xy.jibunjuso, lng : x, lat : y });
    });
  };

  return (
    <div className="container margin-top-5 padding-1">
      <h2 className="font-deep-pink text-2xl">주소검색</h2>
      <div>
        <input type="hidden" id="info" value="" />
        <input
          className="w-3/4 border-deep-pink"
          type="text"
          id="roadAddrPart1"
          onFocus={update_info}
          defaultValue = {address}
          readOnly
        />
        <input  name = "room_search"
          className="button-mint-white margin-left-3 "
          type="submit"
          value="주소검색"
          onClick={goPopup}
        />
      </div>
    </div>
  );
}
export default withRouter(LocInput);
