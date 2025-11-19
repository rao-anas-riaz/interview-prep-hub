import { QuestionCategory } from '../types';

const pythonCoreCategory: QuestionCategory = {
    id: 'python_core',
    title: 'Python Core Concepts',
    icon: 'fa-brands fa-python',
    description: 'Fundamental Python concepts, data structures, and algorithms.',
    questions: [
        {
            id: 'py-gen-1',
            question: 'What is the difference between a list, tuple, and set?',
            concepts: '**Mutability**: Can the object be changed after creation?\n**Order**: Does the object maintain the insertion order of elements?\n**Duplicates**: Can the object contain duplicate elements?',
            answer: 'They are three distinct built-in collection data types:\n- **List**: Mutable (changeable), ordered, and allows duplicate elements. Defined with square brackets `[]`.\n- **Tuple**: Immutable (unchangeable), ordered, and allows duplicate elements. Defined with parentheses `()`.\n- **Set**: Mutable, unordered, and does **not** allow duplicate elements. Used for membership testing and eliminating duplicates. Defined with curly braces `{}`.',
            example: '---CODE_START---python\nmy_list = [1, "a", 2, "a"]  # Duplicates allowed\nmy_tuple = (1, "a", 2, "a") # Duplicates allowed\nmy_set = {1, "a", 2}      # Duplicates are automatically removed\n\nmy_list[0] = 99 # Works\n# my_tuple[0] = 99 # TypeError: \'tuple\' object does not support item assignment\n---CODE_END---'
        },
        {
            id: 'py-gen-2',
            question: 'What is the difference between a deep copy and a shallow copy?',
            concepts: '**Shallow Copy**: Creates a new object, but inserts references to the objects found in the original.\n**Deep Copy**: Creates a new object and recursively copies all objects found in the original.',
            answer: 'The difference matters when you have nested objects, like a list of lists.\n- A **shallow copy** creates a new outer object, but the inner objects are just references. If you modify a nested object in the copy, the original is also changed.\n- A **deep copy** creates a completely independent copy of both the outer and all inner objects. Changes to the copy will not affect the original.',
            example: '---CODE_START---python\nimport copy\n\noriginal_list = [1, 2, [3, 4]]\n\n# Shallow copy\nshallow = copy.copy(original_list)\nshallow[2][0] = 99\n# original_list is now [1, 2, [99, 4]] -- it was affected!\n\n# Deep copy\noriginal_list = [1, 2, [3, 4]] # Reset\ndeep = copy.deepcopy(original_list)\ndeep[2][0] = 99\n# original_list is still [1, 2, [3, 4]] -- it was not affected!\n---CODE_END---'
        },
        {
            id: 'py-gen-3',
            question: 'What are Python’s built-in data types?',
            concepts: '**Data Types**: Classifications that specify which type of value a variable has and what type of mathematical, relational, or logical operations can be applied to it without causing an error.',
            answer: 'Python has several built-in data types, which can be grouped as:\n- **Text Type**: `str`\n- **Numeric Types**: `int`, `float`, `complex`\n- **Sequence Types**: `list`, `tuple`, `range`\n- **Mapping Type**: `dict`\n- **Set Types**: `set`, `frozenset`\n- **Boolean Type**: `bool`\n- **Binary Types**: `bytes`, `bytearray`, `memoryview`\n- **None Type**: `NoneType`',
            example: 'You can check the type of any object using the `type()` function. `type(123)` returns `<class \'int\'>`, and `type("hello")` returns `<class \'str\'>`.'
        },
        {
            id: 'py-gen-4',
            question: 'Explain mutable vs immutable objects.',
            concepts: '**Mutable Objects**: Objects whose state can be changed after they are created.\n**Immutable Objects**: Objects whose state cannot be changed after they are created.',
            answer: 'This is a core concept in Python.\n- **Mutable**: These objects can be modified in-place. Examples include `list`, `dict`, `set`.\n- **Immutable**: These objects cannot be modified. If you "change" them, you are actually creating a new object in memory. Examples include `int`, `float`, `str`, `tuple`.',
            example: '---CODE_START---python\n# Mutable list\nmy_list = [1, 2, 3]\nmy_list.append(4) # my_list is changed in-place\n\n# Immutable string\nmy_string = "hello"\nmy_string.upper() # This returns a NEW string "HELLO"\n# my_string is still "hello"\n---CODE_END---'
        },
        {
            id: 'py-gen-5',
            question: 'How does Python manage memory?',
            concepts: '**Reference Counting**: A memory management technique where memory is deallocated when there are no more references to an object.\n**Garbage Collection**: A process to reclaim memory occupied by objects that are no longer in use.',
            answer: 'Python uses a combination of **automatic private heap space management**, **reference counting**, and a **cyclic garbage collector**.\n1.  **Reference Counting**: Every object has a count of how many variables reference it. When the count drops to zero, the object\'s memory is immediately deallocated.\n2.  **Garbage Collector**: Reference counting can\'t handle reference cycles (e.g., A points to B, and B points to A). Python runs a periodic garbage collector that finds and breaks these cycles to free up memory.',
            example: '`a = []` creates a list, its reference count is 1. `b = a` makes the count 2. `del a` makes the count 1. `del b` makes the count 0, and the list object is removed from memory.'
        },
        {
            id: 'py-gen-6',
            question: 'What are *args and **kwargs?',
            concepts: '**Arbitrary Arguments**: A way to pass a variable number of arguments to a function.',
            answer: '`*args` and `**kwargs` are special syntax to allow a function to accept a variable number of arguments.\n- **`*args`** (Non-Keyword Arguments): Collects extra positional arguments into a **tuple**.\n- **`**kwargs`** (Keyword Arguments): Collects extra keyword arguments into a **dictionary**.',
            example: '---CODE_START---python\ndef my_func(required_arg, *args, **kwargs):\n    print(f"Required: {required_arg}")\n    print(f"Args: {args}")\n    print(f"Kwargs: {kwargs}")\n\nmy_func("hi", 1, 2, 3, name="Alice", age=30)\n# Output:\n# Required: hi\n# Args: (1, 2, 3)\n# Kwargs: {\'name\': \'Alice\', \'age\': 30}\n---CODE_END---'
        },
        {
            id: 'py-gen-7',
            question: 'What is list comprehension and why use it?',
            concepts: '**Syntactic Sugar**: Syntax within a programming language that is designed to make things easier to read or to express.\n**Conciseness**: Being brief and comprehensive.',
            answer: 'List comprehension offers a shorter, more readable syntax for creating a new list based on the values of an existing list.\nIt is often more performant than using a for loop with `.append()` because it is optimized in CPython.',
            example: '---CODE_START---python\n# Traditional for loop\nsquares = []\nfor i in range(5):\n    squares.append(i * i)\n\n# List comprehension (more Pythonic)\nsquares_comp = [i * i for i in range(5)]\n\n# With a condition\neven_squares = [i * i for i in range(10) if i % 2 == 0]\n---CODE_END---'
        },
        {
            id: 'py-gen-8',
            question: 'Explain lambda functions.',
            concepts: '**Anonymous Function**: A function that is not bound to an identifier (a name).\n**Functional Programming**: A programming paradigm where programs are constructed by applying and composing functions.',
            answer: 'A lambda function is a small, anonymous function defined with the `lambda` keyword. It can take any number of arguments, but can only have one expression.\nThey are syntactically restricted to a single expression and are often used when you need a simple, one-off function for a short period, such as an argument to a higher-order function like `map()`, `filter()`, or `sorted()`.',
            example: '---CODE_START---python\n# A lambda function that adds 10\nadd_ten = lambda x: x + 10\nprint(add_ten(5)) # Output: 15\n\n# Using lambda with sorted()\npoints = [(1, 2), (4, 1), (3, 5)]\n# Sort by the second element of each tuple\nsorted_points = sorted(points, key=lambda point: point[1])\nprint(sorted_points) # Output: [(4, 1), (1, 2), (3, 5)]\n---CODE_END---'
        },
        {
            id: 'py-gen-9',
            question: 'What is the difference between “==” and “is”?',
            concepts: '**Equality**: Comparing the values of two objects.\n**Identity**: Comparing if two references point to the exact same object in memory.',
            answer: 'This is a crucial distinction:\n- **`==`** (Equality operator): Checks if the **values** of two operands are equal.\n- **`is`** (Identity operator): Checks if two variables point to the **same object in memory**.',
            example: '---CODE_START---python\nlist_a = [1, 2, 3]\nlist_b = [1, 2, 3]\nlist_c = list_a\n\nprint(list_a == list_b) # True (values are the same)\nprint(list_a is list_b) # False (they are different objects in memory)\nprint(list_a is list_c) # True (they point to the same object)\n---CODE_END---'
        },
        {
            id: 'py-gen-10',
            question: 'Explain generators and the yield keyword.',
            concepts: '**Iterator**: An object that contains a countable number of values and can be iterated upon.\n**Lazy Evaluation**: An evaluation strategy which delays the evaluation of an expression until its value is needed.',
            answer: 'A generator is a special type of iterator, created using a function with the `yield` keyword. It allows you to declare a function that behaves like an iterator, i.e., it can be used in a `for` loop.\nInstead of `return`ing a value and exiting, `yield` pauses the function, saves its state, and returns a value. On the next call, it resumes from where it left off. This is memory-efficient for working with large data streams because it produces items one at a time, on demand (lazy evaluation), rather than creating a complete list in memory.',
            example: '---CODE_START---python\ndef count_up_to(max):\n    count = 1\n    while count <= max:\n        yield count # Pauses and returns the value\n        count += 1\n\n# The generator doesn\'t compute all numbers at once\ncounter = count_up_to(5)\n\nfor number in counter:\n    print(number) # Prints 1, 2, 3, 4, 5 one by one\n---CODE_END---'
        },
        {
            id: 'py-gen-11',
            question: 'How does exception handling work in Python?',
            concepts: '**try, except, else, finally**: Keywords used to handle errors and exceptions gracefully without crashing the program.',
            answer: 'Python uses a `try...except` block to handle errors.\n- **`try`**: The code that might raise an exception is placed here.\n- **`except`**: If an exception occurs in the `try` block, the code in the `except` block is executed. You can specify which exception to catch.\n- **`else`**: This block is executed if no exceptions are raised in the `try` block.\n- **`finally`**: This block is always executed, whether an exception occurred or not. It is typically used for cleanup actions, like closing a file.',
            example: '---CODE_START---python\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("You can\'t divide by zero!")\nelse:\n    print(f"The result is {result}")\nfinally:\n    print("Execution finished.")\n---CODE_END---'
        },
        {
            id: 'py-gen-12',
            question: 'Explain decorators and their use cases.',
            concepts: '**Decorator**: A design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure. Decorators are usually called before the definition of a function you want to decorate.',
            answer: 'A decorator is a function that takes another function as an argument, adds some functionality, and returns another function. It is a way to wrap a function in another function.\nThis is useful for:\n- **Logging**: Log when a function is called and with what arguments.\n- **Timing**: Measure the execution time of a function.\n- **Authorization**: Check if a user has permission before running a function (common in web frameworks like Flask/Django).',
            example: '---CODE_START---python\nimport time\n\ndef timing_decorator(func):\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")\n        return result\n    return wrapper\n\n@timing_decorator\ndef slow_function():\n    time.sleep(2)\n\nslow_function()\n# Output: slow_function took 2.00xx seconds\n---CODE_END---'
        },
        {
            id: 'py-gen-13',
            question: 'What is the GIL? Does it affect multithreading?',
            concepts: '**Global Interpreter Lock (GIL)**: A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at the same time.',
            answer: 'The GIL is a mutex in CPython (the standard Python interpreter) that allows only **one thread to execute Python bytecode at a time**. This means even on a multi-core processor, only one thread can be running Python code at any given moment.\n\n**Impact on Multithreading**:\n- For **CPU-bound** tasks (e.g., heavy calculations), the GIL makes multithreading ineffective for achieving parallelism. You should use `multiprocessing` instead.\n- For **I/O-bound** tasks (e.g., waiting for network requests or file reads), multithreading is still very effective. The GIL is released while a thread is waiting for I/O, allowing other threads to run.',
            example: 'A web scraper that makes many network requests (I/O-bound) will see a great performance boost from multithreading. A program that calculates complex math problems (CPU-bound) will not.'
        },
        {
            id: 'py-gen-14',
            question: 'What is the difference between multiprocessing and multithreading?',
            concepts: '**Process**: An instance of a program being executed, with its own memory space.\n**Thread**: The smallest unit of execution within a process. Threads within the same process share the same memory space.',
            answer: 'Both are ways to achieve concurrency, but they work differently:\n- **Multithreading**: Runs multiple threads within a single process. They share the same memory space. In Python, this is great for I/O-bound tasks but limited for CPU-bound tasks due to the GIL.\n- **Multiprocessing**: Runs multiple processes, each with its own Python interpreter and memory space. This allows for true parallelism on multi-core CPUs, bypassing the GIL. It is ideal for CPU-bound tasks.',
            example: 'Use **multithreading** to download 100 images from the web simultaneously. Use **multiprocessing** to process 100 large images with a heavy filter, distributing the work across all CPU cores.'
        },
        {
            id: 'py-gen-15',
            question: 'What is a virtual environment and why use it?',
            concepts: '**Dependency Management**: The process of managing the external libraries and packages that a project relies on.\n**Isolation**: Keeping the environments for different projects separate to avoid conflicts.',
            answer: 'A virtual environment is an **isolated Python environment** that allows you to manage dependencies for a specific project separately from other projects and the global Python installation.\n\n**Why use it?**\n- **Avoids Dependency Conflicts**: Project A might need version 1.0 of a library, while Project B needs version 2.0. Virtual environments prevent them from clashing.\n- **Reproducibility**: You can create a `requirements.txt` file from a virtual environment, making it easy for others to replicate your project setup exactly.',
            example: 'You can create a virtual environment using `python -m venv myenv`. After activating it, any packages installed with `pip` will be placed in the `myenv` folder, not in the global site-packages directory.'
        },
        {
            id: 'py-gen-16',
            question: 'How do you handle files in Python?',
            concepts: '**File I/O**: The process of reading from and writing to files on a storage device.\n**Context Manager (`with` statement)**: An object that defines the methods to be executed when entering and exiting a specific context.',
            answer: 'The recommended way to work with files is using the `with` statement, which acts as a context manager.\nThis ensures that the file is **automatically closed** even if an error occurs within the block.\n- **`"r"`**: Read mode (default).\n- **`"w"`**: Write mode (overwrites existing file).\n- **`"a"`**: Append mode (adds to the end of the file).\n- **`"b"`**: Binary mode (e.g., `"rb"` for reading images).',
            example: '---CODE_START---python\n# Writing to a file\nwith open("my_file.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("This is a new line.")\n\n# Reading from a file\nwith open("my_file.txt", "r") as f:\n    content = f.read()\n    print(content)\n---CODE_END---'
        },
        {
            id: 'py-gen-17',
            question: 'What is the difference between range and xrange (Python 2 vs 3)?',
            concepts: '**Memory Efficiency**: How a data structure or function uses computer memory.\n**Legacy Code**: Concepts relevant to older versions of a language.',
            answer: 'This is a key difference between Python 2 and Python 3.\n- In **Python 2**, `range()` created an actual list in memory, which was inefficient for very large numbers. `xrange()` was a generator-like object that produced numbers on demand.\n- In **Python 3**, the old `range()` was removed, and `xrange()` was renamed to `range()`. So, `range()` in Python 3 is memory-efficient and behaves like `xrange()` from Python 2.',
            example: 'In Python 2, `range(10000000)` would crash your program due to memory usage, while `xrange(10000000)` would work fine. In Python 3, `range(10000000)` is the standard, efficient way to do it.'
        },
        {
            id: 'py-gen-18',
            question: 'What is a dictionary and when is it used?',
            concepts: '**Key-Value Pair**: A set of two linked data items: a key, which is a unique identifier for some item of data, and the value, which is either the data that is identified or a pointer to the location of that data.\n**Hash Table**: The underlying data structure for dictionaries, allowing for fast lookups.',
            answer: 'A dictionary is a mutable, unordered collection of **key-value pairs**. Each key must be unique and immutable (e.g., a string, number, or tuple).\nThey are optimized for **fast retrieval** of a value when you know the key, as they are implemented using hash tables. Average time complexity for lookup, insertion, and deletion is O(1).\n\nUse a dictionary whenever you want to map unique keys to values, such as storing user properties by user ID.',
            example: '---CODE_START---python\n# A dictionary to store a user\'s information\nuser = {\n    "username": "alice",\n    "email": "alice@example.com",\n    "signup_year": 2022\n}\n\n# Fast lookup by key\nprint(user["email"]) # Output: alice@example.com\n---CODE_END---'
        },
        {
            id: 'py-gen-19',
            question: 'How do you improve the performance of Python code?',
            concepts: '**Profiling**: The process of measuring the space or time complexity of a program.\n**Vectorization**: Performing operations on entire arrays at once instead of using loops.\n**JIT Compilation**: Just-In-Time compilation, which can speed up code by compiling it to native machine code at runtime.',
            answer: 'Improving performance is a systematic process:\n1.  **Profile First**: Use a profiler like `cProfile` to identify the bottlenecks. Don\'t optimize blindly.\n2.  **Use Better Algorithms/Data Structures**: A better algorithm (e.g., using a dictionary for lookups instead of a list) is the most effective optimization.\n3.  **Use Built-in Functions**: Built-in functions and libraries (like `itertools`) are implemented in C and are very fast.\n4.  **Vectorize with NumPy/pandas**: For numerical operations, avoid Python loops and use vectorized operations in NumPy/pandas.\n5.  **Use JIT Compilers**: For heavy computational code, use libraries like `Numba` which can compile Python to fast machine code.',
            example: 'Instead of looping through a list to calculate a sum, use the built-in `sum()` function. For element-wise multiplication of two large lists, convert them to NumPy arrays and use the `*` operator.'
        },
        {
            id: 'py-gen-20',
            question: 'Explain OOP concepts in Python with examples.',
            concepts: '**Object-Oriented Programming (OOP)**: A programming paradigm based on the concept of "objects", which can contain data and code.\n**Class**: A blueprint for creating objects.\n**Object**: An instance of a class.',
            answer: 'Python is an object-oriented language. The core concepts are:\n- **Encapsulation**: Bundling data (attributes) and methods that operate on the data into a single unit (a class). This hides internal complexity.\n- **Inheritance**: A way to form new classes using classes that have already been defined. The new class (child) inherits attributes and methods from the existing class (parent).\n- **Polymorphism**: The ability of an object to take on many forms. For example, different objects can have a method with the same name (e.g., `.speak()`) that behaves differently for each object.',
            example: '---CODE_START---python\n# Inheritance & Encapsulation\nclass Animal:\n    def __init__(self, name):\n        self.name = name # attribute\n\n    def speak(self): # method\n        raise NotImplementedError("Subclass must implement abstract method")\n\nclass Dog(Animal):\n    def speak(self): # Polymorphism: same method name, different behavior\n        return "Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow!"\n\nmy_dog = Dog("Rex")\nprint(f"{my_dog.name} says {my_dog.speak()}") # Output: Rex says Woof!\n---CODE_END---'
        },
        {
            id: 'pychal-10',
            question: 'Flatten a nested list in Python.',
            concepts: '**Core Concepts**: Recursion, Generators, Iterators.\n**Explanation**: Flattening is the process of converting a list of lists (or a list with multiple levels of nesting) into a single, one-dimensional list. A recursive generator is a highly efficient and elegant way to solve this for lists with unknown or varying depths of nesting. It processes items one by one without creating intermediate lists in memory.',
            answer: '---CODE_START---python\n# Using a generator with recursion for arbitrary nesting depth\ndef flatten(nested_list):\n    for item in nested_list:\n        # If the item is a list, recurse into it\n        if isinstance(item, list):\n            yield from flatten(item)\n        # Otherwise, yield the item itself\n        else:\n            yield item\n\nnested = [1, [2, 3], [4, [5, [6]]], 7]\nflat_list = list(flatten(nested))\nprint("Flattened List:", flat_list)\n# Output: [1, 2, 3, 4, 5, 6, 7]\n---CODE_END---',
            example: '**Code Explanation**:\nThe `flatten` function iterates through the input list. If an `item` is not a list, it `yield`s it, making it part of the output sequence. If the `item` is a list, the `yield from` expression is used. This special syntax tells the generator to delegate to the sub-generator created by the recursive call `flatten(item)`. This effectively "unpacks" the nested list into the main sequence. Finally, `list()` consumes the entire generator iterator to create the final flat list.'
        },
        {
            id: 'pychal-11',
            question: 'Given a log file, extract patterns using regex.',
            concepts: '**Core Concepts**: Regular Expressions (Regex), Text Parsing, Pattern Matching.\n**Explanation**: Regular expressions are a powerful mini-language for finding and extracting patterns from text. They are essential for working with unstructured or semi-structured data like logs, where you need to pull out specific pieces of information like timestamps, IP addresses, or usernames.',
            answer: '---CODE_START---python\nimport re\n\nlog_data = """\nINFO:2023-10-27:User \'alice\' logged in from 192.168.1.10\nERROR:2023-10-27:Failed login for user \'bob\' from 203.0.113.45\n"""\n\n# Define a regex pattern with named capture groups\npattern = re.compile(\n    r"^(?P<level>\\w+):"         # Log level (e.g., INFO)\n    r"(?P<date>[^:]+):"           # Date\n    r".*?user \\\'(?P<user>\\w+)\\\'" # Username\n    r".*?(?P<ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})?" # Optional IP\n)\n\nparsed_logs = []\nfor line in log_data.strip().split(\'\\n\'):\n    match = pattern.search(line)\n    if match:\n        parsed_logs.append(match.groupdict())\n\nprint(parsed_logs)\n# Output: [\n#   {\'level\': \'INFO\', \'date\': \'2023-10-27\', \'user\': \'alice\', \'ip\': \'192.168.1.10\'},\n#   {\'level\': \'ERROR\', \'date\': \'2023-10-27\', \'user\': \'bob\', \'ip\': \'203.0.113.45\'}\n# ]\n---CODE_END---',
            example: '**Code Explanation**:\nThis solution uses `re.compile` for efficiency if the pattern is used many times. The pattern itself uses named capture groups like `(?P<level>\\w+)` which makes extracting the data much easier and more readable. `\\w+` matches one or more word characters. The code iterates through each log line, searches for the pattern, and if a match is found, `match.groupdict()` returns a dictionary where keys are the capture group names (`level`, `date`, etc.) and values are the matched strings.'
        },
        {
            id: 'pychal-14',
            question: 'Given two lists, find their intersection without using set().',
            concepts: '**Core Concepts**: Algorithmic Thinking, Time Complexity.\n**Explanation**: The naive approach is a nested loop (O(n*m) complexity), which is very slow for large lists. A more efficient O(n+m) approach involves using a hash map (a dictionary in Python) to achieve near-instantaneous lookups. This demonstrates the importance of choosing the right data structure for the problem.',
            answer: '---CODE_START---python\ndef find_intersection(list1, list2):\n    # Use the smaller list to create the lookup table for efficiency\n    if len(list1) > len(list2):\n        list1, list2 = list2, list1\n\n    # 1. Create a hash map (dictionary) from the smaller list for O(1) lookups\n    lookup = {item: True for item in list1}\n    \n    # 2. Iterate through the larger list and check for existence in the lookup\n    intersection = []\n    for item in list2:\n        if item in lookup:\n            intersection.append(item)\n            # Optional: remove from lookup to handle duplicates correctly\n            del lookup[item]\n            \n    return intersection\n\nlist_a = [1, 2, 3, 4, 5, 5]\nlist_b = [4, 5, 6, 7, 5]\n\nprint(find_intersection(list_a, list_b))\n# Output: [4, 5, 5]\n---CODE_END---',
            example: '**Code Explanation**:\n1. We first create a `lookup` dictionary from the smaller list. This is a crucial optimization. Storing items as keys gives us average O(1) time complexity for checking if an item exists.\n2. We then iterate through the second (larger) list. For each `item`, we check `if item in lookup`. Because `lookup` is a dictionary, this check is very fast.\n3. If it exists, we add it to our `intersection` list and remove it from the `lookup` to ensure that if duplicates are present in both lists, they are handled correctly.'
        },
        {
            id: 'pychal-17',
            question: 'Find the most frequent word in a text file.',
            concepts: '**Core Concepts**: Text Processing, Tokenization, Frequency Analysis.\n**Explanation**: This is a classic NLP (Natural Language Processing) warm-up task. It involves several key steps: reading the text, cleaning it (removing punctuation and converting to a consistent case), breaking it into individual words (tokenization), and finally, counting the frequency of each word to find the most common one.',
            answer: '---CODE_START---python\nimport re\nfrom collections import Counter\n\n# Create a dummy text file\nwith open("sample.txt", "w") as f:\n    f.write("This is a sample sentence. This sentence is for testing.")\n\ndef most_frequent_word(filepath):\n    try:\n        with open(filepath, \'r\') as f:\n            text = f.read()\n    except FileNotFoundError:\n        return "File not found."\n\n    # 1. Clean the text: lowercase and remove punctuation\n    text = text.lower()\n    words = re.findall(r\'\\b\\w+\\b\', text)\n    \n    # 2. Count word frequencies\n    if not words:\n        return "No words found."\n    \n    word_counts = Counter(words)\n    \n    # 3. Find the most frequent word\n    return word_counts.most_common(1)[0]\n\nmost_common = most_frequent_word(\'sample.txt\')\nprint(f"The most frequent word is: \'{most_common[0]}\' with {most_common[1]} occurrences.")\n# Output: The most frequent word is: \'this\' with 2 occurrences.\n---CODE_END---',
            example: '**Code Explanation**:\n1. The function first reads the entire file content into a string.\n2. It converts the text to lowercase to ensure "This" and "this" are treated as the same word. The regex `re.findall(r\'\\b\\w+\\b\', text)` is a robust way to extract all words, ignoring punctuation.\n3. `collections.Counter(words)` creates a dictionary-like object mapping each word to its frequency.\n4. `word_counts.most_common(1)` returns a list containing a single tuple `(\'word\', count)` for the most frequent word.'
        },
        {
            id: 'pychal-21',
            question: 'Generate an Infinite Fibonacci Series Using a Generator.',
            concepts: '**Core Concepts**: Generators, `yield` keyword, Infinite loops, Statefulness.\n**Explanation**: The Fibonacci sequence is a series where each number is the sum of the two preceding ones. A generator is perfect for this because it can compute and `yield` one number at a time, maintaining its state (the last two numbers) between calls. This allows it to produce a potentially infinite sequence without storing all the numbers in memory.',
            answer: '---CODE_START---python\ndef fibonacci_generator():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# --- Usage ---\nfib = fibonacci_generator()\nprint("First 10 Fibonacci numbers:")\nfor _ in range(10):\n    print(next(fib))\n---CODE_END---',
            example: '**Code Explanation**:\nThe function initializes two variables, `a` and `b`, to the first two numbers in the sequence. The `while True:` loop makes the generator potentially infinite. Inside the loop, `yield a` pauses the function and returns the current value of `a`. The next time `next()` is called on the generator, it resumes at the next line, `a, b = b, a + b`, which updates the state to the next two numbers in the sequence, and the loop continues.'
        },
        {
            id: 'pychal-22',
            question: 'Sort a List Without Using the `sort()` method or `sorted()` function.',
            concepts: '**Core Concepts**: Sorting Algorithms, Algorithmic Complexity, In-place modification.\n**Explanation**: This is a classic computer science question to test your understanding of fundamental sorting algorithms. Bubble Sort is one of the simplest to implement. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.',
            answer: '---CODE_START---python\ndef bubble_sort(data_list):\n    n = len(data_list)\n    # Traverse through all array elements\n    for i in range(n):\n        # A flag to optimize. If no swaps in an inner loop, list is sorted.\n        swapped = False\n        # Last i elements are already in place\n        for j in range(0, n - i - 1):\n            # Swap if the element found is greater than the next element\n            if data_list[j] > data_list[j + 1]:\n                data_list[j], data_list[j + 1] = data_list[j + 1], data_list[j]\n                swapped = True\n        if not swapped:\n            break\n    return data_list\n\nmy_list = [64, 34, 25, 12, 22, 11, 90]\nprint("Sorted list:", bubble_sort(my_list))\n---CODE_END---',
            example: '**Code Explanation**:\nThe outer loop reduces the number of elements to be checked in the inner loop with each pass, as the largest elements "bubble up" to the end of the list and are already in their correct sorted position. The inner loop performs the actual comparisons and swaps. The `swapped` flag is an optimization that allows the function to exit early if a pass is completed with no swaps, meaning the list is already sorted.'
        },
        {
            id: 'pychal-23',
            question: 'Check Whether a String is a Palindrome or Not.',
            concepts: '**Core Concepts**: String Slicing, String Manipulation, Conditionals.\n**Explanation**: A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward. The most Pythonic way to check this is to compare a string to its reverse. For a robust solution, you should first clean the string by removing spaces and punctuation and converting it to a consistent case.',
            answer: '---CODE_START---python\nimport re\n\ndef is_palindrome(s):\n    # 1. Clean the string: remove non-alphanumeric characters and convert to lowercase\n    cleaned_s = re.sub(r\'[^A-Za-z0-9]+\', \'\', s).lower()\n    \n    # 2. Compare the cleaned string with its reverse\n    return cleaned_s == cleaned_s[::-1]\n\n# Test cases\nprint(f"\'Racecar\': {is_palindrome(\'Racecar\')}")\nprint(f"\'A man, a plan, a canal: Panama\': {is_palindrome(\'A man, a plan, a canal: Panama\')}")\nprint(f"\'hello\': {is_palindrome(\'hello\')}")\n---CODE_END---',
            example: '**Code Explanation**:\nThe regex `re.sub(r\'[^A-Za-z0-9]+\', \'\', s)` finds all characters that are NOT letters or numbers and replaces them with an empty string. The `.lower()` method ensures the comparison is case-insensitive. The core logic is `cleaned_s == cleaned_s[::-1]`. The slice `[::-1]` is a concise Python idiom for reversing a sequence. The function returns the boolean result of this comparison.'
        },
        {
            id: 'pychal-24',
            question: 'Write a Python Program to Find the Factorial of a Number.',
            concepts: '**Core Concepts**: Recursion, Iteration, Base Case.\n**Explanation**: The factorial of a non-negative integer `n`, denoted by `n!`, is the product of all positive integers less than or equal to `n`. For example, `5! = 5 * 4 * 3 * 2 * 1 = 120`. This can be solved iteratively with a loop or recursively, where the function calls itself with a smaller number until it reaches a base case.',
            answer: '---CODE_START---python\n# Iterative approach (more efficient)\ndef factorial_iterative(n):\n    if n < 0:\n        return "Factorial does not exist for negative numbers"\n    elif n == 0:\n        return 1\n    else:\n        result = 1\n        for i in range(1, n + 1):\n            result *= i\n        return result\n\n# Recursive approach\ndef factorial_recursive(n):\n    if n < 0:\n        return "Factorial does not exist for negative numbers"\n    # Base case\n    elif n == 0 or n == 1:\n        return 1\n    # Recursive step\n    else:\n        return n * factorial_recursive(n - 1)\n\nprint("Iterative (5!):", factorial_iterative(5))\nprint("Recursive (5!):", factorial_recursive(5))\n---CODE_END---',
            example: '**Code Explanation**:\n- **Iterative**: It initializes a `result` to 1 and uses a `for` loop to multiply it by each integer from 1 up to `n`.\n- **Recursive**: It defines a base case: if `n` is 0 or 1, it returns 1. Otherwise, it performs the recursive step: it returns `n` multiplied by the result of calling itself with `n-1`. This chain of calls continues until the base case is reached.'
        },
        {
            id: 'pychal-25',
            question: 'Find the Smallest and Largest Number in a List without using `min()` or `max()`.',
            concepts: '**Core Concepts**: Iteration, Comparison, Edge Cases.\n**Explanation**: This fundamental problem tests your ability to handle a list iteratively. The logic involves assuming the first element is both the smallest and largest, then looping through the remaining elements to update these values if a smaller or larger number is found.',
            answer: '---CODE_START---python\ndef find_min_max(data_list):\n    # Handle edge case of an empty list\n    if not data_list:\n        return None, None\n    \n    # Initialize smallest and largest with the first element\n    smallest = data_list[0]\n    largest = data_list[0]\n    \n    # Iterate through the rest of the list\n    for num in data_list[1:]:\n        if num < smallest:\n            smallest = num\n        elif num > largest:\n            largest = num\n            \n    return smallest, largest\n\nmy_list = [64, 34, 25, 12, 22, 11, 90]\ns, l = find_min_max(my_list)\nprint(f"Smallest: {s}, Largest: {l}")\n---CODE_END---',
            example: '**Code Explanation**:\nThe function first checks for an empty list to avoid errors. It then initializes `smallest` and `largest` to the first item. The `for` loop iterates from the *second* item (`data_list[1:]`). In each iteration, it checks if the current `num` is smaller than the current `smallest` or larger than the current `largest` and updates the respective variable if the condition is true.'
        },
        {
            id: 'pychal-30',
            question: 'Write a function to take a user-input list and return the sum of elements.',
            concepts: '**Iteration**, **Accumulation**. A basic logic test often asked to beginners.',
            answer: 'You can iterate through the list and add each element to a running total variable.\n\n---CODE_START---python\ndef sum_list(items):\n    total = 0\n    for item in items:\n        total += item\n    return total\n\n# Example\nprint(sum_list([1, 2, 3, 4, 5])) # Output: 15\n---CODE_END---',
            example: 'While Python has a built-in `sum()` function, writing this loop manually demonstrates your understanding of basic control flow.'
        },
        {
            id: 'pychal-31',
            question: 'Write a program to check and count vowels in a string.',
            concepts: '**String Traversal**, **Conditionals**, **Sets**. Good for testing basic string manipulation skills.',
            answer: 'You can loop through each character in the string and check if it exists in a set of defined vowels.\n\n---CODE_START---python\ndef count_vowels(text):\n    vowels = "aeiouAEIOU"\n    count = 0\n    for char in text:\n        if char in vowels:\n            count += 1\n    return count\n\nprint(count_vowels("Hello World")) # Output: 3\n---CODE_END---',
            example: 'Using a string `"aeiouAEIOU"` or a set `{\'a\', \'e\', ...}` makes the check `if char in vowels` very efficient and readable.'
        }
    ],
};

export default pythonCoreCategory;