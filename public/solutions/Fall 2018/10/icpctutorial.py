from math import log, factorial
l = input().split()
m = int(l[0])
n = int(l[1])
t = int(l[2])
can = "TLE"
if t>1 or n<13: 
    if (t==7 and n<=m) or (t==6 and log(n,2)*n<=m) or (t==5 and n**2<=m)  or (t==4 and n**3<=m) or (t==3 and n**4<=m) or (t==2 and 2**n<=m) or (t==1 and factorial(n)<=m): can = "AC"
print(can)