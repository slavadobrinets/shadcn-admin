import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useTranslation } from 'react-i18next'

export function Overview() {
  const { t } = useTranslation('common')
  
  const data = [
    {
      name: t('dashboard.months.jan'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.feb'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.mar'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.apr'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.may'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.jun'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.jul'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.aug'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.sep'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.oct'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.nov'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: t('dashboard.months.dec'),
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ]

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
