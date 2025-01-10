# Dynamic Event Calendar Application  

A feature-rich and visually appealing event calendar application built with React.js, designed to manage events effectively and provide a seamless user experience.  

## **Objective**  

The goal of this project is to demonstrate advanced React.js logic, UI/UX design skills, and deployment capabilities by creating a dynamic event calendar.  

---

## **Features**  

### **Core Features**  

1. **Calendar View**  
   - Displays a calendar grid for the current month with proper alignment.  
   - Month navigation using "Previous" and "Next" buttons.  

2. **Event Management**  
   - Add events by selecting a date.  
   - Edit or delete events from the selected date.  
   - Events include the following details:  
     - Event name  
     - Start time and end time  
     - Optional description  

3. **Event List**  
   - Display a list of all events for the selected day in a modal or side panel.  

4. **Data Persistence**  
   - Events are stored in **localStorage** to persist data between page refreshes.  

---

### **UI Requirements**  

- Modern and clean interface built with **ShadCN** components.  
- Calendar grid clearly distinguishes weekends from weekdays.  
- Highlights:  
  - Current day.  
  - Selected day.  

---

### **Complex Logic**  

- Automatic handling of month transitions (e.g., transitioning from January 31 to February 1).  
- Validation to prevent overlapping events on the same date and time.  
- Event filtering by keywords.  

---

### ** Features **  

- Drag-and-drop functionality for rescheduling events between days.  
- Color-coded events based on categories (e.g., work, personal, others).  
- Export event lists for a specific month as a **JSON** or **CSV** file.  

---

## **Technologies Used**  

- **React.js**: For creating a responsive and dynamic user interface.  
- **ShadCN**: For modern and accessible UI components.  
- **Date-fns**: For date manipulation.  
- **CSS3**: For styling.  
- **localStorage**: To persist data.  

---
## **to run the project** :
npm install
npm start
