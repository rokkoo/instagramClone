import { createSwitchNavigator } from 'react-navigation';

import ImageEditor from './../screens/ImageEditor';
import Tabs from './Tabs';
import StackRegister from './StackRegister';

export default createSwitchNavigator ({
    Login: StackRegister,
    Home: Tabs,
    ImageEditor: ImageEditor
})