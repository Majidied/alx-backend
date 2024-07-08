#!/usr/bin/python3
"""
Test
"""
import sys

try:
    LRUCache = __import__('3-lru_cache').LRUCache
    from base_caching import BaseCaching

    BaseCaching.MAX_ITEMS = 5
    LRUCache.MAX_ITEMS = 5
    my_cache = LRUCache()
    my_cache.MAX_ITEMS = 5
    prev_key = None

    for i in range(10):
        key = "key-{}".format(i)
        value = "value-{}".format(i)
        if prev_key is not None:
            my_cache.get(prev_key)
        prev_key = key
        my_cache.put(key, value)
        my_cache.print_cache()
    
    my_cache.get("key-0")
    my_cache.get("key-4")
    my_cache.get("key-6")
    my_cache.get("key-7")
    my_cache.print_cache()
    my_cache.put("key-20", "value-20")
    my_cache.put("key-21", "value-21")
    my_cache.put("key-22", "value-22")
    my_cache.print_cache()

except:
    print(sys.exc_info()[1])
