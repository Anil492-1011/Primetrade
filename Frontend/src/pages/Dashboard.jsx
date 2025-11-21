import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/button';
import { TaskTable } from '../components/dashboard/TaskTable';
import { SearchFilter } from '../components/dashboard/SearchFilter';
import { TaskDialog } from '../components/dashboard/TaskDialog';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { useAuth } from '../context/AuthContext';
import {
  createItemRequest,
  deleteItemRequest,
  fetchItemsRequest,
  updateItemRequest,
} from '../services/itemService';

const Dashboard = () => {
  useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async (extraFilters = {}) => {
    try {
      setLoading(true);
      const params = { ...filters, ...extraFilters };
      const { data } = await fetchItemsRequest(params);
      setTasks(data.data);
      console.log('Fetched tasks:', data.data);
      
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const highPriority = tasks.filter((t) => t.priority === 'high').length;
    const percentComplete = total ? Math.round((completed / total) * 100) : 0;

    return { total, inProgress, completed, highPriority, percentComplete };
  }, [tasks]);

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
    fetchTasks(nextFilters);
  };

  const handleReset = () => {
    const reset = { search: '', status: '', priority: '' };
    setFilters(reset);
    fetchTasks(reset);
  };

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (selectedTask) {
        const { data } = await updateItemRequest(selectedTask._id, payload);
        setTasks((prev) => prev.map((task) => (task._id === selectedTask._id ? data.data : task)));
      } else {
        const { data } = await createItemRequest(payload);
        setTasks((prev) => [data.data, ...prev]);
      }
      setDialogOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Unable to save task', error);
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteItemRequest(task._id);
      setTasks((prev) => prev.filter((item) => item._id !== task._id));
    } catch (error) {
      console.error('Unable to delete task', error);
    }
  };

  const actions = (
    <Button
      onClick={() => {
        setSelectedTask(null);
        setDialogOpen(true);
      }}
      className="rounded-full px-6"
    >
      + New Task
    </Button>
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      filters.search === '' ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.tags?.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesStatus = filters.status === '' || task.status === filters.status;
    const matchesPriority = filters.priority === '' || task.priority === filters.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <AppLayout title="Insight Dashboard" actions={actions}>
      <div className="space-y-8">
        <StatsGrid stats={stats} />
        <div className="space-y-6">
          <SearchFilter filters={filters} onChange={handleFilterChange} onReset={handleReset} />
          {loading ? (
            <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">Loading tasks...</div>
          ) : (
            <TaskTable
              tasks={filteredTasks}
              pageSize={3}
              onEdit={(task) => {
                setSelectedTask(task);
                setDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedTask(null);
        }}
        task={selectedTask}
        onSubmit={handleCreateOrUpdate}
        loading={loading}
      />
    </AppLayout>
  );
};

export default Dashboard;

