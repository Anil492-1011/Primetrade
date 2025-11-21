import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-emerald-100 text-emerald-800',
};

const priorityStyles = {
  low: 'text-emerald-600',
  medium: 'text-amber-600',
  high: 'text-red-600',
};

export const TaskTable = ({ tasks, onEdit, onDelete, pageSize = 8 }) => {
  const [page, setPage] = useState(1);

  const total = tasks.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, page, pageSize]);

  if (!tasks.length) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <p className="text-lg font-semibold">No tasks yet</p>
        <p className="text-sm text-muted-foreground">Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      {/* Table view for medium+ screens */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((task) => (
              <TableRow key={task._id}>
                <TableCell>
                  <p className="font-semibold">{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[task.status]}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell className="capitalize">
                  <span className={`text-sm font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex flex-wrap gap-1">
                    {task.tags?.length
                      ? task.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            #{tag}
                          </span>
                        ))
                      : '—'}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : '—'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(task)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card list for small screens */}
      <div className="block md:hidden">
        <div className="space-y-3 p-4">
          {paginated.map((task) => (
            <div key={task._id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm">{task.title}</p>
                  {task.description && <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${statusStyles[task.status]}`}>{task.status.replace('_', ' ')}</span>
                    <span className={`font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                    {task.tags?.length ? (
                      task.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">#{t}</span>
                      ))
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-muted-foreground">{task.dueDate ? format(new Date(task.dueDate), 'MMM dd') : '—'}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(task)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </Button>

          <div className="hidden items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm md:flex">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-7 w-7 rounded-md text-sm ${p === page ? 'bg-primary text-white' : 'text-muted-foreground'}`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

