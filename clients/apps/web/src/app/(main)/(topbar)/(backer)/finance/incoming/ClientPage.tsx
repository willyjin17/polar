'use client'

import AccountBalance from '@/components/Transactions/AccountBalance'
import AccountBanner from '@/components/Transactions/AccountBanner'
import PayoutTransactionsList from '@/components/Transactions/PayoutTransactionsList'
import TransactionsList from '@/components/Transactions/TransactionsList'
import { useAuth } from '@/hooks'
import { useAccount, useSearchTransactions } from '@/hooks/queries'
import {
  DataTablePaginationState,
  DataTableSortingState,
  getAPIParams,
  serializeSearchParams,
} from '@/utils/datatable'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@polar-sh/ui/components/atoms/Tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function ClientPage({
  pagination,
  sorting,
}: {
  pagination: DataTablePaginationState
  sorting: DataTableSortingState
}) {
  const { currentUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setActiveTab = useCallback(
    (value: string) => {
      router.replace(`/finance/incoming?type=${value}`)
    },
    [router],
  )

  const setPagination = (
    updaterOrValue:
      | DataTablePaginationState
      | ((old: DataTablePaginationState) => DataTablePaginationState),
  ) => {
    const updatedPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination)
        : updaterOrValue

    router.push(
      `${pathname}?${serializeSearchParams(updatedPagination, sorting)}`,
    )
  }

  const setSorting = (
    updaterOrValue:
      | DataTableSortingState
      | ((old: DataTableSortingState) => DataTableSortingState),
  ) => {
    const updatedSorting =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting)
        : updaterOrValue

    router.push(
      `${pathname}?${serializeSearchParams(pagination, updatedSorting)}`,
    )
  }

  const { data: account, isLoading: accountIsLoading } = useAccount(
    currentUser?.account_id,
  )

  const balancesHook = useSearchTransactions({
    account_id: account?.id,
    type: 'balance',
    exclude_platform_fees: true,
    ...getAPIParams(pagination, sorting),
  })
  const balances = balancesHook.data?.items || []
  const balancesCount = balancesHook.data?.pagination.max_page ?? 1

  const payoutsHooks = useSearchTransactions({
    account_id: account?.id,
    type: 'payout',
    ...getAPIParams(pagination, sorting),
  })
  const refetchPayouts = payoutsHooks.refetch
  const payouts = payoutsHooks.data?.items || []
  const payoutsCount = payoutsHooks.data?.pagination.max_page ?? 1

  const onWithdrawSuccess = useCallback(async () => {
    await refetchPayouts()
  }, [refetchPayouts])

  return (
    <div className="flex flex-col gap-y-8">
      {currentUser && <AccountBanner user={currentUser} />}
      {account && (
        <AccountBalance
          account={account}
          onWithdrawSuccess={onWithdrawSuccess}
        />
      )}
      <Tabs
        defaultValue={params?.get('type') ?? 'transactions'}
        onValueChange={setActiveTab}
      >
        <div className="mb-8 flex flex-col justify-between gap-y-6 md:flex-row md:gap-y-0">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-medium capitalize">
              {params?.get('type') ?? 'Transactions'}
            </h2>
            <p className="dark:text-polar-500 text-sm text-gray-500">
              {params?.get('type') === 'payouts'
                ? 'Made from your account to your bank account'
                : 'Made from Polar to your account'}
            </p>
          </div>

          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="transactions">
          <TransactionsList
            transactions={balances}
            pageCount={balancesCount}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={accountIsLoading || balancesHook.isLoading}
          />
        </TabsContent>
        <TabsContent value="payouts">
          <PayoutTransactionsList
            transactions={payouts}
            pageCount={payoutsCount}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={accountIsLoading || payoutsHooks.isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
