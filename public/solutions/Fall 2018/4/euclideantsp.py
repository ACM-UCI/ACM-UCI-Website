import math

n,p,s,v = (map(float,input().split()))

def fun(c):
    result = (math.log(n)/math.log(2))**((2**.5)*c)
    result*= n
    result /= (p*(10**9))
    result += (s/v)
    result += (s/(v*c))
    return result
    
min = .1
max = 200
while max-min > 10**-6:
    third = (max-min)/3
    low = min+third
    high = max-third
    l_r = fun(low)
    h_r = fun(high)
    #print(l_r,h_r)
    if l_r < h_r:
        max = high
    else:
        min = low

c = (max+min)/2
print(fun(c),c)