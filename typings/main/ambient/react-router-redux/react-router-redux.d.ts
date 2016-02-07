// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/e6236157ce37fe1c8f2e3babd0bee364d8788c8b/react-router-redux/react-router-redux.d.ts
// Type definitions for react-router-redux v2.1.0
// Project: https://github.com/rackt/react-router-redux
// Definitions by: Isman Usoh <http://github.com/isman-usoh>, Noah Shipley <https://github.com/noah79>, Dimitri Rosenberg <https://github.com/rosendi>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare namespace ReactRouterRedux {
    import R = Redux;
    import H = HistoryModule;

    const TRANSITION: string;
    const UPDATE_LOCATION: string;

    const push: PushAction;
    const replace: ReplaceAction;
    const go: GoAction;
    const goBack: GoForwardAction;
    const goForward: GoBackAction;
    const routeActions: RouteActions;

    type LocationDescriptor = H.Location | H.Path;
    type PushAction = (nextLocation: LocationDescriptor) => void;
    type ReplaceAction = (nextLocation: LocationDescriptor) => void;
    type GoAction = (n: number) => void;
    type GoForwardAction = () => void;
    type GoBackAction = () => void;

    interface RouteActions {
        push: PushAction;
        replace: ReplaceAction;
        go: GoAction;
        goForward: GoForwardAction;
        goBack: GoBackAction;
    }
    interface HistoryMiddleware extends R.Middleware {
        listenForReplays(store: R.Store, selectLocationState?: Function): void;
        unsubscribe(): void;
    }

    function routeReducer(state?: any, options?: any): R.Reducer;
    function syncHistory(history: H.History): HistoryMiddleware;
}

declare module "react-router-redux" {
    export = ReactRouterRedux;
}