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
            if key not in self.cache_data:
                self.order[key] = 0
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.lfu
                self.order[discard] = 0
                del self.cache_data[discard]
            self.cache_data[key] = item
            self.order[key] += 1
            self.lfu = max([value for key, value in self.order.items()])
    
    def get(self, key):
        if key in self.cache_data:
            self.order[key] += 1
            return self.cache_data[key]
        return None


