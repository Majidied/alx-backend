#!/usr/bin/env python3
""" LFU Caching """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    
    def __init__(self):
        super().__init__()
        self.order = {}
        self.lfu = None
    
    def put(self, key, item):
        if key and item:
            if len(self.cache_data) >= self.MAX_ITEMS and key not in self.cache_data:
                min_key = min(self.order, key=self.order.get)
                if min_key:
                    del self.cache_data[min_key]
                    del self.order[min_key]
                    print("DISCARD:", min_key)
            self.cache_data[key] = item
            self.order[key] = 0
    
    def get(self, key):
        if key in self.cache_data:
            self.order[key] += 1
            return self.cache_data[key]
        return None


