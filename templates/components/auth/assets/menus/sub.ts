import { EmptyMenuPropsFactory, IMenuProps } from '@/entities/Menu'

const sub: IMenuProps[] = [
  EmptyMenuPropsFactory({
    id: 'account',
    title: 'アカウント',
    icon: 'fas fa-user'
  })
]

export default sub
