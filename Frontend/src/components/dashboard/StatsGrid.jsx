import { Card, CardContent } from '../ui/card';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

export const StatsGrid = ({ stats }) => {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      sub: 'All tasks',
      icon: ListTodo,
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      sub: 'Working on it',
      icon: Clock,
    },
    {
      label: 'Completed',
      value: stats.completed,
      sub: 'Done',
      icon: CheckCircle2,
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      sub: 'Important',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

