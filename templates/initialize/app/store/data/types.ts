export const Types = {
  observer: 'observer',
  loading: 'loading',
  saving: 'saving',
  removing: 'removing',
  finished: 'finished',
  none: 'none',
  errors: 'errors',
  dialog: 'dialog'
}

export const path = 'data/'

export class Observer implements FluxStandardAction<any> {
  type = path + Types.observer
  constructor(public payload: any) {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Saving implements FluxStandardAction<boolean | null> {
  type = path + Types.saving
  constructor(public payload: boolean | null) {}
}

export class Removing implements FluxStandardAction<boolean | null> {
  type = path + Types.removing
  constructor(public payload: boolean | null) {}
}

export class Finished implements FluxStandardAction<boolean | null> {
  type = path + Types.finished
  constructor(public payload: boolean | null) {}
}

export class None implements FluxStandardAction<boolean | null> {
  type = path + Types.none
  constructor(public payload: boolean | null) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Dialog implements FluxStandardAction<boolean | null> {
  type = path + Types.dialog
  constructor(public payload: boolean | null) {}
}
