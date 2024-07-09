#!/usr/bin/env python3
""" LFU Caching """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache class represents a Least Frequently Used (LFU) cache
    implementation.
    It inherits from the BaseCaching class.

    Attributes:
        order (dict): A dictionary to keep track of the order of key usage.
        lfu (None): A placeholder attribute, not used in this implementation.
    """

    def __init__(self):
        super().__init__()
        self.order = {}
        self.lfu = None

    def put(self, key, item):
        """
        Adds an item to the cache.

        Args:
            key: The key of the item.
            item: The item to be added.

        Returns:
            None
        """
        if key and item:
            if len(self.cache_data) >= self.MAX_ITEMS and key not in self.cache_data:  # noqa: E501
                min_key = min(self.order, key=self.order.get)
                if min_key:
                    del self.cache_data[min_key]
                    del self.order[min_key]
                    print("DISCARD:", min_key)
            self.cache_data[key] = item
            self.order[key] = 0

    def get(self, key):
        """
        Retrieves an item from the cache.

        Args:
            key: The key of the item to retrieve.

        Returns:
            The item associated with the key, or None if the key is not found.
        """
        if key in self.cache_data:
            self.order[key] += 1
            return self.cache_data[key]
        return None
