## Problem @ http://codeforces.com/problemset/problem/1060/B
## #greedy
n = int(input())
s = 0
while n > 0:
    r = n % 10
    if r < 9 and n // 10 > 0:
        s += 10 + r
        n -= 10 + r
    else:
        s += r
        n -= r
    n = n // 10
print(s)