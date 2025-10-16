"""
Simple Contact Management System
A bug-free Python application for managing contacts
"""

import json
import os
from datetime import datetime

class ContactManager:
    def __init__(self, filename="contacts.json"):
        self.filename = filename
        self.contacts = self.load_contacts()
    
    def load_contacts(self):
        """Load contacts from JSON file"""
        try:
            if os.path.exists(self.filename):
                with open(self.filename, 'r') as file:
                    return json.load(file)
            return []
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    
    def save_contacts(self):
        """Save contacts to JSON file"""
        try:
            with open(self.filename, 'w') as file:
                json.dump(self.contacts, file, indent=2)
            return True
        except Exception:
            return False
    
    def add_contact(self, name, phone, email=""):
        """Add a new contact"""
        if not name or not phone:
            return False, "Name and phone are required"
        
        # Check if contact already exists
        for contact in self.contacts:
            if contact['name'].lower() == name.lower() or contact['phone'] == phone:
                return False, "Contact already exists"
        
        new_contact = {
            'name': name.strip(),
            'phone': phone.strip(),
            'email': email.strip(),
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        self.contacts.append(new_contact)
        if self.save_contacts():
            return True, "Contact added successfully"
        else:
            self.contacts.pop()  # Remove if save fails
            return False, "Failed to save contact"
    
    def view_contacts(self):
        """View all contacts"""
        if not self.contacts:
            print("No contacts found.")
            return
        
        print("\n" + "="*50)
        print("CONTACT LIST")
        print("="*50)
        for i, contact in enumerate(self.contacts, 1):
            print(f"{i}. {contact['name']}")
            print(f"   Phone: {contact['phone']}")
            print(f"   Email: {contact['email']}")
            print(f"   Added: {contact['created_at']}")
            print("-" * 30)
    
    def search_contact(self, search_term):
        """Search contacts by name or phone"""
        results = []
        search_term = search_term.lower()
        
        for contact in self.contacts:
            if (search_term in contact['name'].lower() or 
                search_term in contact['phone'] or 
                search_term in contact['email'].lower()):
                results.append(contact)
        
        return results
    
    def delete_contact(self, name):
        """Delete a contact by name"""
        for i, contact in enumerate(self.contacts):
            if contact['name'].lower() == name.lower():
                deleted_contact = self.contacts.pop(i)
                if self.save_contacts():
                    return True, f"Contact '{deleted_contact['name']}' deleted successfully"
                else:
                    self.contacts.insert(i, deleted_contact)  # Restore if save fails
                    return False, "Failed to delete contact"
        
        return False, "Contact not found"

def display_menu():
    """Display the main menu"""
    print("\n" + "="*40)
    print("CONTACT MANAGEMENT SYSTEM")
    print("="*40)
    print("1. Add Contact")
    print("2. View All Contacts")
    print("3. Search Contact")
    print("4. Delete Contact")
    print("5. Exit")
    print("="*40)

def get_valid_input(prompt, required=True):
    """Get validated user input"""
    while True:
        user_input = input(prompt).strip()
        if not user_input and required:
            print("This field is required. Please try again.")
            continue
        return user_input

def main():
    """Main program function"""
    contact_manager = ContactManager()
    
    print("Welcome to the Contact Management System!")
    
    while True:
        display_menu()
        
        try:
            choice = get_valid_input("Enter your choice (1-5): ")
            
            if choice == '1':
                # Add Contact
                print("\n--- Add New Contact ---")
                name = get_valid_input("Enter name: ")
                phone = get_valid_input("Enter phone: ")
                email = get_valid_input("Enter email (optional): ", required=False)
                
                success, message = contact_manager.add_contact(name, phone, email)
                print(f"\n{message}")
            
            elif choice == '2':
                # View All Contacts
                contact_manager.view_contacts()
            
            elif choice == '3':
                # Search Contact
                print("\n--- Search Contact ---")
                search_term = get_valid_input("Enter name, phone, or email to search: ")
                results = contact_manager.search_contact(search_term)
                
                if results:
                    print(f"\nFound {len(results)} contact(s):")
                    for contact in results:
                        print(f"- {contact['name']}: {contact['phone']} ({contact['email']})")
                else:
                    print("No contacts found matching your search.")
            
            elif choice == '4':
                # Delete Contact
                print("\n--- Delete Contact ---")
                contact_manager.view_contacts()
                if contact_manager.contacts:
                    name = get_valid_input("Enter name of contact to delete: ")
                    success, message = contact_manager.delete_contact(name)
                    print(f"\n{message}")
            
            elif choice == '5':
                # Exit
                print("\nThank you for using Contact Management System!")
                print("Goodbye!")
                break
            
            else:
                print("Invalid choice. Please enter a number between 1-5.")
        
        except KeyboardInterrupt:
            print("\n\nProgram interrupted by user. Goodbye!")
            break
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            print("Please try again.")

# Run the program
if __name__ == "__main__":
    main()