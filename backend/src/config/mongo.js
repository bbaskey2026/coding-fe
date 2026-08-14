import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';
import { BlogPost } from '../models/BlogPost.js';
import { Tutorial } from '../models/Tutorial.js';
import dns from 'dns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codex86_blog';

const seedSampleBlogs = async () => {
  try {
    const count = await BlogPost.countDocuments();
    if (count === 0) {
      logger.info('MongoDB blog collection is empty. Seeding initial sample posts...');
      const samplePosts = [
        {
          title: "Introduction to System Design",
          summary: "An introductory guide to scaling applications, understanding load balancers, and choosing between SQL and NoSQL databases.",
          content: "System design is one of the most crucial topics in software engineering. When building applications that serve millions of users, you must design for scalability, availability, and reliability.\n\n### 1. Load Balancers\nA load balancer acts as a reverse proxy, distributing network or application traffic across a number of servers. By doing so, it ensures that no single server bears too much demand, which improves responsiveness and increases availability of applications.\n\n### 2. SQL vs NoSQL\nChoosing the right database depends on your access patterns. Relational databases (SQL) are excellent for structured data with complex query needs and strong transactional (ACID) guarantees. NoSQL databases, on the other hand, are great for unstructured or semi-structured data and offer horizontal scalability with ease.\n\nStay tuned for the next article where we deep dive into caching strategies!",
          coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
          authorId: 1,
          authorName: "admin_dev",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=admin",
          status: "published",
          tags: ["System Design", "Database", "Career"],
          claps: 54,
          clappedBy: [2, 3]
        },
        {
          title: "Mastering Dynamic Programming",
          summary: "Demystifying memoization, tabulating states, and standard pattern matching for DP interview problems.",
          content: "Dynamic Programming (DP) is often feared by developers preparing for coding interviews. However, once you break it down into repeatable patterns, it becomes one of the most elegant techniques in your toolbox.\n\n### Memoization vs Tabulation\n- **Memoization (Top-Down):** Start solving the problem from the top, break it down recursively, and cache subproblem results to avoid duplicate computation.\n- **Tabulation (Bottom-Up):** Solve all smaller subproblems first, storing results in a table (usually a 1D or 2D array), and build up to the main problem.\n\n### The 3-Step Framework\n1. Define the state (what represents a subproblem?).\n2. Establish the base cases.\n3. Formulate the state transition relation.\n\nPractice consistently, and you will master it!",
          coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1000&auto=format&fit=crop&q=80",
          authorId: 1,
          authorName: "admin_dev",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=admin",
          status: "published",
          tags: ["Algorithms", "Interviews"],
          claps: 38,
          clappedBy: [2]
        },
        {
          title: "Why We Chose React 19 for Our Enterprise Shell",
          summary: "Analyzing React 19's Server Actions, document metadata support, and automatic hook optimizations.",
          content: "With React 19 officially released, we decided to migrate our entire enterprise shell dashboard over. Here is a breakdown of why this decision was made and how it improved our productivity.\n\n### 1. Server Actions\nReact 19 integrates Server Actions natively. This allows client components to trigger server-side data mutations directly inside forms, without writing manual API fetch calls and handlers. It handles loading states and pending transitions out of the box.\n\n### 2. Document Metadata Support\nPreviously, managing titles, stylesheets, and meta descriptions required libraries like React Helmet. Now, React 19 natively supports placement of `<title>`, `<meta>`, and `<link>` tags anywhere in your component tree, automatically hoisting them to the document head.\n\nIt is time to upgrade your tech stack!",
          coverImage: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=1000&auto=format&fit=crop&q=80",
          authorId: 2,
          authorName: "web_wizard",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=wizard",
          status: "published",
          tags: ["Web Dev", "React"],
          claps: 27,
          clappedBy: [1]
        },
        {
          title: "Rich Media & Embedding Guide",
          summary: "A comprehensive showcase demonstrating syntax-highlighted code blocks, responsive video players, audio tracks, document frames, and styled elements in action.",
          content: "Writing on CodeX86 is highly flexible. This showcase guides you through rendering all standard formats of text, media, documents, and embeds in a single post.\n\n### 1. Code Syntax Formatting\nHere is a python snippet demonstrating standard quicksort implementation:\n\n```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\nprint(quick_sort([3, 6, 8, 10, 1, 2, 1]))\n```\n\n### 2. Media Image Support\nYou can embed images with detailed captions using markdown or standard tags:\n\n![Workspace Illustration](https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800)\n\n### 3. YouTube Video embeds\nNeed to walk users through a coding solution? Embed a YouTube video frame directly:\n\n<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" frameborder=\"0\" allowfullscreen></iframe>\n\n### 4. Interactive Document Frame\nIf you want to share a PDF document, spreadsheet, slides, or reference material:\n\n<iframe src=\"https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true\" frameborder=\"0\"></iframe>\n\n### 5. Audio tracks\nYou can embed audio clips (such as standard podcasts, system alerts, or tutorial voice recordings):\n\n<audio src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\" controls></audio>\n\nFeel free to write your own post and test these embeds!",
          coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80",
          authorId: 1,
          authorName: "admin_dev",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=admin",
          status: "published",
          tags: ["Web Dev", "Interviews", "Career"],
          claps: 41,
          clappedBy: [2]
        },
        {
          title: "Demystifying Time and Space Complexity (Big-O Notation)",
          summary: "An in-depth explanation of Big-O notation, logarithmic growth scales, and best practices to optimize algorithms.",
          content: "When writing algorithms, code efficiency is just as critical as correctness. Time complexity measures how run time scales with input size, while space complexity measures auxiliary memory growth.\n\n### The Growth Spectrum\nWe analyze algorithms using notations like O(1) for constant time, O(log N) for binary division scales, O(N) for linear traversals, and O(N log N) for optimized sorting algorithms. Exponential growth like O(2^N) or O(N!) should generally be avoided for production workloads.\n\n### Why Constant Factors Are Ignored\nIn Big-O analysis, we focus on the rate of growth rather than exact CPU cycles. Hence, O(2N) simplifies to O(N), because as N approaches infinity, the constant factor 2 becomes insignificant compared to the growth of N itself.\n\nOptimizing time complexity usually involves utilizing smart storage like HashMaps (trading space for time) or dividing search spaces recursively.",
          coverImage: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=1000&auto=format&fit=crop&q=80",
          authorId: 1,
          authorName: "admin_dev",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=admin",
          status: "published",
          tags: ["Algorithms", "Interviews", "Career"],
          claps: 15,
          clappedBy: [2]
        },
        {
          title: "A Developer Guide to Clean Architecture",
          summary: "A practical overview of separating concerns, writing modular decoupled layers, and maintaining clean codebases.",
          content: "Building scalable software requires a firm structural boundary. Clean Architecture ensures that business logic remains independent of database engines, user interfaces, or third-party libraries.\n\n### The Core Layers\n1. **Entities:** The core business rules and data schemas that change the least.\n2. **Use Cases:** Application-specific workflows that orchestrate data movement.\n3. **Controllers/Presenters:** Translators converting database models into viewable parameters.\n4. **Frameworks/Drivers:** Outermost details like Express, Mongoose, or PostgreSQL pools.\n\n### The Dependency Rule\nSource code dependencies must point inwards. Code in outer layers cannot know anything about code in inner layers. This allows you to swap your SQL database for a MongoDB instance without changing a single line of core business rules!\n\nWrite tests for the inner business rules to safeguard code quality during system upgrades.",
          coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
          authorId: 2,
          authorName: "web_wizard",
          authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=wizard",
          status: "published",
          tags: ["System Design", "Web Dev"],
          claps: 22,
          clappedBy: [1]
        }
      ];

      const inserted = await BlogPost.insertMany(samplePosts);
      logger.info(`Successfully seeded ${inserted.length} sample blog posts into MongoDB.`);
    }
  } catch (err) {
    logger.error('Error seeding sample blog posts:', err);
  }
};

const seedSampleTutorials = async () => {
  try {
    const count = await Tutorial.countDocuments();
    if (count === 0) {
      logger.info('MongoDB tutorials collection is empty. Seeding initial sample tutorials...');
      const sampleTutorials = [
        {
          language: 'JavaScript',
          title: 'Mastering Promises & Async/Await',
          category: 'Asynchronous Control',
          difficulty: 'Easy',
          summary: 'Learn how to handle async execution flow in JS using native Promises and async/await syntax wrappers.',
          content: 'Asynchronous programming is central to JavaScript. Previously, developers relied on nesting callbacks (callback hell). Promises and `async/await` allow you to write async operations that read like synchronous code, making your code clean, readable, and highly maintainable.',
          codeExample: `// Declaring an async function to fetch resource data
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};`,
          explanation: '1. The async keyword declares an asynchronous function which always returns a Promise.\n2. The await keyword pauses execution until the fetch Promise resolves, resolving to its return value.\n3. Errors are caught using standard try/catch blocks, bypassing callback-hell nested catches.'
        },
        {
          language: 'Python',
          title: 'List Comprehensions & Generator Expressions',
          category: 'Syntax & Performance',
          difficulty: 'Easy',
          summary: 'An elegant way to construct lists and stream data in Python using clean comprehension statements.',
          content: 'Python list comprehensions provide a concise syntax to create lists from iterable sequences. Generator expressions look very similar but yield elements lazily, keeping memory usage to a minimum when dealing with large datasets.',
          codeExample: `# List comprehension (allocates the entire list in-memory immediately)
squares_list = [x**2 for x in range(10000) if x % 2 == 0]

# Generator expression (lazy evaluation - yields items on-the-fly)
squares_generator = (x**2 for x in range(10000) if x % 2 == 0)

# Iterating over the generator yields items one-by-one
for val in squares_generator:
    print(val)
    break  # Stops iteration, saving memory and processing power`,
          explanation: '1. The brackets [] allocate the entire list in memory immediately, which is great for small arrays but heavy for large scales.\n2. The parentheses () return a generator object that evaluates items dynamically as requested.\n3. Generators are ideal for performance optimization and streaming massive files.'
        },
        {
          language: 'Go',
          title: 'Goroutines and Channels (Concurrency)',
          category: 'Concurrency',
          difficulty: 'Medium',
          summary: 'Using Go\'s lightweight thread processes (Goroutines) and channels to coordinate concurrent operations.',
          content: 'Go manages concurrent processes using Goroutines, which are extremely lightweight compared to OS threads. Goroutines run in the same address space, so access to shared memory must be synchronized. Channels allow goroutines to communicate safely without explicit locks.',
          codeExample: `package main
import (
	"fmt"
	"time"
)

func worker(id int, ch chan string) {
	time.Sleep(time.Second) // Simulate task execution
	ch <- fmt.Sprintf("Worker %d completed its task", id)
}

func main() {
	ch := make(chan string)
	
	// Spawn 3 concurrent worker processes
	for i := 1; i <= 3; i++ {
		go worker(i, ch)
	}
	
	// Wait and receive results from workers
	for i := 1; i <= 3; i++ {
		msg := <-ch
		fmt.Println(msg)
	}
}`,
          explanation: '1. go worker(...) spawns a concurrent goroutine process in the background.\n2. ch <- val sends a string value into the channel, blocking until it is read.\n3. msg := <-ch blocks main thread execution until a worker writes to the channel, coordinating output.'
        },
        {
          language: 'C++',
          title: 'Smart Pointers & Memory Management (C++11)',
          category: 'Memory Management',
          difficulty: 'Hard',
          summary: 'Preventing memory leaks using std::unique_ptr and std::shared_ptr to manage dynamic memory lifecycle.',
          content: 'Dynamic memory allocation in C++ requires manual management using `new` and `delete`. To prevent memory leaks, C++11 introduced Smart Pointers which automatically clean up dynamic memory when they go out of scope, implementing resource acquisition is initialization (RAII).',
          codeExample: `#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource acquired\\n"; }
    ~Resource() { std::cout << "Resource destroyed\\n"; }
    void execute() { std::cout << "Executing logic\\n"; }
};

int main() {
    {
        // Unique ownership smart pointer - scope bound
        std::unique_ptr<Resource> res = std::make_unique<Resource>();
        res->execute();
    } // Memory is automatically released here when res goes out of scope!
    
    return 0;
}`,
          explanation: '1. std::unique_ptr guarantees that only one pointer owns the Resource at any time.\n2. std::make_unique safely instantiates the resource on the heap and wraps it.\n3. The destructor ~Resource() is triggered automatically when the pointer goes out of scope, resolving leak risks.'
        }
      ];

      const inserted = await Tutorial.insertMany(sampleTutorials);
      logger.info(`Successfully seeded ${inserted.length} sample tutorials into MongoDB.`);
    }
  } catch (err) {
    logger.error('Error seeding sample tutorials:', err);
  }
};

export const connectMongo = async () => {
  try {
    // Override local DNS servers to resolve MongoDB Atlas SRV lookup issues
    try {
      dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
      logger.info('Process DNS servers set to Google/Cloudflare DNS to resolve Atlas SRV records.');
    } catch (dnsErr) {
      logger.warn('Could not set custom DNS servers, using system defaults: ' + dnsErr.message);
    }
    mongoose.connection.on('connected', () => {
      logger.info('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection disconnected');
    });

    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    
    // Seed sample blogs if collection is empty
    await seedSampleBlogs();
    
    // Seed sample tutorials if collection is empty
    await seedSampleTutorials();
    
    return true;
  } catch (err) {
    logger.error('Failed to establish initial connection to MongoDB', err);
    return false;
  }
};

export default mongoose;
