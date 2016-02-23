/**
 * This file contains some helper methods for creatcing type-safe Redux Actions
 */
export abstract class Action {
  type: string;
}

export interface ActionClass<T extends Action> {
  prototype: T;
}

export function typeName(name: string) {
  return function<T extends Action>(actionClass: ActionClass<T>) {
    actionClass.prototype.type = name;
  }
}

export function isType<T extends Action>(action: Action, actionClass: ActionClass<T>): action is T {
  return action.type == actionClass.prototype.type;
}
