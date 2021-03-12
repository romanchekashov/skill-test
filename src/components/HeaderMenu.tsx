import React from 'react';
import "./Test.css";
import {Link} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Menubar} from "primereact/menubar";
import {UserEntity} from "../data/UserEntity";

type Props = {
    user: UserEntity | null
    userLogOut: () => void
}

const HeaderMenu: React.FC<Props> = ({user, userLogOut}) => {

    const items: any[] = [];
    if (user) {
        items.push({
            label: user.username,
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Log Out',
                    icon: 'pi pi-fw pi-power-off',
                    command: userLogOut
                }
            ]
        });
    }
    const start: any = <Link to="/"><img alt="logo" src="logo192.png" height="40" className="p-mr-2"></img></Link>;
    const end: any = <InputText placeholder="Search" type="text"/>;

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end}/>
        </div>
    );
}

export default HeaderMenu;