'''
    Bertwon Subway (recursion ver)
    A side note about this recursion version of solution is that this
    solution might exit when input number gets too large while using iterative
    method would not cause this problem. Python is weak of recursion, switch to
    Java or C++ when you find runtime error with large input
    Source: http://codeforces.com/problemset/problem/884/C
'''
from math import factorial
import sys
sys.setrecursionlimit(100000)
def solve(subway):
    max1,max2 =0,0
    explored = set()
    summation = 0
    for i in subway:
        temp = dfs(subway,explored,i)
        if temp > max1:
            if max2 != 0:
                max2 = max1
            max1 = temp
        elif temp > max2:
            max2 = temp
         
        summation += temp*temp
        #print(temp)

    summation -= max1*max1
    summation -= max2*max2
    summation += (max1 + max2)**2
    #print(max1,max2,conp_list)
    print(summation)
def dfs(subway,explored,node):
    if node in explored:
        return 0
    explored.add(node)
    return 1 + dfs(subway,explored,subway[node])

if __name__ == '__main__':
    num = int(input().strip())
    subway = dict()
    num_list = input().strip().split()
    for index,i in enumerate(num_list,1):
        subway[index] = int(i)
    solve(subway)
        
    
