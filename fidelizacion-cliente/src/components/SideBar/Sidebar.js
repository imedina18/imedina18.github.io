import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Header from "../Header";
import { useCookies } from "react-cookie";

const NavIcon = styled.a`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #f27631;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({history}) => {
  const [sidebar, setSidebar] = useState(false);
  const [cookie] = useCookies(["usrSession"]);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      {
        (cookie.usrSession == undefined || cookie.usrSession.data == undefined) ? <></> : (
          <IconContext.Provider value={{ color: "#fff" }}>
            <Header history={history} menuClose={showSidebar} />
            <SidebarNav sidebar={sidebar}>
              <SidebarWrap>
                <NavIcon>
                  <AiIcons.AiOutlineClose style={{cursor: "pointer"}} onClick={(e) => showSidebar()} />
                </NavIcon>
                {SidebarData.map((item, index) => <SubMenu item={item} key={index} />)}
              </SidebarWrap>
            </SidebarNav>
          </IconContext.Provider>
        )
      }
    </>
  );
};

export default Sidebar;
