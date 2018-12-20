a = [int(i) for i in input().rstrip().split()]
n = a[0]
k  = a[1]

c = [int(i) for i in input().rstrip().split()]

c.sort()
c = c[::-1]
s = 0
for i in range(n):
    s += (int(i/k) + 1)* c[i]
print(s)
