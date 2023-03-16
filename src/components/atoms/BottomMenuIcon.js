//core
import * as React from 'react';
import * as Images from '../../../src/assets/tabbar-icons';
import {mvs} from '../../services/metrices';

//this component is used to retirn icon for bottom tab bar
export default function BottomMenuIcon({name, focused}) {
  const TabBarIconsComponent = Images[name + ((focused && 'active') || '')];
  return <TabBarIconsComponent height={mvs(21)} width={mvs(21)} />;
}
