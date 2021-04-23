import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { SlideMenu } from "primereact/slidemenu";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectUser,
  showLogin,
  showSignup,
} from "../lib/slices/usersSlice";
import { isBrowser } from "../utils/utils";
import Login from "./auth/Login";

type Props = {};

const HeaderMenu: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [items, setItems] = useState<any[]>([]);
  const [showLoginBtns, setShowLoginBtns] = useState<boolean>(true);
  const userMenu = useRef(null);
  const [userItems, setUserItems] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      //   console.log("HeaderMenu: ", user);
      setUserItems([
        {
          label: "Log Out",
          icon: "pi pi-fw pi-power-off",
          command: () => dispatch(logoutUser()),
        },
      ]);

      setShowLoginBtns(false);
    }
  }, [user]);

  const start: any = (
    <Link href="/">
      <img alt="logo" src="logo192.png" height="40" className="p-mr-2"></img>
    </Link>
  );
  const loginBtns: any = (
    <>
      <Button
        label="Log In"
        icon="pi pi-check"
        style={{ margin: "0 5px" }}
        onClick={() => dispatch(showLogin())}
      />
      <Button
        label="Sign Up"
        icon="pi pi-check"
        onClick={() => dispatch(showSignup())}
      />
    </>
  );
  const end: any = (
    <>
      <InputText placeholder="Search" type="text" />
      {showLoginBtns ? (
        loginBtns
      ) : (
        <>
          <SlideMenu
            ref={userMenu}
            model={userItems}
            popup
            viewportHeight={42}
            menuWidth={200}
          ></SlideMenu>
          <Button
            type="button"
            icon="pi pi-fw pi-user"
            label={user?.username}
            style={{ marginLeft: "5px" }}
            onClick={(event) => userMenu.current.toggle(event)}
          ></Button>
        </>
      )}
    </>
  );

  return (
    <div className="card">
      <Login />
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default HeaderMenu;
