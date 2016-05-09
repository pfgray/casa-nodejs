// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/a513c4df6eb8505da8eef432891c8b69b73535d9/react-redux/react-redux.d.ts
// Type definitions for react-redux 2.1.2
// Project: https://github.com/rackt/react-redux
// Definitions by: Qubo <https://github.com/tkqubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'react-redux' {

  import { Component } from 'react';
  import { Store, Dispatch, ActionCreator } from 'redux';

  export class ElementClass<S, R> extends Component<S, R> { }

  export interface ClassDecorator<S, R> {
    <T extends (typeof ElementClass)>(component: T): T
  }

  /**
   * Connects a React component to a Redux store.
   * @param mapStateToProps
   * @param mapDispatchToProps
   * @param mergeProps
   * @param options
     */
  export function connect<S, R>(mapStateToProps?: MapStateToProps,
                          mapDispatchToProps?: MapDispatchToPropsFunction|MapDispatchToPropsObject,
                          mergeProps?: MergeProps,
                          options?: Options): ClassDecorator<S, R>;

  interface MapStateToProps {
    (state: any, ownProps?: any): any;
  }

  interface MapDispatchToPropsFunction {
    (dispatch: Dispatch<any>, ownProps?: any): any;
  }

  interface MapDispatchToPropsObject {
    [name: string]: ActionCreator<any>;
  }

  interface MergeProps {
    (stateProps: any, dispatchProps: any, ownProps: any): any;
  }

  interface Options {
    /**
     * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
     * preventing unnecessary updates, assuming that the component is a “pure” component
     * and does not rely on any input or state other than its props and the selected Redux store’s state.
     * Defaults to true.
     * @default true
     */
    pure: boolean;
  }

  export interface Property<S> {
    /**
     * The single Redux store in your application.
     */
    store?: Store<S>;
    children?: Function;
  }

  /**
   * Makes the Redux store available to the connect() calls in the component hierarchy below.
   */
  export class Provider<S> extends Component<Property<S>, {}> { }
}
