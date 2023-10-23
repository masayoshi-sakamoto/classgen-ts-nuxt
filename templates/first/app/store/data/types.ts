export const Types = {
  loading: 'loading',
  saving: 'saving',
  removing: 'removing',
  finished: 'finished',
  errors: 'errors',
  dialog: 'dialog',
  none: 'none'
}

export const path = 'data/'

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

export class Finished implements FluxStandardAction<boolean | string | null> {
  type = path + Types.finished
  constructor(public payload: boolean | string | null) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Dialog implements FluxStandardAction<boolean | null> {
  type = path + Types.dialog
  constructor(public payload: boolean | null) {}
}

export class None implements FluxStandardAction<boolean | null> {
  type = path + Types.none
  constructor(public payload: boolean | null) {}
}
