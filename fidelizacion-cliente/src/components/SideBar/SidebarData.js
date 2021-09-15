import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
   {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
   {
    title: 'Cliente',
    path: '/customer',
    icon: <MdIcons.MdPersonPin />
  },
   {
    title: 'Puntos',
    path: '/customer/points',
    icon: <SiIcons.SiSitepoint />
  }
];
