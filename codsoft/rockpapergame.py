import random
import string 
import sys 
# 0-->paper, 1-->scissor, 2-->rock
print("                 WELCOME TO Rock Paper Scissors Game        ")

def game(iteration):
    str1="PSR"
    mapping = { 'P':"paper" , 'S':"scissor" , 'R':"rock" }
    print(" *Game ",iteration," starts " )
    user_choice=input("Enter your choice user haha (R,P,S):").strip().upper()
    if user_choice in mapping : 
        choice=mapping[user_choice]
    else:
        print("Invalid input ")
        sys.exit()
    guessed_choice = random.choice(str1)
   
    print(" --> Computer guess : ",mapping[guessed_choice])
    print(" --> You choose : ",mapping[user_choice])
    x=user_choice
    y=guessed_choice
    if(x=='P' and y=='P' ):
        print("     TIE  -_- ")
    elif(x=='P' and y=='S' ):
        print("     COMPUTER WINS YAY  ;)")
    elif(x=='P' and y=='R' ):
        print("         YOU WINS wOO  :)")
    elif(x=='S' and y=='P' ):
        print("     YOU WINS YAY   :)")
    elif(x=='S' and y=='S' ):
        print("         TIE   -_-")
    elif(x=='S' and y=='R' ):
        print("         COMPUTER WINS wOO  ;)")
    elif(x=='R' and y=='P' ):
        print("     COMPUTER WINS YAY  -_-")
    elif(x=='R' and y=='S' ):
        print("     YOU WINS wOO  :)")
    elif(x=='R' and y=='R' ):
        print("         TIE ")
    print("        HAHAHAHA Games ends here.... ")
    z=input(" Want to play again ???? (Y/N) ").strip().lower()=='y'
    print("")
    iteration+=1
    if z==True:
        game(iteration)
        print()
        print()
    else : 
        print( "         Game Over ")
        sys.exit()

iteration=1
game(iteration)
