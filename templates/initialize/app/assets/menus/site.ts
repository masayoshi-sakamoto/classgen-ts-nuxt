import { EmptyMenuPropsFactory, IMenuProps } from '@/entities/Menu'

const menus: IMenuProps[] = [
  EmptyMenuPropsFactory({
    id: 'product',
    title: '製品',
    to: { name: 'product' }
  }),
  EmptyMenuPropsFactory({
    id: 'solution',
    title: 'ソリューション',
    to: { name: 'solution' }
  }),
  EmptyMenuPropsFactory({
    id: 'price',
    title: '価格',
    to: { name: 'price' }
  }),
  EmptyMenuPropsFactory({
    id: 'contact',
    title: 'お問い合わせ',
    to: { name: 'contact' }
  })
]
export default menus
