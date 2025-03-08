# Interactive Human Heart Educational Website

## Project Vision & Mission
An immersive educational platform dedicated to exploring the human heart through interactive 3D visualization, practical tools, and engaging content. This website aims to transform complex medical concepts into accessible learning experiences for students, educators, healthcare professionals, and curious minds.

## Core Components

### 🏠 Landing Page
- **3D Heart Model**: Interactive anatomical visualization with rotation and zoom capabilities
- **Hero Message**: "Explore the Human Heart: Discover the wonders of the human heart through our interactive experiences"
- **Visual Design**: Parallax scrolling effects with smooth section transitions
- **Navigation**: Intuitive navbar for seamless site exploration

### 📊 Anatomy Explorer
- Comprehensive breakdown of cardiac structures with detailed visuals
- Interactive elements highlighting chambers, valves, and vessels
- Educational content explaining functions and relationships between components
- Progressive disclosure of information based on user interaction

### 🔬 Interactive Tools Suite

#### Heart Rate Simulator
- Adjustable heart rate slider (40-220 BPM)
- Real-time visualization of cardiac contractions
- Visual feedback corresponding to selected rates
- Educational context for different heart rate ranges

#### BMI Calculator
- User inputs: height (cm) and weight (kg)
- Results display with health classification and interpretation

#### Heart Rate Zones Tool
- Age-based calculation of optimal training zones
- Visual representation of:
  - Resting heart rate range
  - Fat burning zone
  - Cardio enhancement zone
  - Peak performance threshold

#### Daily Calorie Requirements
- **Personalization inputs**:
  - Age
  - Current weight
  - Height (slider interface)
  - Gender selection
  - Activity level (from sedentary to very active)
- **Outputs**:
  - Base metabolic rate
  - Daily calorie recommendations
  - Protein intake guidelines

### 📝 Knowledge Assessment
- 10-question interactive quiz on cardiac anatomy and function
- Immediate feedback with educational explanations
- Score tracking and performance metrics
- Option to revisit challenging concepts

### 📚 Learning Resources
- Curated collection of authoritative sources (World Heart Federation, etc.)
- Attribution for all information sources
- Additional reading materials for deeper exploration
- Regular content updates maintaining medical accuracy

## Technical Specifications

### Design Philosophy
- Clean, intuitive interface emphasizing content accessibility
- Responsive design optimized for both desktop and mobile experiences
- Educational visuals with consistent styling
- Smooth animations enhancing the learning experience

### Technology Stack
- **Frontend Framework**: React for component-based architecture
- **Styling**: Tailwind CSS for rapid development and consistent design
- **3D Visualization**: Three.js for interactive heart model
- **Interactivity**: JavaScript for calculators and dynamic content
- **Performance**: Optimized assets and efficient rendering

## Implementation Priorities
1. Create engaging, scientifically accurate 3D heart model
2. Develop functional, user-friendly calculators and simulators
3. Design intuitive navigation with smooth scrolling effects
4. Ensure mobile responsiveness across all components
5. Implement educational quiz with feedback mechanism
6. Compile comprehensive resource library with proper attribution

## Success Criteria
- Intuitive user navigation through complex cardiac concepts
- Functional interactive tools providing accurate calculations
- Engaging visual presentation maintaining scientific accuracy
- Comprehensive educational content with proper attribution
- Seamless experience across desktop and mobile devices

## Development Guidelines
- Prioritize accessibility features for inclusive learning
- Ensure content accuracy with medical review
- Implement progressive enhancement for broad device support
- Focus on performance optimization for smooth interactions

## Database Schema

### Users Table
- **user_id**: UUID (Primary Key)
- **username**: VARCHAR(50) (Unique)
- **email**: VARCHAR(100) (Unique)
- **password_hash**: VARCHAR(255)
- **created_at**: TIMESTAMP
- **last_login**: TIMESTAMP
- **role**: ENUM ('student', 'educator', 'admin')

### Quiz Questions Table
- **question_id**: UUID (Primary Key)
- **question_text**: TEXT
- **difficulty_level**: ENUM ('beginner', 'intermediate', 'advanced')
- **category**: VARCHAR(50)
- **created_at**: TIMESTAMP

### Quiz Answers Table
- **answer_id**: UUID (Primary Key)
- **question_id**: UUID (Foreign Key)
- **answer_text**: TEXT
- **is_correct**: BOOLEAN
- **explanation**: TEXT

### User Quiz Attempts Table
- **attempt_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key)
- **quiz_id**: UUID (Foreign Key)
- **score**: INTEGER
- **completed_at**: TIMESTAMP

### Learning Resources Table
- **resource_id**: UUID (Primary Key)
- **title**: VARCHAR(255)
- **description**: TEXT
- **resource_type**: ENUM ('article', 'video', 'research_paper', 'external_link')
- **url**: VARCHAR(255)
- **source_organization**: VARCHAR(100)
- **created_at**: TIMESTAMP

### Heart Anatomy Parts Table
- **part_id**: UUID (Primary Key)
- **name**: VARCHAR(100)
- **description**: TEXT
- **3d_model_reference**: VARCHAR(255)
- **category**: ENUM ('chamber', 'valve', 'vessel', 'tissue')

### User Progress Table
- **progress_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key)
- **module_completed**: VARCHAR(100)
- **completion_date**: TIMESTAMP
- **score**: FLOAT

### User Saved Calculations Table
- **calculation_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key)
- **calculation_type**: ENUM ('bmi', 'heart_rate', 'calorie')
- **input_data**: JSON
- **results**: JSON
- **created_at**: TIMESTAMP

## Folder Structure

```
hhs-heart/
├── public/                  # Static files
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       ├── models/          # 3D heart models
│       └── icons/
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   │   ├── Button.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── landing/         # Landing page components
│   │   │   ├── Hero.jsx
│   │   │   ├── HeartModel.jsx
│   │   │   └── FeatureHighlights.jsx
│   │   │
│   │   ├── anatomy/         # Anatomy explorer components
│   │   │   ├── ExplorerView.jsx
│   │   │   ├── AnatomyDetails.jsx
│   │   │   └── PartsSelector.jsx
│   │   │
│   │   ├── tools/           # Interactive tools components
│   │   │   ├── HeartRateSimulator.jsx
│   │   │   ├── BMICalculator.jsx
│   │   │   ├── HeartRateZones.jsx
│   │   │   └── CalorieCalculator.jsx
│   │   │
│   │   ├── quiz/            # Quiz components
│   │   │   ├── QuizContainer.jsx
│   │   │   ├── Question.jsx
│   │   │   └── Results.jsx
│   │   │
│   │   └── resources/       # Learning resources components
│   │       ├── ResourcesGrid.jsx
│   │       └── ResourceCard.jsx
│   │
│   ├── pages/               # Complete page components
│   │   ├── HomePage.jsx
│   │   ├── AnatomyPage.jsx
│   │   ├── ToolsPage.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResourcesPage.jsx
│   │   ├── UserProfilePage.jsx
│   │   └── AboutPage.jsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useHeartRate.js
│   │   ├── useBMI.js
│   │   └── useQuiz.js
│   │
│   ├── context/             # React context providers
│   │   ├── AuthContext.js
│   │   └── UserProgressContext.js
│   │
│   ├── services/            # API and service functions
│   │   ├── api.js           # API client
│   │   ├── authService.js
│   │   └── calculationService.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   ├── data/                # Static data files
│   │   ├── quizQuestions.js
│   │   ├── anatomyData.js
│   │   └── resourceLinks.js
│   │
│   ├── styles/              # Global styles and Tailwind configuration
│   │   ├── global.css
│   │   └── tailwind.css
│   │
│   ├── App.jsx              # Main application component
│   ├── index.jsx            # Application entry point
│   └── routes.js            # Route definitions
│
├── server/                  # Backend code (if needed)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── database/
│
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js       # Tailwind CSS configuration
└── next.config.js           # Next.js configuration (if using Next.js)
```

#implementation ideas 

## Landing Page Design

**Hero Section**

- Full-screen 3D heart model (use Sketchfab embed code from[^6]) with parallax mouse movement
- Animated text overlay: "Explore the Human Heart" with "Discover the wonders..." as subtitle[^1]
- Floating navigation arrows with micro-interactions

```html
<!-- 3D Model Embed -->
<iframe src="https://sketchfab.com/models/168b474fba564f688048212e99b4159d/embed" 
        class="heart-3d-model">
</iframe>
```
