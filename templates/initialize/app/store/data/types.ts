export const Types = {
  loading: 'loading',
  dialog: 'dialog',
  saving: 'saving',
  removing: 'removing',
  errors: 'errors'
}

export const path = 'data/'

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Dialog implements FluxStandardAction<boolean | null> {
  type = path + Types.dialog
  constructor(public payload: boolean | null) {}
}

export class Saving implements FluxStandardAction<boolean | null> {
  type = path + Types.saving
  constructor(public payload: boolean | null) {}
}

export class Removing implements FluxStandardAction<boolean | null> {
  type = path + Types.removing
  constructor(public payload: boolean | null) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}
