'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function ViewsChart({ data }: { data: { day: string; views: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-600)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--gold-600)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            border: '1px solid var(--border-subtle)',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
          }}
        />
        <Area type="monotone" dataKey="views" stroke="var(--gold-600)" strokeWidth={2} fill="url(#goldFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
