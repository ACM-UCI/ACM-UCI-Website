import math

d,s = map(int,input().split())

min_a = 0.0
max_a = 10**10

def calc(a):
    tmp = math.e**(d/a)
    return s-(a*.5*((tmp+1)/(tmp**.5))-a)

    
while abs(calc((max_a+min_a)/2)) > 10**-6:
    if calc((max_a+min_a)/2) < 0:
        min_a = (max_a+min_a)/2
    else:
        max_a = (max_a+min_a)/2
a = (max_a+min_a)/2
print(2*a*math.sinh(d/(2*a)))