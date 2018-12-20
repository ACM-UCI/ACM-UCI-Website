n,t = map(int,input().split())
min_c = -1e10
max_c = 1e10

curr_c = lambda: (max_c+min_c)/2

segments = []

for a in range(n):
    d,s = map(int,input().split())
    segments.append((d,s))

def calc_total_time(c):
    return 1e10 if min([s for d,s in segments])+c <= 0 else sum([d/(s+c) for d,s in segments])  
    
while max_c-min_c > 10**-7:
    curr_c = (max_c+min_c)/2
    tmp = calc_total_time(curr_c)
    if tmp < t:
        max_c = curr_c
    else:
        min_c = curr_c
        
print('{:.7f}'.format((max_c+min_c)/2))