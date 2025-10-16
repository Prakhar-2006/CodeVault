#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#ifdef _WIN32
    #include <windows.h>
    #include <conio.h>
#else
    #include <unistd.h>
    #include <termios.h>
#endif

// Cross-platform color handling
#ifdef _WIN32
    // Windows color codes
    #define COLOR_RESET 7
    #define COLOR_RED 12
    #define COLOR_GREEN 10
    #define COLOR_YELLOW 14
    #define COLOR_BLUE 9
    #define COLOR_CYAN 11
    #define COLOR_WHITE 15
#else
    // Unix/Linux color codes (as integers for switch compatibility)
    #define COLOR_RESET 0
    #define COLOR_RED 1
    #define COLOR_GREEN 2
    #define COLOR_YELLOW 3
    #define COLOR_BLUE 4
    #define COLOR_CYAN 5
    #define COLOR_WHITE 6
#endif

// Data structures
struct User {
    char username[50];
    char password[50];
};

struct Student {
    int id;
    char name[50];
    int age;
    char course[50];
};

// Function prototypes
void setColor(int color);
void clearScreen();
void sleepMs(int ms);
void getPassword(char *password);
void encryptDecrypt(char *text, const char *key);
void animateWelcome();
void showAuthMenu();
void signup();
int login();
void showDashboard();
void addStudent();
void viewStudents();
void searchStudent();
void deleteStudent();
void loadingAnimation(const char *message);
void drawBox(const char *title);
void printCentered(const char *text);
int getChoice(int min, int max);

// Encryption key
const char *ENCRYPTION_KEY = "STUDENT_MGMT_KEY";

int main() {
    clearScreen();
    animateWelcome();
    
    while (1) {
        showAuthMenu();
    }
    
    return 0;
}

// Cross-platform color setting
void setColor(int color) {
#ifdef _WIN32
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, color);
#else
    // Use ANSI escape sequences for Unix/Linux
    const char* colorCode = "";
    switch (color) {
        case COLOR_RED: colorCode = "\033[31m"; break;
        case COLOR_GREEN: colorCode = "\033[32m"; break;
        case COLOR_YELLOW: colorCode = "\033[33m"; break;
        case COLOR_BLUE: colorCode = "\033[34m"; break;
        case COLOR_CYAN: colorCode = "\033[36m"; break;
        case COLOR_WHITE: colorCode = "\033[37m"; break;
        default: colorCode = "\033[0m"; break;
    }
    printf("%s", colorCode);
#endif
}

void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void sleepMs(int ms) {
#ifdef _WIN32
    Sleep(ms);
#else
    usleep(ms * 1000);
#endif
}

// Get password with hidden input
void getPassword(char *password) {
    int i = 0;
    char ch;
    
#ifdef _WIN32
    while ((ch = _getch()) != '\r') {
        if (ch == '\b') {
            if (i > 0) {
                i--;
                printf("\b \b");
            }
        } else if (i < 49) {
            password[i++] = ch;
            printf("*");
        }
    }
#else
    struct termios oldt, newt;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    
    while ((ch = getchar()) != '\n') {
        if (ch == 127) { // backspace
            if (i > 0) {
                i--;
                printf("\b \b");
            }
        } else if (i < 49) {
            password[i++] = ch;
            printf("*");
        }
    }
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
#endif
    password[i] = '\0';
    printf("\n");
}

// Simple XOR encryption/decryption
void encryptDecrypt(char *text, const char *key) {
    int keyLen = strlen(key);
    int textLen = strlen(text);
    
    for (int i = 0; i < textLen; i++) {
        text[i] = text[i] ^ key[i % keyLen];
    }
}

void animateWelcome() {
    clearScreen();
    
    const char *welcomeText = "Welcome User";
    int textLen = strlen(welcomeText);
    int screenWidth = 50;
    int padding = (screenWidth - textLen) / 2;
    
    setColor(COLOR_CYAN);
    
    // Animated appearance
    for (int i = 0; i <= textLen; i++) {
        clearScreen();
        printf("\n\n\n\n");
        printCentered("+----------------------------------+");
        printCentered("|                                  |");
        
        printf("|");
        for (int j = 0; j < padding; j++) printf(" ");
        for (int j = 0; j < i; j++) printf("%c", welcomeText[j]);
        for (int j = 0; j < textLen - i + padding; j++) printf(" ");
        printf("|\n");
        
        printCentered("|                                  |");
        printCentered("+----------------------------------+");
        
        sleepMs(100);
    }
    
    setColor(COLOR_RESET);
    printf("\n\n");
    printCentered("Loading system...");
    loadingAnimation("Initializing");
    sleepMs(2000);
}

void showAuthMenu() {
    clearScreen();
    drawBox("STUDENT MANAGEMENT SYSTEM");
    
    setColor(COLOR_WHITE);
    printf("| 1. Login                                 |\n");
    printf("| 2. Signup                                |\n");
    printf("| 3. Exit                                  |\n");
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
    
    printf("\n");
    setColor(COLOR_YELLOW);
    printCentered("Enter your choice (1-3): ");
    setColor(COLOR_RESET);
    
    int choice = getChoice(1, 3);
    
    switch (choice) {
        case 1:
            if (login()) {
                showDashboard();
            }
            break;
        case 2:
            signup();
            break;
        case 3:
            setColor(COLOR_CYAN);
            printCentered("Thank you for using Student Management System!");
            setColor(COLOR_RESET);
            exit(0);
    }
}

void signup() {
    clearScreen();
    drawBox("SIGN UP");
    
    struct User newUser;
    
    setColor(COLOR_WHITE);
    printf("| Enter username: ");
    scanf("%49s", newUser.username);
    getchar(); // Clear buffer
    
    printf("| Enter password: ");
    setColor(COLOR_RESET);
    getPassword(newUser.password);
    
    // Encrypt password
    encryptDecrypt(newUser.password, ENCRYPTION_KEY);
    
    // Save to file
    FILE *file = fopen("users.dat", "ab");
    if (file == NULL) {
        setColor(COLOR_RED);
        printf("| Error: Cannot create user file!        |\n");
        setColor(COLOR_RESET);
        sleepMs(2000);
        return;
    }
    
    fwrite(&newUser, sizeof(struct User), 1, file);
    fclose(file);
    
    setColor(COLOR_GREEN);
    printf("| User registered successfully!          |\n");
    setColor(COLOR_RESET);
    sleepMs(2000);
}

int login() {
    clearScreen();
    drawBox("LOGIN");
    
    char username[50];
    char password[50];
    
    setColor(COLOR_WHITE);
    printf("| Enter username: ");
    scanf("%49s", username);
    getchar(); // Clear buffer
    
    printf("| Enter password: ");
    setColor(COLOR_RESET);
    getPassword(password);
    
    // Encrypt for comparison
    char encryptedPassword[50];
    strcpy(encryptedPassword, password);
    encryptDecrypt(encryptedPassword, ENCRYPTION_KEY);
    
    FILE *file = fopen("users.dat", "rb");
    if (file == NULL) {
        setColor(COLOR_RED);
        printf("| No users registered! Please sign up.   |\n");
        setColor(COLOR_RESET);
        sleepMs(2000);
        return 0;
    }
    
    struct User user;
    int found = 0;
    
    while (fread(&user, sizeof(struct User), 1, file)) {
        if (strcmp(user.username, username) == 0 && 
            strcmp(user.password, encryptedPassword) == 0) {
            found = 1;
            break;
        }
    }
    fclose(file);
    
    if (found) {
        setColor(COLOR_GREEN);
        printf("| Login successful!                     |\n");
        setColor(COLOR_RESET);
        loadingAnimation("Loading dashboard");
        return 1;
    } else {
        setColor(COLOR_RED);
        printf("| Invalid username or password!         |\n");
        setColor(COLOR_RESET);
        sleepMs(2000);
        return 0;
    }
}

void showDashboard() {
    int choice;
    
    do {
        clearScreen();
        drawBox("DASHBOARD");
        
        setColor(COLOR_WHITE);
        printf("| 1. Add Student                        |\n");
        printf("| 2. View Students                      |\n");
        printf("| 3. Search Student                     |\n");
        printf("| 4. Delete Student                     |\n");
        printf("| 5. Logout                             |\n");
        setColor(COLOR_BLUE);
        printf("+------------------------------------------+\n");
        setColor(COLOR_RESET);
        
        printf("\n");
        setColor(COLOR_YELLOW);
        printCentered("Enter your choice (1-5): ");
        setColor(COLOR_RESET);
        
        choice = getChoice(1, 5);
        
        switch (choice) {
            case 1: addStudent(); break;
            case 2: viewStudents(); break;
            case 3: searchStudent(); break;
            case 4: deleteStudent(); break;
            case 5: 
                setColor(COLOR_CYAN);
                printCentered("Logging out...");
                setColor(COLOR_RESET);
                sleepMs(1000);
                break;
        }
    } while (choice != 5);
}

void addStudent() {
    clearScreen();
    drawBox("ADD STUDENT");
    
    struct Student student;
    static int nextId = 1;
    
    // Find next available ID
    FILE *file = fopen("students.dat", "rb");
    if (file != NULL) {
        struct Student temp;
        while (fread(&temp, sizeof(struct Student), 1, file)) {
            if (temp.id >= nextId) {
                nextId = temp.id + 1;
            }
        }
        fclose(file);
    }
    
    student.id = nextId++;
    
    setColor(COLOR_WHITE);
    printf("| Student ID: %-28d |\n", student.id);
    printf("| Enter name: ");
    scanf(" %49[^\n]", student.name);
    printf("| Enter age: ");
    scanf("%d", &student.age);
    getchar(); // Clear buffer
    printf("| Enter course: ");
    scanf(" %49[^\n]", student.course);
    
    // Save to file
    file = fopen("students.dat", "ab");
    if (file == NULL) {
        setColor(COLOR_RED);
        printf("| Error saving student data!            |\n");
        setColor(COLOR_RESET);
    } else {
        fwrite(&student, sizeof(struct Student), 1, file);
        fclose(file);
        
        setColor(COLOR_GREEN);
        printf("| Student added successfully!           |\n");
        setColor(COLOR_RESET);
    }
    
    printf("| Press any key to continue...          |\n");
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
    getchar(); // Clear buffer
    getchar(); // Wait for key press
}

void viewStudents() {
    clearScreen();
    drawBox("VIEW STUDENTS");
    
    FILE *file = fopen("students.dat", "rb");
    if (file == NULL) {
        setColor(COLOR_YELLOW);
        printf("| No student records found.             |\n");
        setColor(COLOR_RESET);
    } else {
        setColor(COLOR_WHITE);
        printf("| %-4s | %-20s | %-3s | %-15s |\n", "ID", "Name", "Age", "Course");
        setColor(COLOR_BLUE);
        printf("+------+----------------------+-----+-----------------+\n");
        setColor(COLOR_RESET);
        
        struct Student student;
        int count = 0;
        
        while (fread(&student, sizeof(struct Student), 1, file)) {
            setColor(COLOR_WHITE);
            printf("| %-4d | %-20s | %-3d | %-15s |\n", 
                   student.id, student.name, student.age, student.course);
            count++;
        }
        fclose(file);
        
        setColor(COLOR_BLUE);
        printf("+------+----------------------+-----+-----------------+\n");
        setColor(COLOR_GREEN);
        printf("| Total students: %-22d |\n", count);
        setColor(COLOR_RESET);
    }
    
    printf("| Press any key to continue...          |\n");
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
    getchar(); // Wait for key press
}

void searchStudent() {
    clearScreen();
    drawBox("SEARCH STUDENT");
    
    setColor(COLOR_WHITE);
    printf("| Enter student ID to search: ");
    int searchId;
    scanf("%d", &searchId);
    
    FILE *file = fopen("students.dat", "rb");
    if (file == NULL) {
        setColor(COLOR_YELLOW);
        printf("| No student records found.             |\n");
        setColor(COLOR_RESET);
    } else {
        struct Student student;
        int found = 0;
        
        while (fread(&student, sizeof(struct Student), 1, file)) {
            if (student.id == searchId) {
                found = 1;
                setColor(COLOR_BLUE);
                printf("+------------------------------------------+\n");
                setColor(COLOR_GREEN);
                printf("| Student Found:                           |\n");
                setColor(COLOR_BLUE);
                printf("+------------------------------------------+\n");
                setColor(COLOR_WHITE);
                printf("| ID: %-34d |\n", student.id);
                printf("| Name: %-32s |\n", student.name);
                printf("| Age: %-33d |\n", student.age);
                printf("| Course: %-30s |\n", student.course);
                break;
            }
        }
        fclose(file);
        
        if (!found) {
            setColor(COLOR_RED);
            printf("| Student with ID %d not found!        |\n", searchId);
            setColor(COLOR_RESET);
        }
    }
    
    printf("| Press any key to continue...          |\n");
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
    getchar(); // Clear buffer
    getchar(); // Wait for key press
}

void deleteStudent() {
    clearScreen();
    drawBox("DELETE STUDENT");
    
    setColor(COLOR_WHITE);
    printf("| Enter student ID to delete: ");
    int deleteId;
    scanf("%d", &deleteId);
    
    FILE *file = fopen("students.dat", "rb");
    if (file == NULL) {
        setColor(COLOR_YELLOW);
        printf("| No student records found.             |\n");
        setColor(COLOR_RESET);
    } else {
        FILE *tempFile = fopen("temp.dat", "wb");
        struct Student student;
        int found = 0;
        
        while (fread(&student, sizeof(struct Student), 1, file)) {
            if (student.id == deleteId) {
                found = 1;
                setColor(COLOR_GREEN);
                printf("| Student '%s' deleted successfully! |\n", student.name);
                setColor(COLOR_RESET);
            } else {
                fwrite(&student, sizeof(struct Student), 1, tempFile);
            }
        }
        
        fclose(file);
        fclose(tempFile);
        
        remove("students.dat");
        rename("temp.dat", "students.dat");
        
        if (!found) {
            setColor(COLOR_RED);
            printf("| Student with ID %d not found!        |\n", deleteId);
            setColor(COLOR_RESET);
        }
    }
    
    printf("| Press any key to continue...          |\n");
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
    getchar(); // Clear buffer
    getchar(); // Wait for key press
}

void loadingAnimation(const char *message) {
    printf("\n");
    printCentered(message);
    
    for (int i = 0; i < 3; i++) {
        printf(".");
        fflush(stdout);
        sleepMs(500);
    }
    printf("\n");
}

void drawBox(const char *title) {
    setColor(COLOR_BLUE);
    printf("+------------------------------------------+\n");
    printf("|");
    setColor(COLOR_YELLOW);
    
    int titleLen = strlen(title);
    int padding = (40 - titleLen) / 2;
    
    for (int i = 0; i < padding; i++) printf(" ");
    printf("%s", title);
    for (int i = 0; i < 40 - titleLen - padding; i++) printf(" ");
    
    setColor(COLOR_BLUE);
    printf("|\n");
    printf("+------------------------------------------+\n");
    setColor(COLOR_RESET);
}

void printCentered(const char *text) {
    int textLen = strlen(text);
    int screenWidth = 50;
    int padding = (screenWidth - textLen) / 2;
    
    for (int i = 0; i < padding; i++) printf(" ");
    printf("%s\n", text);
}

int getChoice(int min, int max) {
    int choice;
    while (1) {
        if (scanf("%d", &choice) == 1) {
            if (choice >= min && choice <= max) {
                return choice;
            }
        }
        setColor(COLOR_RED);
        printf("Invalid input! Please enter %d-%d: ", min, max);
        setColor(COLOR_RESET);
        
        // Clear input buffer
        int c;
        while ((c = getchar()) != '\n' && c != EOF);
    }
}