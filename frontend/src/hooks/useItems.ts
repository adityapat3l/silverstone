import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { Item } from '../types';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getItems();
      setItems(data);
    } catch {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, fetchItems };
} 