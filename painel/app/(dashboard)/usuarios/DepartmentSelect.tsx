'use client';

import { useState, useTransition } from 'react';
import { Select } from '@/components/ui';
import { DEPARTMENT_LABELS, type Department } from '@/lib/types';
import { updateDepartment } from './actions';

export function DepartmentSelect({ userId, current }: { userId: string; current: Department }) {
  const [value, setValue] = useState(current);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Department;
    setValue(next);
    startTransition(async () => {
      await updateDepartment(userId, next);
    });
  }

  return (
    <Select value={value} onChange={handleChange} disabled={isPending} className="max-w-[200px]">
      {Object.entries(DEPARTMENT_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </Select>
  );
}
