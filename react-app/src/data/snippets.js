export const snippetCategories = {
  javascript: "JavaScript",
  react: "React",
  "spring-boot": "Spring Boot",
  java: "Java",
  svelte: "Svelte",
  python: "Python", 
  all: "All"
};

export const snippets = [
  {
    id: 1,
    title: "React Component Template",
    language: "jsx",
    category: "react",
    code: `function Component() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
    </div>
  )
}`,
    tags: ["react", "component"]
  },
  {
    id: 2,
    title: "Async Data Loader with Promise.all",
    language: "javascript",
    category: "javascript",
    code: `async function loadAllGuides() {
  try {
    const response = await fetch('data/guides.json');
    const fileList = await response.json();

    const promises = fileList.map(filename =>
      fetch(\`data/\${filename}\`).then(res => res.json())
    );

    const guidesData = await Promise.all(promises);
    return guidesData;
  } catch (error) {
    console.error('Error loading guides:', error);
  }
}`,
    tags: ["javascript", "async", "fetch", "promise"]
  },
  {
    id: 3,
    title: "Copy to Clipboard with Feedback",
    language: "javascript",
    category: "javascript",
    code: `function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  }, () => {
    button.textContent = 'Failed!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  });
}`,
    tags: ["javascript", "clipboard", "ui", "feedback"]
  },
  {
    id: 4,
    title: "Dynamic Search Filter",
    language: "javascript",
    category: "javascript",
    code: `// Search filter with event listener
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredGuides = guides.filter(guide => {
    return guide.title.toLowerCase().includes(searchTerm) ||
           guide.description.toLowerCase().includes(searchTerm);
  });
  renderGuides(filteredGuides);
});`,
    tags: ["javascript", "search", "filter", "event"]
  },
  {
    id: 5,
    title: "Dynamic DOM Element Creation",
    language: "javascript",
    category: "javascript",
    code: `function renderGuides(guidesToRender) {
  guidesContainer.innerHTML = '';
  guidesToRender.forEach(guide => {
    const guideElement = document.createElement('div');
    guideElement.classList.add('guide');
    guideElement.innerHTML = \`
      <h2>\${guide.title}</h2>
      <p>\${guide.description}</p>
    \`;
    guideElement.addEventListener('click', () => openModal(guide));
    guidesContainer.appendChild(guideElement);
  });
}`,
    tags: ["javascript", "dom", "template", "dynamic"]
  },
  {
    id: 6,
    title: "Modal Window with Event Handlers",
    language: "javascript",
    category: "javascript",
    code: `// Modal open/close functionality
function openModal(guide) {
  modalTitle.textContent = guide.title;
  modal.style.display = 'block';
}

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});`,
    tags: ["javascript", "modal", "ui", "events"]
  },
  {
    id: 7,
    title: "DOMContentLoaded Event Pattern",
    language: "javascript",
    category: "javascript",
    code: `document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM elements
  const guidesContainer = document.getElementById('guides-container');
  const searchInput = document.getElementById('search');
  const modal = document.getElementById('guide-modal');

  // Initialize app state
  let guides = [];

  // Load initial data
  loadAllGuides();

  // Setup event listeners
  setupEventListeners();
});`,
    tags: ["javascript", "dom", "initialization", "pattern"]
  },
  {
    id: 8,
    title: "Spring Boot REST Controller",
    language: "java",
    category: "spring-boot",
    code: `@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                         @Valid @RequestBody User user) {
        return userService.update(id, user)
            .map(updatedUser -> ResponseEntity.ok(updatedUser))
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.existsById(id)) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}`,
    tags: ["spring-boot", "rest", "controller", "crud", "java"]
  },
  {
    id: 9,
    title: "Spring Boot Service Layer",
    language: "java",
    category: "spring-boot",
    code: `@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        return userRepository.save(user);
    }

    public Optional<User> update(Long id, User user) {
        return userRepository.findById(id)
            .map(existingUser -> {
                existingUser.setName(user.getName());
                existingUser.setEmail(user.getEmail());
                return userRepository.save(existingUser);
            });
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}`,
    tags: ["spring-boot", "service", "transactional", "java"]
  },
  {
    id: 10,
    title: "Spring Boot JPA Repository",
    language: "java",
    category: "spring-boot",
    code: `@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Query methods
    Optional<User> findByEmail(String email);

    List<User> findByNameContainingIgnoreCase(String name);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findActiveUsers();

    @Query("SELECT u FROM User u WHERE u.createdAt >= :date")
    List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);

    // Native query example
    @Query(value = "SELECT * FROM users WHERE email LIKE %:domain%",
           nativeQuery = true)
    List<User> findByEmailDomain(@Param("domain") String domain);

    // Custom update query
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.id = :id")
    int deactivateUser(@Param("id") Long id);

    // Pagination and sorting
    Page<User> findByActiveTrue(Pageable pageable);
}`,
    tags: ["spring-boot", "jpa", "repository", "query", "java"]
  },
  {
    id: 11,
    title: "Spring Boot Entity with Validation",
    language: "java",
    category: "spring-boot",
    code: `@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    @Column(nullable = false)
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @Column(name = "active")
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}`,
    tags: ["spring-boot", "entity", "jpa", "validation", "java"]
  },
  {
    id: 12,
    title: "Global Exception Handler",
    language: "java",
    category: "spring-boot",
    code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(
            EntityNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Resource not found",
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(
            IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Invalid request",
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Validation failed",
            errors.toString(),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal server error",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

record ErrorResponse(
    int status,
    String error,
    String message,
    LocalDateTime timestamp
) {}`,
    tags: ["spring-boot", "exception", "handler", "validation", "java"]
  },
  {
    id: 13,
    title: "Spring Boot Configuration",
    language: "java",
    category: "spring-boot",
    code: `@Configuration
@EnableWebMvc
@EnableJpaRepositories(basePackages = "com.example.repository")
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter(objectMapper()));
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User("Admin", "admin@example.com"));
                userRepository.save(new User("User", "user@example.com"));
            }
        };
    }
}`,
    tags: ["spring-boot", "configuration", "cors", "beans", "java"]
  },
  {
    id: 14,
    title: "Spring Boot Application Properties",
    language: "yaml",
    category: "spring-boot",
    code: `# application.yml
spring:
  application:
    name: my-spring-app

  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

  jackson:
    serialization:
      write-dates-as-timestamps: false
    default-property-inclusion: non_null

server:
  port: 8080
  servlet:
    context-path: /api

logging:
  level:
    com.example: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always`,
    tags: ["spring-boot", "configuration", "yaml", "properties"]
  },
  {
    id: 15,
    title: "Svelte Component with State",
    language: "svelte",
    category: "svelte",
    code: `<script>
  import { onMount } from 'svelte';

  let count = 0;
  let name = 'World';
  let items = [];

  onMount(() => {
    console.log('Component mounted');
  });

  function increment() {
    count += 1;
  }

  function addItem() {
    items = [...items, \`Item \${items.length + 1}\`];
  }
</script>

<main>
  <h1>Hello {name}!</h1>

  <div class="counter">
    <button on:click={increment}>
      Count: {count}
    </button>
  </div>

  <div class="input-section">
    <input bind:value={name} placeholder="Enter name" />
  </div>

  <div class="items">
    <button on:click={addItem}>Add Item</button>
    {#each items as item, i}
      <p>{i + 1}: {item}</p>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .counter button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .input-section {
    margin: 1rem 0;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>`,
    tags: ["svelte", "component", "state", "reactivity"]
  },
  {
    id: 16,
    title: "Svelte Store Management",
    language: "javascript",
    category: "svelte",
    code: `// stores.js
import { writable, derived, readable } from 'svelte/store';

// Writable store
export const count = writable(0);

// User store with custom methods
function createUser() {
  const { subscribe, set, update } = writable({
    name: '',
    email: '',
    isLoggedIn: false
  });

  return {
    subscribe,
    login: (name, email) => update(u => ({
      ...u,
      name,
      email,
      isLoggedIn: true
    })),
    logout: () => update(u => ({
      ...u,
      name: '',
      email: '',
      isLoggedIn: false
    })),
    updateProfile: (data) => update(u => ({ ...u, ...data })),
    reset: () => set({ name: '', email: '', isLoggedIn: false })
  };
}

export const user = createUser();

// Derived store
export const userDisplayName = derived(
  user,
  $user => $user.isLoggedIn ? $user.name : 'Guest'
);

// Readable store (for external data)
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});`,
    tags: ["svelte", "store", "state-management", "reactive"]
  },
  {
    id: 17,
    title: "Python FastAPI REST Endpoint",
    language: "python",
    category: "python",
    code: `from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="User API", version="1.0.0")

# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None

    class Config:
        from_attributes = True

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to User API"}

@app.get("/users", response_model=List[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in user.dict().items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
    tags: ["python", "fastapi", "rest", "api", "crud"]
  },
  {
    id: 18,
    title: "Python Data Processing with Pandas",
    language: "python",
    category: "python",
    code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Sample data processing pipeline
def process_sales_data(file_path: str) -> pd.DataFrame:
    """
    Process sales data with cleaning, transformation, and analysis
    """
    # Read data
    df = pd.read_csv(file_path)

    # Data cleaning
    df = df.dropna(subset=['customer_id', 'product_id', 'sale_amount'])
    df['sale_date'] = pd.to_datetime(df['sale_date'])
    df['sale_amount'] = pd.to_numeric(df['sale_amount'], errors='coerce')

    # Feature engineering
    df['year'] = df['sale_date'].dt.year
    df['month'] = df['sale_date'].dt.month
    df['quarter'] = df['sale_date'].dt.quarter
    df['day_of_week'] = df['sale_date'].dt.day_name()

    # Calculate metrics
    df['profit_margin'] = (df['sale_amount'] - df['cost']) / df['sale_amount']

    return df

def analyze_sales_trends(df: pd.DataFrame) -> dict:
    """
    Analyze sales trends and generate insights
    """
    analysis = {}

    # Monthly sales summary
    monthly_sales = df.groupby(['year', 'month']).agg({
        'sale_amount': ['sum', 'mean', 'count'],
        'profit_margin': 'mean'
    }).round(2)

    # Top products
    top_products = df.groupby('product_name')['sale_amount'].sum().sort_values(ascending=False).head(10)

    # Customer analysis
    customer_metrics = df.groupby('customer_id').agg({
        'sale_amount': ['sum', 'count'],
        'sale_date': ['min', 'max']
    })

    # Seasonal trends
    seasonal_trends = df.groupby('quarter')['sale_amount'].mean()

    analysis['monthly_sales'] = monthly_sales
    analysis['top_products'] = top_products
    analysis['customer_metrics'] = customer_metrics
    analysis['seasonal_trends'] = seasonal_trends

    return analysis

# Usage example
if __name__ == "__main__":
    # Process data
    sales_df = process_sales_data('sales_data.csv')

    # Generate insights
    insights = analyze_sales_trends(sales_df)

    # Export results
    sales_df.to_csv('processed_sales.csv', index=False)
    print("Data processing completed!")`,
    tags: ["python", "pandas", "data-analysis", "etl"]
  },
  {
    id: 19,
    title: "Python Async/Await Pattern",
    language: "python",
    category: "python",
    code: `import asyncio
import aiohttp
import time
from typing import List, Dict, Any

async def fetch_url(session: aiohttp.ClientSession, url: str) -> Dict[str, Any]:
    """
    Fetch data from a single URL asynchronously
    """
    try:
        async with session.get(url) as response:
            data = await response.json()
            return {
                'url': url,
                'status': response.status,
                'data': data,
                'success': True
            }
    except Exception as e:
        return {
            'url': url,
            'status': None,
            'data': None,
            'error': str(e),
            'success': False
        }

async def fetch_multiple_urls(urls: List[str]) -> List[Dict[str, Any]]:
    """
    Fetch data from multiple URLs concurrently
    """
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

async def process_data_async(data_list: List[Dict]) -> List[Dict]:
    """
    Process data asynchronously with rate limiting
    """
    semaphore = asyncio.Semaphore(5)  # Limit concurrent operations

    async def process_item(item: Dict) -> Dict:
        async with semaphore:
            # Simulate async processing
            await asyncio.sleep(0.1)
            processed_item = {
                **item,
                'processed_at': time.time(),
                'processed': True
            }
            return processed_item

    tasks = [process_item(item) for item in data_list]
    results = await asyncio.gather(*tasks)
    return results

class AsyncDataProcessor:
    """
    Async data processor with connection pooling
    """

    def __init__(self, max_connections: int = 10):
        self.max_connections = max_connections
        self.session = None

    async def __aenter__(self):
        connector = aiohttp.TCPConnector(limit=self.max_connections)
        self.session = aiohttp.ClientSession(connector=connector)
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def batch_process(self, urls: List[str], batch_size: int = 5) -> List[Dict]:
        """
        Process URLs in batches to avoid overwhelming the server
        """
        results = []

        for i in range(0, len(urls), batch_size):
            batch = urls[i:i + batch_size]
            batch_tasks = [fetch_url(self.session, url) for url in batch]
            batch_results = await asyncio.gather(*batch_tasks)
            results.extend(batch_results)

            # Add delay between batches
            if i + batch_size < len(urls):
                await asyncio.sleep(1)

        return results

# Usage example
async def main():
    urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2'
    ]

    # Method 1: Simple concurrent fetching
    start_time = time.time()
    results = await fetch_multiple_urls(urls)
    print(f"Fetched {len(results)} URLs in {time.time() - start_time:.2f} seconds")

    # Method 2: Using context manager for advanced processing
    async with AsyncDataProcessor(max_connections=3) as processor:
        batch_results = await processor.batch_process(urls, batch_size=2)
        print(f"Batch processed {len(batch_results)} URLs")

if __name__ == "__main__":
    asyncio.run(main())`,
    tags: ["python", "async", "aiohttp", "concurrent", "asyncio"]
  }
];