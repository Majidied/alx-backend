# 0x01. Caching

## Description
This directory contains a series of tasks focused on caching, an essential technique for optimizing the performance of applications. The tasks explore various caching mechanisms and strategies to efficiently store and retrieve data, thereby reducing access time and improving overall system performance.

## Learning Objectives
- Understand different caching strategies and how they are implemented.
- Learn how to use caching to optimize the performance of backend applications.
- Explore the trade-offs and considerations in choosing a caching strategy.

## Requirements
- Allowed editors: vi, vim, emacs
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- A `README.md` file at the root of the folder of the project is mandatory
- Your code should use the PEP 8 style (version 1.7.*)
- All your files must be executable
- The length of your files will be tested using `wc`

## Files
### Mandatory
- `0-basic_cache.py`: Implements a basic caching system.
- `1-fifo_cache.py`: Implements a FIFO caching system.
- `2-lifo_cache.py`: Implements a LIFO caching system.
- `3-lru_cache.py`: Implements an LRU caching system.
- `4-mru_cache.py`: Implements an MRU caching system.
- `5-lfu_cache.py`: Implements an LFU caching system.

### Advanced
- `100-main.py`: A test script for advanced caching mechanisms.

## Usage
Each Python file can be executed directly or imported as a module. Below are examples of how to use the caching classes:

```python
#!/usr/bin/env python3
from basic_cache import BasicCache

my_cache = BasicCache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
print(my_cache.get("A"))  # Output: Hello
print(my_cache.get("B"))  # Output: World
```

## Caching Strategies
- **Basic Cache**: A simple caching mechanism without any eviction policy.
- **FIFO Cache**: First-In-First-Out caching, evicts the oldest entries first.
- **LIFO Cache**: Last-In-First-Out caching, evicts the most recent entries first.
- **LRU Cache**: Least Recently Used caching, evicts the least recently accessed entries first.
- **MRU Cache**: Most Recently Used caching, evicts the most recently accessed entries first.
- **LFU Cache**: Least Frequently Used caching, evicts the least frequently accessed entries first.

## Author
- [Mohammed Majidi](https://github.com/majidied)
