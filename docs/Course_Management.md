<h1>Course Management Docs</h1>

---

### **Authentication & Authorization**
- **Roles**:
  - **Instructor**: Can manage their own courses.
  - **Admin**: Can manage any course in the system.

---
### **Course Management**

- **Course Listing**: Retrieve all available Courses.
- **Course Details**: Access detailed information about individual Courses, including user reviews.
- **Course Creation**: Instructor & Admins can add new Courses to the collection.
- **Course Update**: Instructor & Admins can modify Course details.
- **Course Deletion**: Instructor & Admins can remove Courses from the system.

---



### **API Endpoints**

#### **Course Management**

| **Feature**               | **HTTP Method** | **Endpoint**             | **Description**                                                                                       | **Authorization**        |
|--------------------------- |-----------------|--------------------------|-------------------------------------------------------------------------------------------------------|--------------------------|
| **List All Courses**       | `GET`           | `/api/courses`           | Retrieve all available courses.                                                                       | Public                   |
| **Get Course Details**     | `GET`           | `/api/courses/:id`       | Get detailed information about a specific course.                                                     | Public                   |
| **Add New Course**         | `POST`          | `/api/courses`           | Create a new course (only for Instructors or Admins).                                                 | Instructor/Admin         |
| **Update Course**          | `PUT`           | `/api/courses/:id`       | Update details of an existing course.                                                                | Instructor/Admin (Owner) |
| **Delete Course**          | `DELETE`        | `/api/courses/:id`       | Remove a course from the system.                                                                      | Instructor/Admin (Owner) |

---

#### **Chapter Management**

| **Feature**               | **HTTP Method** | **Endpoint**                 | **Description**                                                                 | **Authorization**        |
|--------------------------- |-----------------|------------------------------|---------------------------------------------------------------------------------|--------------------------|
| **List All Chapters**      | `GET`           | `/api/courses/:id/chapters`  | Get a list of chapters for a specific course.                                   | Public                   |
| **Add New Chapter**        | `POST`          | `/api/courses/:id/chapters`  | Add a new chapter to a specific course.                                        | Instructor/Admin (Owner) |
| **Update Chapter**         | `PUT`           | `/api/chapters/:chapter_id`  | Update details of a specific chapter.                                          | Instructor/Admin (Owner) |
| **Delete Chapter**         | `DELETE`        | `/api/chapters/:chapter_id`  | Remove a chapter from a course.                                                | Instructor/Admin (Owner) |

---

#### **Lesson Management**

| **Feature**               | **HTTP Method** | **Endpoint**                    | **Description**                                                                | **Authorization**        |
|--------------------------- |-----------------|---------------------------------|--------------------------------------------------------------------------------|--------------------------|
| **List All Lessons**       | `GET`           | `/api/chapters/:id/lessons`     | Get a list of lessons for a specific chapter.                                  | Public                   |
| **Add New Lesson**         | `POST`          | `/api/chapters/:id/lessons`     | Add a new lesson to a chapter.                                                 | Instructor/Admin (Owner) |
| **Update Lesson**          | `PUT`           | `/api/lessons/:lesson_id`       | Update details of a specific lesson.                                           | Instructor/Admin (Owner) |
| **Delete Lesson**          | `DELETE`        | `/api/lessons/:lesson_id`       | Remove a lesson from a chapter.                                                | Instructor/Admin (Owner) |

---

#### **Quiz Management**

| **Feature**               | **HTTP Method** | **Endpoint**                     | **Description**                                                                | **Authorization**        |
|--------------------------- |-----------------|----------------------------------|--------------------------------------------------------------------------------|--------------------------|
| **Add Quiz**               | `POST`          | `/api/lessons/:id/quiz`          | Add a quiz to a specific lesson.                                               | Instructor/Admin (Owner) |
| **Update Quiz**            | `PUT`           | `/api/quizzes/:quiz_id`          | Update details of a specific quiz.                                             | Instructor/Admin (Owner) |
| **Delete Quiz**            | `DELETE`        | `/api/quizzes/:quiz_id`          | Remove a quiz from a lesson.                                                   | Instructor/Admin (Owner) |

---

#### **User Progress & Review**

| **Feature**               | **HTTP Method** | **Endpoint**                     | **Description**                                                                | **Authorization**        |
|--------------------------- |-----------------|----------------------------------|--------------------------------------------------------------------------------|--------------------------|
| **Track Progress**         | `POST`          | `/api/courses/:id/progress`      | Update user progress for a specific course.                                    | Authenticated Users      |
| **Add Review**             | `POST`          | `/api/courses/:id/review`        | Add a review to a specific course.                                             | Authenticated Users      |

---

### **Examples of Payloads**

#### **Add New Course** (`POST /api/courses`)
```json
{
  "title": "Introduction to Python",
  "instructor": "Instructor_ID",
  "category": "Programming",
  "description": "Learn Python programming from scratch.",
  "type": "Paid",
  "price": 99.99,
  "thumbnail": "https://example.com/python-course-thumbnail.jpg"
}
```

#### **Add New Chapter** (`POST /api/courses/:id/chapters`)
```json
{
  "title": "Getting Started with Python",
  "description": "Learn the basics of Python programming.",
  "order": 1
}
```

#### **Add New Lesson** (`POST /api/chapters/:id/lessons`)
```json
{
  "title": "Installing Python",
  "content_type": "Video",
  "content_url": "https://example.com/python-installation.mp4",
  "duration": 300,
  "order": 1
}
```

#### **Add Quiz** (`POST /api/lessons/:id/quiz`)
```json
{
  "title": "Python Basics Quiz",
  "questions": [
    {
      "question_text": "What is the output of 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correct_option": 1
    },
    {
      "question_text": "Which of these is a valid Python variable name?",
      "options": ["1variable", "_variable", "variable!", "variable-1"],
      "correct_option": 1
    }
  ],
  "max_score": 10,
  "passing_score": 7
}
```

---


### **Schemas**

#### 1. **Course Schema**
The top-level representation of a course.

| **Field**         | **Type**          | **Description**                                              |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| `id`              | String            | Unique Course identifier.                                    |
| `title`           | String            | Course title.                                                |
| `instructor`      | String (FK)       | Reference to the user who created the course.                |
| `category`        | String            | Category of the course (e.g., Development, Design, etc.).    |
| `description`     | Text              | Full description of the course.                             |
| `type`            | Enum (Paid, Free) | Course type.                                                 |
| `price`           | Float             | Cost of the course (if Paid).                                |
| `thumbnail`       | File              | Image file for the course thumbnail.                        |
| `status`          | Enum (Pending,Published,Deleted) | Course publishing status.                      |
| `chapters`        | Array       | List of associated chapter IDs.                             |
| `reviews`         | Array             | List of user reviews for the course.                        |
| `created_at`      | DateTime          | Timestamp for course creation.                              |
| `updated_at`      | DateTime          | Timestamp for last course update.                           |

---

#### 2. **Chapter Schema**
A course consists of multiple chapters, each containing specific lessons or modules.

| **Field**         | **Type**          | **Description**                                             |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| `id`              | String            | Unique Chapter identifier.                                  |
| `course_id`       | String (FK)       | Reference to the associated Course.                         |
| `title`           | String            | Chapter title.                                              |
| `description`     | Text              | Optional description of the chapter.                       |
| `order`           | Integer           | Position of the chapter in the course (e.g., 1, 2, 3).      |
| `lessons`         | Array (FK)        | List of associated lesson IDs.                              |
| `created_at`      | DateTime          | Timestamp for chapter creation.                            |
| `updated_at`      | DateTime          | Timestamp for last chapter update.                         |

---

#### 3. **Lesson Schema**
A lesson is a specific piece of content within a chapter.

| **Field**         | **Type**          | **Description**                                             |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| `id`              | String            | Unique Lesson identifier.                                   |
| `chapter_id`      | String (FK)       | Reference to the associated Chapter.                        |
| `title`           | String            | Lesson title.                                               |
| `content_type`    | Enum (Video, PDF, Quiz) | Type of content.                                   |
| `content_url`     | File/URL          | File or link to the content (e.g., video, PDF, or quiz).    |
| `duration`        | Integer (seconds) | Duration of the video/audio content (if applicable).        |
| `order`           | Integer           | Position of the lesson within the chapter.                  |
| `created_at`      | DateTime          | Timestamp for lesson creation.                             |
| `updated_at`      | DateTime          | Timestamp for last lesson update.                          |

---

#### 4. **Quiz Schema**
If the lesson is a quiz, it can include additional fields.

| **Field**         | **Type**          | **Description**                                             |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| `id`              | String            | Unique Quiz identifier.                                     |
| `lesson_id`       | String (FK)       | Reference to the associated Lesson.                         |
| `title`           | String            | Quiz title.                                                 |
| `questions`       | Array (Question)  | Array of questions.                                         |
| `max_score`       | Integer           | Maximum score for the quiz.                                 |
| `passing_score`   | Integer           | Minimum score required to pass.                             |

---

#### 5. **Question Schema**
Details of each question in a quiz.

| **Field**         | **Type**          | **Description**                                             |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| `id`              | String            | Unique Question identifier.                                 |
| `quiz_id`         | String (FK)       | Reference to the associated Quiz.                           |
| `question_text`   | String            | The text of the question.                                   |
| `options`         | Array (String)    | Possible answers to the question.                          |
| `correct_option`  | Integer           | Index of the correct option in the `options` array.         |
| `explanation`     | Text              | Explanation of the correct answer (optional).               |

---

### **Relationships**
- **Course → Chapters**: A course can have multiple chapters (1:N).
- **Chapter → Lessons**: A chapter can have multiple lessons (1:N).
- **Lesson → Quiz**: A lesson can optionally include a quiz (1:1).
- **Quiz → Questions**: A quiz contains multiple questions (1:N).

---

### **Features to Consider**
- **Dynamic Ordering**: Allow reordering of chapters and lessons.
- **Progress Tracking**: Track user progress for each course and lesson.
- **Review & Rating**: Users can review and rate courses.
- **Completion Certificates**: Issue certificates upon course completion.
- **Content Preview**: Allow users to preview specific lessons before enrollment.



