import { createStackNavigator } from 'react-navigation';

import { Login,Register } from './../screens'

export default createStackNavigator({
    Register: Register,
    Login: Login,
})