import { useState, useEffect } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [snippets, setSnippets] = useState([
    {
      id: 1,
      title: "React Component Template",
      language: "jsx",
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
    }
  ])

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // ESC key listener for modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedSnippet(null);
      }
    };

    if (selectedSnippet) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [selectedSnippet]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          📝 Code Snippet Manager
        </h1>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search snippets by title, tags, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map(snippet => (
            <div
              key={snippet.id}
              onClick={() => setSelectedSnippet(snippet)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl cursor-pointer hover:bg-white/15 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{snippet.title}</h3>
                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                  {snippet.language}
                </span>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-green-300 overflow-hidden">
                  <code className="line-clamp-3">
                    {snippet.code.split('\n').slice(0, 3).join('\n')}
                    {snippet.code.split('\n').length > 3 && '\n...'}
                  </code>
                </pre>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {snippet.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-center">
                <span className="text-blue-300 text-sm">Click to view full code →</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">No snippets found matching "{searchTerm}"</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="text-white/80 text-sm">
            <p>Total: {snippets.length} snippets | Showing: {filteredSnippets.length}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSnippet && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSnippet(null)}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedSnippet.title}</h2>
                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                  {selectedSnippet.language}
                </span>
              </div>
              <button
                onClick={() => setSelectedSnippet(null)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-auto">
              <div className="relative bg-gray-800 rounded-lg">
                <button
                  onClick={() => copyToClipboard(selectedSnippet.code, selectedSnippet.id)}
                  className="absolute top-4 right-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 rounded transition-colors z-10"
                >
                  {copiedId === selectedSnippet.id ? 'Copied!' : 'Copy Code'}
                </button>
                <pre className="text-sm text-green-300 overflow-x-auto p-6 pr-24">
                  <code>{selectedSnippet.code}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedSnippet.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App