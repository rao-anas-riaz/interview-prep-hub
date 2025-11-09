import { QuestionCategory } from '../types';

const pythonGeneralCategory: QuestionCategory = {
    id: 'python_general',
    title: 'General Python',
    icon: 'fa-brands fa-python',
    description: 'Fundamental Python concepts and coding questions frequently asked in technical interviews.',
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
        }
    ],
};

export default pythonGeneralCategory;
