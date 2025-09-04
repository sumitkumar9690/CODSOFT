print(" \n \n \n                      Simple Calculator")

a=float(input("Enter the frist operand : "))
b=float(input("Enter the second operand : "))

c=input("Enter operator, For Example \n\n <> '+'--> for addition \n <> '-'--> for substraction\n <> '*'--> for multipication \n <> '/'--> for division \n \n " )

if c=='+':
    print("Addition a+b is : ",a+b)
elif c=='-':
    print("Substraction a-b is : ",a-b)
elif c=='*':
    print("Multiplication a*b is : ",a*b)
elif c=='/':
    if b==0 : 
        print("Error, can't divided by 0")       
    else :
        print("Division a/b is : ",a/b)
else :
    print("Invalid operator")