import { useEffect, useState } from 'react'
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { IconArrowUpRight, IconLoader2 } from '@tabler/icons-react'
import { SignedIn, useAuth, UserButton } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import { ClerkLogo } from '@/assets/clerk-logo'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { LearnMore } from '@/components/learn-more'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { createColumns } from '@/features/users/components/users-columns'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons'
import { UsersTable } from '@/features/users/components/users-table'
import UsersProvider from '@/features/users/context/users-context'
import { userListSchema } from '@/features/users/data/schema'
import { users } from '@/features/users/data/users'

export const Route = createFileRoute('/clerk/_authenticated/user-management')({
  component: UserManagement,
})

function UserManagement() {
  const [opened, setOpened] = useState(true)
  const { isLoaded, isSignedIn } = useAuth()
  const { t } = useTranslation()

  if (!isLoaded) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <IconLoader2 className='size-8 animate-spin' />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Unauthorized />
  }

  // Parse user list
  const userList = userListSchema.parse(users)
  // Создаем колонки с функцией перевода
  const columns = createColumns(t)
  return (
    <>
      <SignedIn>
        <UsersProvider>
          <Header fixed>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <UserButton />
            </div>
          </Header>

          <Main>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>Список пользователей</h2>
                <div className='flex gap-1'>
                  <p className='text-muted-foreground'>
                    Управляйте своими пользователями и их ролями здесь.
                  </p>
                  <LearnMore
                    open={opened}
                    onOpenChange={setOpened}
                    contentProps={{ side: 'right' }}
                  >
                    <p>
                      Это то же самое, что{' '}
                      <Link
                        to='/users'
                        className='text-blue-500 underline decoration-dashed underline-offset-2'
                      >
                        '/users'
                      </Link>
                    </p>

                    <p className='mt-4'>
                      Вы можете выйти или управлять/удалить свою учетную запись через меню профиля пользователя в правом верхнем углу страницы.
                      <IconArrowUpRight className='inline-block size-4' />
                    </p>
                  </LearnMore>
                </div>
              </div>
              <UsersPrimaryButtons />
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
              <UsersTable data={userList} columns={columns} />
            </div>
          </Main>

          <UsersDialogs />
        </UsersProvider>
      </SignedIn>
    </>
  )
}

const COUNTDOWN = 5 // Countdown second

function Unauthorized() {
  const navigate = useNavigate()
  const { history } = useRouter()

  const [opened, setOpened] = useState(true)
  const [cancelled, setCancelled] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN)

  // Set and run the countdown conditionally
  useEffect(() => {
    if (cancelled || opened) return
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [cancelled, opened])

  // Navigate to sign-in page when countdown hits 0
  useEffect(() => {
    if (countdown > 0) return
    navigate({ to: '/clerk/sign-in' })
  }, [countdown, navigate])

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>401</h1>
        <span className='font-medium'>Несанкционированный доступ</span>
        <p className='text-muted-foreground text-center'>
          Вы должны быть аутентифицированы через Clerk{' '}
          <sup>
            <LearnMore open={opened} onOpenChange={setOpened}>
              <p>
                Это то же самое, что{' '}
                <Link
                  to='/users'
                  className='text-blue-500 underline decoration-dashed underline-offset-2'
                >
                  '/users'
                </Link>
                .{' '}
              </p>
              <p>Вы должны сначала войти в систему, используя Clerk, чтобы получить доступ к этому маршруту. </p>

              <p className='mt-4'>
                После входа в систему вы сможете выйти или удалить свою учетную запись через меню профиля пользователя в правом верхнем углу страницы.
              </p>
            </LearnMore>
          </sup>
          <br />
          для доступа к этому ресурсу.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Назад
          </Button>
          <Button onClick={() => navigate({ to: '/clerk/sign-in' })}>
            <ClerkLogo className='invert' /> Войти
          </Button>
        </div>
        <div className='mt-4 h-8 text-center'>
          {!cancelled && !opened && (
            <>
              <p>
                {countdown > 0
                  ? `Перенаправление на страницу входа через ${countdown}с`
                  : `Перенаправление...`}
              </p>
              <Button variant='link' onClick={() => setCancelled(true)}>
                Отменить перенаправление
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
