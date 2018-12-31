## Problem @ http://codeforces.com/problemset/problem/1060/D
## #greedy #math
n = int(input())
left = []
right = []
for i in range(n):
    a,b = map(int, input().split())
    left.append(a)
    right.append(b)
print(n + sum(map(max, sorted(left), sorted(right))))