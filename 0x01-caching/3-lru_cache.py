#!/usr/bin/env python3
""" LRU Caching """
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    Least Recently Used (LRU) Cache implementation.
    """

    def __init__(self):
        super().__init__()
        self.order = []

    def put(self, key, item):
        """
        Add an item to the cache.

        Args:
            key: The key of the item.
            item: The item to be added.

        Returns:
            None
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key not in self.cache_data:
                    discard = self.order.pop(0)
                    del self.cache_data[discard]
                    print("DISCARD:", discard)
                else:
                    self.order.remove(key)
                    self.order.append(key)
            self.cache_data[key] = item
            if key not in self.order:
                self.order.append(key)

    def get(self, key):
        """
        Get an item from the cache by key.

        Args:
            key: The key of the item to retrieve.

        Returns:
            The item associated with the key, or None if the key is not found.
        """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
