import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #ffff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background: linear-gradient(135deg, #ff6523 0, #ff4e21 25%, #f92e1e 50%, #ee001d 75%, #e5001e 100%);
    border-left: 4px solid #FFFAFA;
    cursor: pointer;
    text-decoration: none;
    color: #FFFAFA;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 12px;
`;

const DropdownLink = styled(Link)`
  background: #f78f55;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;

  &:hover {
    background: #fea25a;
    cursor: pointer;
    text-decoration: none;
    color: #F5F5F5;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
