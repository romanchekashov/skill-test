import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../lib/slices/usersSlice";
import { isBrowser } from "../utils/utils";
import Login from "./auth/Login";

type Props = {};

const HeaderMenu: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      //   console.log("HeaderMenu: ", user);
      setItems([
        {
          label: user.username,
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Log Out",
              icon: "pi pi-fw pi-power-off",
              command: () => dispatch(logoutUser()),
            },
          ],
        },
      ]);
    }
  }, [user]);

  const start: any = (
    <Link href="/">
      <img alt="logo" src="logo192.png" height="40" className="p-mr-2"></img>
    </Link>
  );
  const end: any = <InputText placeholder="Search" type="text" />;

  return (
    <div className="card">
      {isBrowser() ? <Login /> : null}
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default HeaderMenu;
