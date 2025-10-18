#!/usr/bin/env python3
# Author: Rishabh
# Pomodoro Timer CLI - helps track work intervals and breaks

import time
import sys

def countdown_timer(minutes, session_type="Work"):
    """Run a countdown timer for the specified number of minutes."""
    total_seconds = minutes * 60

    print(f"\n{session_type} session started: {minutes} minutes")
    print("Press Ctrl+C to stop the timer\n")

    try:
        for remaining in range(total_seconds, 0, -1):
            mins, secs = divmod(remaining, 60)
            timer_display = f"{mins:02d}:{secs:02d}"
            print(f"\r{session_type}: {timer_display}", end="")
            sys.stdout.flush()
            time.sleep(1)

        print(f"\n\n🔔 {session_type} session complete! Time's up!")
        return True

    except KeyboardInterrupt:
        print("\n\nTimer stopped by user.")
        return False

def main():
    print("=== Pomodoro Timer CLI ===")
    print("Default: 25 minutes work, 5 minutes break")

    try:
        work_input = input("\nEnter work duration in minutes (default 25): ").strip()
        work_minutes = int(work_input) if work_input else 25

        if work_minutes <= 0:
            print("Duration must be positive.")
            return

    except ValueError:
        print("Invalid input. Using default 25 minutes.")
        work_minutes = 25

    # Work session
    completed = countdown_timer(work_minutes, "Work")

    if completed:
        # Ask if user wants a break
        break_choice = input("\nStart a 5-minute break? (y/n): ").strip().lower()
        if break_choice == 'y':
            countdown_timer(5, "Break")
            print("\nGreat session! Keep up the productivity!")

if __name__ == "__main__":
    main()
