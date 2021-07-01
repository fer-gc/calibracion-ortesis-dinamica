// @flow
import { NavigationActions,StackActions } from '@react-navigation/native';

export const resetAndNavigateTo = (navigation: any, routeName: string, params: any) => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })]
  });
  navigation.dispatch(actionToDispatch);
};

export const goBack = (navigation: any) => {
  const actionToDispatch = NavigationActions.back();
  navigation.dispatch(actionToDispatch);
};

export const goAndNavigateToParams = (navigation: any, routeName: string, params?: any) => {
  const actionToDispatch = NavigationActions.navigate({ routeName, params });
  navigation.dispatch(actionToDispatch);
};

export const goAndNavigateTo = (navigation: any, routeName: string) => {
  const actionToDispatch = NavigationActions.navigate( {routeName} );
  navigation.dispatch(actionToDispatch);
};

export const goTo = async (navigation: any, routeName: string, ) => {
  goAndNavigateTo(navigation, routeName);
};





