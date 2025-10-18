import java.util.*;
/*This code is developed for open source use 
Anyone with permission can use it
#Hacktoberfest2025 #opensource #onlinecontribution #AI&ML_ERA #freetouse #NepTechTribe #learning_everyday*/
/*Hangman is a classic word-guessing game where players try to uncover a hidden word by suggesting letters one at a time. For each incorrect guess, a part of a stick figure is drawn, and the game ends either when the word is completely revealed or when the drawing is finished after six wrong attempts. The challenge lies in deducing the word quickly while carefully tracking which letters have already been used to avoid wasting precious guesses.*/
public class HangmanGame {
    private static final String[] WORDS = {
        "JAVA", "CODE", "PROGRAM", "COMPUTER", "DEBUG", 
        "CLASS", "METHOD", "OBJECT", "STRING", "ARRAY"
    };
    
    private static final String[] HANGMAN_STAGES = {
        // Stage 0 - 0 wrong guesses
        "     _______\n" +
        "     |/     |\n" +
        "     |      \n" +
        "     |      \n" +
        "     |      \n" +
        "     |      \n" +
        "    /|\\     ",
        
        // Stage 1 - 1 wrong guess
        "     _______\n" +
        "     |/     |\n" +
        "     |     😟\n" +
        "     |      \n" +
        "     |      \n" +
        "     |      \n" +
        "    /|\\     ",
        
        // Stage 2 - 2 wrong guesses
        "     _______\n" +
        "     |/     |\n" +
        "     |     😟\n" +
        "     |      |\n" +
        "     |      |\n" +
        "     |      \n" +
        "    /|\\     ",
        
        // Stage 3 - 3 wrong guesses
        "     _______\n" +
        "     |/     |\n" +
        "     |     😟\n" +
        "     |     /|\n" +
        "     |      |\n" +
        "     |      \n" +
        "    /|\\     ",
        
        // Stage 4 - 4 wrong guesses
        "     _______\n" +
        "     |/     |\n" +
        "     |     😟\n" +
        "     |     /|\\\n" +
        "     |      |\n" +
        "     |      \n" +
        "    /|\\     ",
        
        // Stage 5 - 5 wrong guesses
        "     _______\n" +
        "     |/     |\n" +
        "     |     😟\n" +
        "     |     /|\\\n" +
        "     |      |\n" +
        "     |     / \n" +
        "    /|\\     ",
        
        // Stage 6 - 6 wrong guesses (game over)
        "     _______\n" +
        "     |/     |\n" +
        "     |     😵\n" +
        "     |     /|\\\n" +
        "     |      |\n" +
        "     |     / \\\n" +
        "    /|\\     "
    };

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        boolean playAgain = true;
        
        System.out.println("🎮 Welcome to ASCII Hangman! 🎮");
        System.out.println("Press Enter to start...");
        scanner.nextLine();
        
        while (playAgain) {
            // Game setup
            String word = WORDS[random.nextInt(WORDS.length)];
            char[] guessedWord = new char[word.length()];
            Arrays.fill(guessedWord, '_');
            Set<Character> usedLetters = new HashSet<>();
            int wrongAttempts = 0;
            boolean gameWon = false;
            
            // Main game loop
            while (wrongAttempts < 6 && !gameWon) {
                displayGameState(guessedWord, usedLetters, wrongAttempts, word.length());
                
                System.out.print("\n💡 Enter a letter: ");
                String input = scanner.nextLine().toUpperCase();
                
                if (input.length() != 1 || !Character.isLetter(input.charAt(0))) {
                    System.out.println("❌ Please enter a single letter!");
                    waitForEnter(scanner);
                    continue;
                }
                
                char guess = input.charAt(0);
                
                if (usedLetters.contains(guess)) {
                    System.out.println("⚠️  You already tried '" + guess + "'!");
                    waitForEnter(scanner);
                    continue;
                }
                
                usedLetters.add(guess);
                
                if (word.indexOf(guess) >= 0) {
                    // Correct guess
                    System.out.println("✅ Good guess!");
                    for (int i = 0; i < word.length(); i++) {
                        if (word.charAt(i) == guess) {
                            guessedWord[i] = guess;
                        }
                    }
                    
                    // Check if word is complete
                    if (new String(guessedWord).equals(word)) {
                        gameWon = true;
                    }
                } else {
                    // Wrong guess
                    System.out.println("❌ Wrong guess!");
                    wrongAttempts++;
                }
                
                waitForEnter(scanner);
            }
            
            // Game over display
            displayFinalResult(word, gameWon);
            
            // Play again?
            System.out.print("\n🔄 Play again? (Y/N): ");
            String response = scanner.nextLine().toUpperCase();
            playAgain = response.equals("Y") || response.equals("YES");
        }
        
        System.out.println("\n🎉 Thanks for playing ASCII Hangman! 🎉");
        scanner.close();
    }
    
    private static void displayGameState(char[] guessedWord, Set<Character> usedLetters, int wrongAttempts, int wordLength) {
        clearScreen();
        
        System.out.println("┌─────────────────────┐");
        System.out.println("│       HANGMAN       │");
        System.out.println("├─────────────────────┤");
        System.out.println(HANGMAN_STAGES[wrongAttempts]);
        System.out.println("├─────────────────────┤");
        
        // Display word with proper spacing
        System.out.print("│ Word: ");
        for (char c : guessedWord) {
            System.out.print(c + " ");
        }
        // Add spaces to align the box
        int spacesNeeded = (wordLength * 2) - 1;
        int totalSpaces = 18 - spacesNeeded;
        for (int i = 0; i < totalSpaces; i++) {
            System.out.print(" ");
        }
        System.out.println("│");
        
        // Display used letters
        System.out.print("│ Used: ");
        if (usedLetters.isEmpty()) {
            System.out.println("None           │");
        } else {
            List<Character> usedList = new ArrayList<>(usedLetters);
            Collections.sort(usedList);
            StringBuilder usedStr = new StringBuilder();
            for (int i = 0; i < usedList.size(); i++) {
                if (i > 0) usedStr.append(",");
                usedStr.append(usedList.get(i));
            }
            System.out.print(usedStr.toString());
            // Add spaces to align
            int spaces = 16 - usedStr.length();
            for (int i = 0; i < spaces; i++) {
                System.out.print(" ");
            }
            System.out.println("│");
        }
        
        System.out.println("├─────────────────────┤");
        System.out.println("│ Wrong: " + wrongAttempts + "/6           │");
        System.out.println("└─────────────────────┘");
    }
    
    private static void displayFinalResult(String word, boolean gameWon) {
        clearScreen();
        
        if (gameWon) {
            System.out.println("┌─────────────────────┐");
            System.out.println("│      YOU WIN! 🎉    │");
            System.out.println("├─────────────────────┤");
            System.out.println("                      ");
            System.out.println("        \\😊/         ");
            System.out.println("         |           ");
            System.out.println("        / \\         ");
            System.out.println("                      ");
            System.out.println("├─────────────────────┤");
            System.out.println("│ The word was: " + word + "     │");
            System.out.println("└─────────────────────┘");
        } else {
            System.out.println("┌─────────────────────┐");
            System.out.println("│     GAME OVER 💀    │");
            System.out.println("├─────────────────────┤");
            System.out.println(HANGMAN_STAGES[6]);
            System.out.println("├─────────────────────┤");
            System.out.println("│ The word was: " + word + "     │");
            System.out.println("└─────────────────────┘");
        }
    }
    
    private static void waitForEnter(Scanner scanner) {
        System.out.println("Press Enter to continue...");
        scanner.nextLine();
    }
    
    private static void clearScreen() {
        try {
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } catch (Exception e) {
            // If clearing fails, print some newlines
            for (int i = 0; i < 50; i++) {
                System.out.println();
            }
        }
    }
}