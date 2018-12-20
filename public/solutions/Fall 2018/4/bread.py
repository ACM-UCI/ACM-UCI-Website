from collections import defaultdict

s = int(input())

first_breads = list(map(int,input().strip().split()))
next_breads = list(map(int,input().strip().split()))

lookup = {first_breads[i]:next_breads[i] for i in range(s)}

even_cycles = 0

visited = set()
for b in first_breads:
    if b not in visited:
        size = 0
        next = lookup[b]
        while next not in visited:
            visited.add(next)
            size+=1
            next = lookup[next]
        if size%2 == 0:
            even_cycles +=1
        visited.add(b)
#print("even cycles: {}".format(even_cycles))
print("Possible" if even_cycles%2==0 else "Impossible")