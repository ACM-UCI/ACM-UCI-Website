#!/bin/python3

import os
import sys
def binSearch(arr, i, j, offset):
    goal = arr[j] - offset
    if(goal%2 == 1):    return -1
    goal = goal // 2 + offset
    while i <= j:
        mid = (i+j) // 2
        if(arr[mid] >= goal):   j = mid - 1
        else:                   i = mid + 1
    if i < len(arr) and arr[i] == goal:  return i
    return -1

#
# Complete the arraySplitting function below.
#
def arraySplitting(arr):
    if(len(arr) == 1):    return 0
    sumFromLeft = [arr[0] for _ in range(len(arr))]
    for i in range(1, len(arr)):    sumFromLeft[i] = sumFromLeft[i-1]+arr[i]
    maxDepth = 0
    stack = [(0, len(sumFromLeft)-1, 0)]

    while(len(stack) > 0):
        i, j, depth = stack.pop()
        if depth > maxDepth:
            maxDepth = depth
        if(i == j):  continue

        offset = sumFromLeft[i-1] if (i > 0) else 0
        split = binSearch(sumFromLeft, i, j, offset)
        if split == -1:     continue
        else:
            stack.append((i, split, depth+1))
            stack.append((split+1, j, depth+1))
    
    return maxDepth

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input())

    for t_itr in range(t):
        arr_count = int(input())

        arr = list(map(int, input().rstrip().split()))

        result = arraySplitting(arr)

        fptr.write(str(result) + '\n')

    fptr.close()
