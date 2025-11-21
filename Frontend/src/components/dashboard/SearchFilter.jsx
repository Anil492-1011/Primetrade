import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const statuses = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

const priorities = [
  { label: 'All Priorities', value: '' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const SearchFilter = ({ filters, onChange, onReset }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Search tasks..."
              className="pl-10"
            />
          </div>
        </div>
        <select
          className="h-10 rounded-md border bg-white px-3 text-sm"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          {statuses.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          className="h-10 rounded-md border bg-white px-3 text-sm"
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          {priorities.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex justify-end">
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

