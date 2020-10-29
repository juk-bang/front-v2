import Axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../../../sass/locpopup.sass"

//주소정보 가져올때 필요정보 인터페이스
interface Ipage {
  countPerPage: number;
  totalCount: number;
  currentPage: number;
}

function LocPopup({ inputYn }: any) {
  let form_comp: any = React.createRef();
  const [loc, set_loc] = useState({
    confmKey: "devU01TX0FVVEgyMDIwMTAwOTIzMjY0NjExMDI3Mzk=",
    currentPage: 1,
    countPerPage: 5,
    keyword: "",
    resultType: "json",
    start: 0,
    end: 0,
    juso: [{ roadAddr: "", jibunAddr: "" }],
  });

  //도로명주소 API에 전달할 파라미터 세팅
  const make_param = () => {
    let param = "?confmKey=" + loc.confmKey;
    param += "&currentPage=" + loc.currentPage;
    param += "&countPerPage=" + loc.countPerPage;
    param += "&keyword=" + loc.keyword;
    param += "&resultType=" + loc.resultType;

    return param;
  };

  //주소검색 버튼 누를시 작동 헨들러
  const submit_handler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loc.currentPage = 1;
    get_addr();
  };

  //주소내역 아래 번호버튼클릭 - 페이지이동
  const move_page = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const page = parseInt(value);
    loc.currentPage = page;
    get_addr();
  };

  //단위 5페이지 왼쪽이동
  const left_move_page = (event: React.FormEvent<HTMLInputElement>) => {
    loc.currentPage = loc.start - loc.countPerPage;
    get_addr();
  };

  //단위 5페이지 오른쪽이동
  const right_move_page = (event: React.FormEvent<HTMLInputElement>) => {
    loc.currentPage = loc.start + loc.countPerPage;
    get_addr();
  };

  //주소API서버에 요청
  const get_addr = () => {
    if (check_keyword(loc.keyword)) {
      const url =
        "http://www.juso.go.kr/addrlink/addrLinkApi.do" + make_param();

      Axios.post(url).then((res) => {
        make_list(res.data.results);
      });
    }
  };

  //주소검색 결과 사용자 작성페이지에 전송
  const set_result = (event: any) => {
    const location = event.target.childNodes[0].data.trim();

    const res_num = loc.juso.findIndex((juso) => {
      return juso.roadAddr === location || juso.jibunAddr === location;
    });

    const result = loc.juso[res_num];

    if(result !== undefined){
    window.opener.document.getElementById("roadAddrPart1").value =
      result.jibunAddr;

    window.opener.document.getElementById("info").value = JSON.stringify(
      result
    );
    window.opener.document.getElementById("roadAddrPart1").focus();
    }
    window.close();
  };

  //주소검색 리스트 생성
  const make_list = (info: { common: Ipage; juso: [] }) => {
    const { common, juso } = info;
    loc.juso = juso;
    const list = document.getElementById("list");
    let htmlStr = `<div className = "juso-list">`;
    if (list !== null && juso !== null) {
      juso.forEach((info: { roadAddr: string; jibunAddr: string }) => {
        const { roadAddr, jibunAddr } = info;
        if(jibunAddr !== undefined){
        htmlStr += `
      <ol onClick = "window.opener.getReturnValue(JSON.stringify(state));">
        <li> ${roadAddr} </li>
        <li> ${jibunAddr} </li>
      </ol>
      `;
       } });
      htmlStr += "</div>";
      list.innerHTML = htmlStr;
      list.addEventListener("click", set_result);

      show_page(common);
    }
  };

  //페이지 번호 이동을 위한 함수
  function show_page(page: Ipage) {
    const { totalCount, currentPage, countPerPage } = page;
    const total_page = Math.ceil(totalCount / countPerPage); //총 페이지수
    let rem = currentPage % loc.countPerPage;
    if (rem === 0) rem = loc.countPerPage;
    const start = currentPage - rem + 1;

    const end = start + loc.countPerPage - 1;

    const moover = document.getElementById("moover");

    set_loc({ ...loc, start: start, end: end });

    if (moover != null) {
      const page_diff = end - total_page;
      if (page_diff > 0) {
        const real_page = loc.countPerPage - page_diff;

        for (let i = 1; i <= real_page; i++) {
          moover.children[i].setAttribute("value", (start + i - 1).toString());
          moover.children[i].setAttribute("type", "button");
        }

        for (let i = loc.countPerPage; i > real_page; i--) {
          moover.children[i].setAttribute("type", "hidden");
        }

        moover.children[loc.countPerPage + 1].setAttribute("type", "hidden");
      } else {
        for (let i = 1; i <= loc.countPerPage; i++) {
          moover.children[i].setAttribute("value", (start + i - 1).toString());
          moover.children[i].setAttribute("type", "button");
        }
        moover.children[loc.countPerPage + 1].setAttribute("type", "button");
      }

      if (start === 1) {
        moover.children[0].setAttribute("type", "hidden");
      } else {
        moover.children[0].setAttribute("type", "button");
      }
    }
  }

  //검색키워드 변화시 자동으로 저장하기 위한 핸들러
  const handle_keyword = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    set_loc({ ...loc, keyword: value });
  };

  const get_bararray = () => {
    let arr = [];
    for (let i = 1; i <= loc.countPerPage; i++) arr.push(i);

    return arr;
  };

  //특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
  function check_keyword(obj: string) {
    if (obj.length > 0) {
      //특수문자 제거
      var expText = /[%=><]/;
      if (expText.test(obj) === true) {
        alert("특수문자를 입력 할수 없습니다.");
        obj = obj.split(expText).join("");
        return false;
      }

      //특정문자열(sql예약어의 앞뒤공백포함) 제거
      var sqlArray :Array<string> = new Array<string>(
        //sql 예약어
        "OR",
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE",
        "DROP",
        "EXEC",
        "UNION",
        "FETCH",
        "DECLARE",
        "TRUNCATE"
      );

      var regex;
      for (var i = 0; i < sqlArray.length; i++) {
        regex = new RegExp(sqlArray[i], "gi");

        if (regex.test(obj)) {
          alert(
            '"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.'
          );
          obj = obj.replace(regex, "");
          return false;
        }
      }
    } else {
      alert("검색어를 입력하세요");
      return false;
    }
    return true;
  }

  return (
    <div>
      <form ref={form_comp} onSubmit={submit_handler}>
        <div>
          <input
            className="p-2 w-1/2 margin-left-5 border-deep-pink"
            type="text"
            name="keyword"
            onChange={handle_keyword}
          />
          <button
            className="button-deep-pink-white mid margin-top-8 margin-left-2"
            type="submit"
          >
            주소검색
          </button>
        </div>
        <div className="juso-list" id="list"></div>
        <div className="page-moover flex justify-center" id="moover">
          <input type="hidden" onClick={left_move_page} value="<"></input>
          {get_bararray().map((i :number) => {
            return <input type="hidden" onClick={move_page} value={i}></input>;
          })}

          <input type="hidden" onClick={right_move_page} value=">"></input>
        </div>
      </form>
    </div>
  );
}
export default withRouter(LocPopup);
