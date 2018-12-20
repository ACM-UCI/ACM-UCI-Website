import sys

n,k = map(int,input().strip().split())
min_num = input().strip()

max_num = bin(int("1"*n,2)+int(min_num,2))[2:]

pascals = [[0]*(10**3+10) for _ in range(10**3+10)]
pascals[0][0] = 1;
for i in range(1,10**3+10):
    for j in range(i+1):
        if j != 0:
            pascals[i][j] += pascals[i-1][j-1]
        if j != i:
            pascals[i][j] += pascals[i-1][j]

sys.setrecursionlimit(10**3+10)

def calc_num_less(bnum,k):
    if k<0:
        return 0
    if len(bnum) == 0:
        return int(k==0)
    if bnum[0] == '0':
        return calc_num_less(bnum[1:],k)
    else:
        return pascals[len(bnum)-1][k] + calc_num_less(bnum[1:],k-1)

#print(calc_num_less(max_num,k))
#print(calc_num_less(min_num,k))

min_num_minus_1 = bin(int(min_num,2)-1)[2:]

ans = calc_num_less(max_num,k)
if int(min_num,2) != 0:
    ans -= calc_num_less(min_num_minus_1,k)

print(ans % (10**9+7))