import MenuEntity from '@/entities/Menu'

export const Types = {
  clear: 'clear',
  loading: 'loading',
  progress: 'progress',
  errors: 'errors',
  drawer: 'drawer',
  menus: 'menus'
}

export const path = 'app/'

export class Clear implements FluxStandardAction<void> {
  type = path + Types.clear
  constructor() {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Progress implements FluxStandardAction<number> {
  type = path + Types.progress
  constructor(public payload: number) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Drawer implements FluxStandardAction<boolean | null> {
  type = path + Types.drawer
  constructor(public payload: boolean | null) {}
}

export class Menus implements FluxStandardAction<MenuEntity[] | null> {
  type = path + Types.menus
  constructor(public payload: MenuEntity[] | null) {}
}
