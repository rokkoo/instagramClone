import { createSwitchNavigator } from 'react-navigation';

import { Login, MainFeed } from './../screens';
import Tabs from './Tabs';
import StackRegister from './StackRegister';

export default createSwitchNavigator ({
    Login: StackRegister,
    Home: Tabs
})