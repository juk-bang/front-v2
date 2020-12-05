import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getRecommandFilter } from "../../../../API/room";
import { getUserFilter } from "../../../../API/user";
import "../../../../sass/tailwind.output.css";
import { IRoomFilter } from "../../interface";

interface IParams{
  univId:any;
}

interface IProps extends RouteComponentProps<IParams>{
  hanldeClickUserFavorites:any;
  getFilterRoomData:any;
}

const Filter: React.FunctionComponent<IProps> = (props) => {
  const [clickElement, setClickElement] = useState<String>("");
  const [error, setError] = useState("");
  const [filterSelected, setfilterSelected] = useState<IRoomFilter>({
    layout: 0,
    monthlyLease: {
      min: 0,
      max: 0,
    },
    adminExpenses: {
      min: 0,
      max: 0,
    },
    deposit: {
      min: 0,
      max: 0,
    },
    scale: {
      min: 0,
      max: 0,
    },
    grade: {
      min: 0,
      max: 0,
    },
    distance: {
      min: 0,
      max: 0,
    },
    floor: 1,
  });

  const getFilter = async () =>{
    let data:any = await getUserFilter();
    console.log(data.data);
    data = data.data;
    setfilterSelected({
      layout: data.layout,
    monthlyLease: {
      min: data.monthlyLeaseL,
      max: data.monthlyLeaseH,
    },
    adminExpenses: {
      min: data.adminExpensesL,
      max: data.adminExpensesH,
    },
    deposit: {
      min: data.depositL,
      max: data.depositH,
    },
    scale: {
      min: data.scaleL,
      max: data.scaleH,
    },
    grade: {
      min: data.gradeL,
      max: data.gradeH,
    },
    distance: {
      min: data.distanceL,
      max: data.distanceH,
    },
    floor: data.floor,
    })
  }

  const getRecommand = async () =>{
    const univid = localStorage.getItem("univid");
    let data:any = await getRecommandFilter(univid);
    data = data.data;
    if(!data.gradeH)
      setError("true");
    else{
      setfilterSelected({
        layout: data.layout,
      monthlyLease: {
        min: data.monthlyLeaseL,
        max: data.monthlyLeaseH,
      },
      adminExpenses: {
        min: data.adminExpensesL,
        max: data.adminExpensesH,
      },
      deposit: {
        min: data.depositL,
        max: data.depositH,
      },
      scale: {
        min: data.scaleL,
        max: data.scaleH,
      },
      grade: {
        min: data.gradeL,
        max: data.gradeH,
      },
      distance: {
        min: data.distanceL,
        max: data.distanceH,
      },
      floor: data.floor,
      });
    }
  }

  const handleClickRecommandFilter = (e:any) => {
    getRecommand();
  }

  const handleClickMyFilter = (e:any) => {
    getFilter();
  }

  const handleChangeFilterMonthlyLeaseMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      monthlyLease: {
        max: filterSelected.monthlyLease.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterMonthlyLeaseMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      monthlyLease: {
        min: filterSelected.monthlyLease.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterAdminExpensesMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      adminExpenses: {
        max: filterSelected.adminExpenses.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterAdminExpensesMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      adminExpenses: {
        min: filterSelected.adminExpenses.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterDepositMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      deposit: {
        min: filterSelected.deposit.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterDepositMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      deposit: {
        max: filterSelected.deposit.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterScaleMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      scale: {
        min: filterSelected.scale.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterScaleMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      scale: {
        max: filterSelected.scale.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterGradeMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      grade: {
        min: filterSelected.grade.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterGradeMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      grade: {
        max: filterSelected.grade.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterDistanceMax: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      distance: {
        min: filterSelected.distance.min,
        max: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterDistanceMin: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      distance: {
        max: filterSelected.distance.max,
        min: parseInt(e.target.value),
      },
    });
  };

  const handleChangeFilterFloor: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      floor: parseInt(e.target.value),
    });
  };

  const handleChangeFilterLayout: React.EventHandler<React.SyntheticEvent> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setfilterSelected({
      ...filterSelected,
      layout: parseInt(e.target.value),
    });
  };

  const handleClickFilter: React.EventHandler<React.SyntheticEvent> = (
    e: React.MouseEvent
  ) => {
    if (clickElement === "filter") setClickElement("");
    else setClickElement("filter");
  };

  const handleClickSubmit: React.EventHandler<React.SyntheticEvent> = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    let filterUrl = "";
    filterUrl += `&layout=${filterSelected.layout}`;
    filterUrl += `&floor=${filterSelected.floor}`;
    filterUrl += `&monthlyLease=${filterSelected.monthlyLease.min}-${filterSelected.monthlyLease.max}`;
    filterUrl += `&adminExpenses=${filterSelected.adminExpenses.min}-${filterSelected.adminExpenses.max}`;
    filterUrl += `&deposit=${filterSelected.deposit.min}-${filterSelected.deposit.max}`;
    filterUrl += `&scale=${filterSelected.scale.min}-${filterSelected.scale.max}`;
    filterUrl += `&grade=${filterSelected.grade.min}-${filterSelected.grade.max}`;
    filterUrl += `&distance=${filterSelected.distance.min}-${filterSelected.distance.max}`;
    props.getFilterRoomData(filterUrl);
  };

  if(error=="true"){
    return <div>예상치 못한 오류가 발생했습니다.</div>;
  }
  else
  return (
    <div className = "fixed w-full">
      <div className="sm:w-full lg:w-1/2 flex h-16 bg-pink-200 opacity-90">
        <div className="cursor-pointer hover:bg-purple-500 bg-purple-300 p-5" onClick={props.hanldeClickUserFavorites}>
          찜
        </div>
        <div className="w-1/2 flex ">
          <div
            className="w-auto cursor-pointer hover:bg-purple-500 bg-purple-200 p-5"
            onClick={handleClickFilter}
          >
            필터
          </div>
          <div className="w-auto hover:bg-purple-500 cursor-pointer bg-purple-200 p-5"  onClick={handleClickMyFilter}>
            마이필터
          </div>
          <div className="w-auto hover:bg-purple-500 cursor-pointer bg-purple-200 p-5" onClick={handleClickRecommandFilter}>
            추천필터
          </div>
        </div>
      </div>
      <div
        className={
          "h-auto bg-purple-300 flex flex-wrap opacity-20" +
          (clickElement === "filter" ? " block" : " hidden")
        }
      >
        <div>
        <div className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-20">
          <div>방 형태</div>
          <select name="layout" onChange={handleChangeFilterLayout}>
            <option value="1">원룸</option>
            <option value="2">투쓰리룸</option>
          </select>
        </div>
        <div className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>월세</div>
          <div>최소값</div>
          <input
            type="range"
            name="monthlyLease"
            min="50"
            max="2000"
            value={filterSelected.monthlyLease.min}
            step="50"
            onChange={handleChangeFilterMonthlyLeaseMin}
          ></input>
          <div>최대값</div>
          <input
            type="range"
            name="monthlyLease"
            min="50"
            max="2000"
            value={filterSelected.monthlyLease.max}
            step="50"
            onChange={handleChangeFilterMonthlyLeaseMax}
          ></input>
          <div>
            선택값 : {filterSelected.monthlyLease.min} ~{" "}
            {filterSelected.monthlyLease.max}
          </div>
        </div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>관리비</div>
          <input
            type="range"
            name="adminExpenses"
            min="20"
            max="50"
            value={filterSelected.adminExpenses.min}
            step="10"
            onChange={handleChangeFilterAdminExpensesMin}
          ></input>
          <div>최소값</div>
          <input
            type="range"
            name="adminExpenses"
            min="20"
            max="50"
            value={filterSelected.adminExpenses.max}
            step="10"
            onChange={handleChangeFilterAdminExpensesMax}
          ></input>
          <div>최대값</div>
          <div>
            선택값 : {filterSelected.adminExpenses.min} ~{" "}
            {filterSelected.adminExpenses.max}
          </div>
        </div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>보증금</div>
          <input
            type="range"
            name="deposit"
            min="500"
            max="5000"
            value={filterSelected.deposit.min}
            step="100"
            onChange={handleChangeFilterDepositMin}
          ></input>
          <div>최소값</div>
          <input
            type="range"
            name="deposit"
            min="500"
            max="5000"
            value={filterSelected.deposit.max}
            step="100"
            onChange={handleChangeFilterDepositMax}
          ></input>
          <div>최대값</div>
          <div>
            선택값 : {filterSelected.deposit.min} ~ {filterSelected.deposit.max}
          </div>
        </div>
        </div>
        <div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>평수</div>
          <input
            type="range"
            name="scale"
            min="5"
            max="40"
            value={filterSelected.scale.min}
            step="5"
            onChange={handleChangeFilterScaleMin}
          ></input>
          <div>최소값</div>
          <input
            type="range"
            name="scale"
            min="5"
            max="40"
            value={filterSelected.scale.max}
            step="5"
            onChange={handleChangeFilterScaleMax}
          ></input>
          <div>최대값</div>
          <div>
            선택값 : {filterSelected.scale.min} ~ {filterSelected.scale.max}
          </div>
        </div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>평점</div>
          <input
            type="range"
            name="grade"
            min="0"
            max="100"
            value={filterSelected.grade.min}
            step="10"
            onChange={handleChangeFilterGradeMin}
          ></input>
          <div>최소값</div>
          <input
            type="range"
            name="grade"
            min="0"
            max="100"
            value={filterSelected.grade.max}
            step="10"
            onChange={handleChangeFilterGradeMax}
          ></input>
          <div>최대값</div>
          <div>
            선택값 : {filterSelected.grade.min} ~ {filterSelected.grade.max}
          </div>
        </div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>거리</div>
          <input
            type="range"
            name="distance"
            min="0"
            max="1000"
            value={filterSelected.distance.min}
            step="100"
            onChange={handleChangeFilterDistanceMin}
          ></input>
          <div>최소값</div>
          <input
            type="range"
            name="distance"
            min="0"
            max="1000"
            value={filterSelected.distance.max}
            step="100"
            onChange={handleChangeFilterDistanceMax}
          ></input>
          <div>최대값</div>
          <div>
            선택값 : {filterSelected.distance.min} ~{" "}
            {filterSelected.distance.max}
          </div>
        </div>
        <div  className="border-solid border-2 border-purple-400 flex justify-center items-center flex-col w-40 h-32">
          <div>층수</div>
          <input
            type="range"
            name="floor"
            min="0"
            max="3"
            value={filterSelected.floor}
            step="1"
            onChange={handleChangeFilterFloor}
          ></input>
          <div>선택값 : {filterSelected.floor}</div>
        </div>
        <div className="cursor-pointer w-10 h-10 bg-pink-200 flex justify-center items-center" onClick={handleClickSubmit}>
          검색
        </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Filter);
