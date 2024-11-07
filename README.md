# Pomodoro Timer Widget
This project is a Pomodoro Timer Widget, which helps users manage their time effectively using the Pomodoro Technique. The widget cycles through periods of focused work (Pomodoro sessions) followed by short and long breaks, helping users stay productive and refreshed.

## Features
Pomodoro Work Session: A focused work period set to a default duration (e.g., 25 minutes). After the time ends, the timer automatically switches to a short break.
Short Break: A brief break (e.g., 5 minutes) that allows you to rest between work sessions. After the break, it switches back to another Pomodoro work session.
Long Break: After completing several Pomodoro sessions, the timer automatically switches to a longer break (e.g., 15 minutes) for extended relaxation.
Automatic Session Shifting: The timer automatically transitions between Pomodoro work sessions, short breaks, and long breaks. After each session, it moves to the appropriate next session:
Work Session → Short Break
Short Break → Work Session
After multiple Work Sessions → Long Break
Long Break → Work Session
![image](https://github.com/user-attachments/assets/a184a1ce-26fe-4a53-a871-603d4529efaf)

## Deployed Application
You can try the live version of the Pomodoro Timer Widget by visiting this link: https://pankajyadav8523.github.io/pomodoro/


# How to run 
To run this project on your local machine, follow these instructions:

### Clone the Repository: Open your terminal and clone the repository with the following command:
git clone https://github.com/pankajyadav8523/pomodoro.git
Navigate to the Project Folder: Use the cd command to navigate into the project directory:
cd pomodoro
Install Dependencies: Run the following command to install the necessary dependencies:
npm install
Start the Application: Once the dependencies are installed, start the development server with:
npm run dev
