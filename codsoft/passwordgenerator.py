import random
import string

def generate_password():
    number = string.digits
    char = string.ascii_letters
    special_char = string.punctuation

    given_length = int(input("Enter length of password to be generated : "))
    inc_num = input("Want to include numbers (y/n): ").lower() == "y"
    inc_spe = input("Want to include special characters (y/n): ").lower() == "y"

    character = char
    if inc_num:
        character += number
    if inc_spe:
        character += special_char
    psw = []
    if inc_num:
        psw.append(random.choice(number))
    if inc_spe:
        psw.append(random.choice(special_char))

    while len(psw) < given_length:
        psw.append(random.choice(character))

    random.shuffle(psw)

    print("Generated password is:", "".join(psw))

generate_password()                                                                                                                                              