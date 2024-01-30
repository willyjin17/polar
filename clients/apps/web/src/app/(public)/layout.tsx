import PublicLayout from '@/components/Layout/PublicLayout'
import Topbar from '@/components/Shared/Topbar'
import { getServerSideAPI } from '@/utils/api'
import { ListResourceOrganization, UserRead } from '@polar-sh/sdk'
import { notFound } from 'next/navigation'

const cacheConfig = {
  next: {
    revalidate: 30, // 30 seconds
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const api = getServerSideAPI()
  let authenticatedUser: UserRead | undefined
  let userAdminOrganizations: ListResourceOrganization | undefined

  try {
    const [loadAuthenticatedUser, loadUserAdminOrganizations] =
      await Promise.all([
        api.users.getAuthenticated({ cache: 'no-store' }).catch(() => {
          // Handle unauthenticated
          return undefined
        }),
        api.organizations.list({ isAdminOnly: true }, cacheConfig).catch(() => {
          // Handle unauthenticated
          return undefined
        }),
      ])
    authenticatedUser = loadAuthenticatedUser
    userAdminOrganizations = loadUserAdminOrganizations
  } catch (e) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Topbar
        authenticatedUser={authenticatedUser}
        userAdminOrganizations={userAdminOrganizations?.items ?? []}
      />
      <PublicLayout showUpsellFooter={!authenticatedUser} wide>
        <div className="relative flex min-h-screen w-full flex-col">
          {children}
        </div>
      </PublicLayout>
    </div>
  )
}
