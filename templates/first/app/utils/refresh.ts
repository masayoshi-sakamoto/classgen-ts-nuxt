import { IApp } from '@/types/nuxt'

export default async function refresh(app: IApp) {
  const now = new Date().getTime()
  if (app.auth.expired && app.auth.expired < now) {
    app.auth.auth = await app.upstreamGateway.Auth.Refresh()
  }
}
