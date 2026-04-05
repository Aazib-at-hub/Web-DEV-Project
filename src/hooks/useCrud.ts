import { useState, useEffect, useCallback } from 'react';
import { Department } from '@/types';
import { departmentApi } from '@/services/api';
import { toast } from 'sonner';

export const useCrud = <T extends { _id: string }>(
  api: {
    getAll: () => Promise<T[]>;
    create: (data: any) => Promise<T>;
    update: (id: string, data: any) => Promise<T>;
    delete: (id: string) => Promise<void>;
  }
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setItems(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => { refresh(); }, [refresh]);

  const create = async (data: any) => {
    try {
      await api.create(data);
      toast.success('Created successfully');
      await refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create');
      throw err;
    }
  };

  const update = async (id: string, data: any) => {
    try {
      await api.update(id, data);
      toast.success('Updated successfully');
      await refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await api.delete(id);
      toast.success('Deleted successfully');
      await refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return { items, loading, create, update, remove, refresh };
};
