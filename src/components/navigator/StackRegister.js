import { createStackNavigator } from 'react-navigation';

import { Login,Register } from './../screens'

export default createStackNavigator({
    Login: Login,
    Register: Register,
})