# Calorie-Cop

A simple and elegant calorie tracking web application built with HTML, Tailwind CSS, and JavaScript.

Calorie-Cop allows users to log foods eaten throughout the day, monitor their calorie intake, track progress toward a daily goal, and save data using Local Storage.

---

## Features

- Add food items with calorie values
- Delete individual food entries
- Reset the entire day's records
- Automatic calorie total calculation
- Progress bar showing progress toward a daily goal
- Saves data using Local Storage
- Calorie lookup feature using a simulated Fetch API request
- Responsive design for desktop and mobile devices

---

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Fetch API
- Local Storage

---

## Project Structure

```text
calorie-cop/
│
├── index.html
├── script.js
└── README.md
```

---

## How It Works

### Adding Food

1. Enter the food name.
2. Enter the calorie amount.
3. Click **Add**.
4. The food item is saved and displayed in the list.

### Removing Food

- Click the **✕** button next to a food item to remove it.

### Resetting the Day

- Click **Reset Day** and confirm the action to clear all food entries.

### Calorie Lookup

1. Type a food name into the food name field.
2. Click **Look up calories for me**.
3. The application checks the built-in food database and automatically fills in the calorie value if a match is found.

---

## Local Storage

The application stores food entries in the browser using Local Storage.

Benefits include:

- Data remains available after refreshing the page.
- No external database is required.
- Data is stored locally on the user's device.

Storage Key:

```javascript
calorieCounter.foods
```

---

## Daily Goal

The default daily calorie goal is:

```javascript
2000 kcal
```

The progress bar updates automatically based on the total calories consumed.

---

## JavaScript Concepts Demonstrated

This project demonstrates:

- DOM Manipulation
- Event Listeners
- Event Delegation
- Form Validation
- Arrays and Objects
- Array Methods (`forEach`, `filter`, `reduce`)
- Local Storage
- Fetch API
- Async/Await
- Dynamic Element Creation
- Responsive UI Design

---

## Future Improvements

- Edit existing food entries
- Custom calorie goals
- Dark mode support
- Integration with a real nutrition API
- Meal categories (Breakfast, Lunch, Dinner, Snacks)
- Weekly and monthly statistics
- Data visualization and charts

---

## Preview

Calorie-Cop provides a clean and user-friendly interface featuring:

- Daily calorie totals
- Progress tracking
- Food logging
- Calorie lookup functionality
- Food history management

---

## Author

**Laletty Murathe**

This project was developed to practice and demonstrate JavaScript concepts such as DOM manipulation, Local Storage, Fetch API integration, and responsive web design.
