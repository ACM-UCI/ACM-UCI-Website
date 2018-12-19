#!/bin/python3

import math
import os
import random
import re
import sys
from itertools import accumulate

def maximumSum(a, m):
    
    # logic: "it looks simple but it's pretty complicated..."
    # know that finding the sum subarrays is equiv to pref[j]-pref[i] for j>i
    # finding the max(pref[j]-pref[i])%m is equivalent to finding the pref[i]-pref[j] that is the smallest
    # Proof:
    # (pref[j]-pref[i]+M)%M == (M - -1*(pref[j]-pref[i]))%M == (M-(pref[i]-pref[j]))%M
    # sorting the arr puts elements close to each other next to each other -> best way to min difference
    
    modm = lambda x:x%m
    cur_max = max(map(modm,a))
    # construct the prefix arr
    cum_sum = list(map(modm,accumulate(a)))
    cur_max = max(cur_max,max(cum_sum))
    # sorted by values 1st then index as mod m keeps the prefix arr no longer in sorted order
    pref = sorted(enumerate(cum_sum),key=lambda x:(x[1],x[0]))
    minimum = m
    
    for i in range(1, len(a)): #determine the minimum
        if pref[i-1][0] > pref[i][0] and (pref[i][1] - pref[i-1][1] < minimum):
            minimum = pref[i][1] - pref[i-1][1]
    return max(cur_max,m-minimum)
    
        
        

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input())

    for q_itr in range(q):
        nm = input().split()

        n = int(nm[0])

        m = int(nm[1])

        a = list(map(int, input().rstrip().split()))

        result = maximumSum(a, m)

        fptr.write(str(result) + '\n')

    fptr.close()
