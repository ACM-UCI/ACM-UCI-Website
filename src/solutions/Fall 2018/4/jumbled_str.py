a,b,c,d = map(int,input().split())

lookup = {0:-1}
cur = 0
for i in range(1,10**5+10):
    cur+=i
    lookup[cur]=i+1

if a not in lookup or d not in lookup:
    print("impossible")
    exit(0)

num0 = lookup[a]
num1 = lookup[d]

if num0 == -1:
    num0 = 1 if b+c > 0 else 0
if num1 == -1:
    num1 = 1 if b+c > 0 else 0

tot_len = num0+num1
if a+b+c+d == 0:
    print("1")
    exit(0)

if (tot_len*(tot_len-1))/2 != a+b+c+d:
    #print(num0,num1)
    print("impossible")
    exit(0)

if num0 == 0 or num1 == 0:
    print("0"*num0+"1"*num1)
    exit(0)
    
f1 = c//num0
l1 = b//num0

if f1+l1 == num1:
    print("1"*f1+"0"*num0+"1"*l1)
elif f1+l1 == num1-1:
    f0 = b%num0
    print("1"*f1+"0"*f0+"1"+"0"*(num0-f0)+"1"*l1)
else:
    exit(1)