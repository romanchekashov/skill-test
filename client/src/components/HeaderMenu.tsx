import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../lib/slices/usersSlice";
import Login from "./auth/Login";

type Props = {};

const HeaderMenu: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const items: any[] = [];
  if (user) {
    items.push({
      label: user.username,
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Log Out",
          icon: "pi pi-fw pi-power-off",
          command: () => dispatch(logoutUser()),
        },
      ],
    });
  }

  const start: any = (
    <a href="/">
      <img alt="logo" src="logo192.png" height="40" className="p-mr-2"></img>
    </a>
  );
  const end: any = <InputText placeholder="Search" type="text" />;

  return (
    <div className="card">
      <Login />
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default HeaderMenu;
