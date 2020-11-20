import React from "react";
import HomePresenter from "./homePresenter";
import {withRouter, RouteComponentProps} from "react-router-dom";

interface IProps extends RouteComponentProps{}

const HomeContainer:React.FC<IProps> = (props) => {

    const handleChangeUnivValue:React.EventHandler<React.ChangeEvent> = (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const targetValue = parseInt(e.target.value);
        if(targetValue !== 0){
            props.history.push(`/home?univId=${targetValue}`)
        }
    }

    return <HomePresenter handleChangeUnivValue={handleChangeUnivValue}/>;
}

export default withRouter(HomeContainer);