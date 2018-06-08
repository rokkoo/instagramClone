import { createSwitchNavigator } from 'react-navigation';

import { Login, MainFeed } from './../screens';
import Tabs from './Tabs';

export default createSwitchNavigator ({
    Login: Login,
    Home: Tabs
})