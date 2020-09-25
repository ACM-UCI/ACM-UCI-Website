N, M = map(int, input().split())
pods = list(map(int, input().split()))

ans, count = 10**9, 0
cart = [0] * N

l = 0
for r in range(M):
    if cart[pods[r]] == 0:
        count += 1;
    cart[pods[r]] += 1
    while count == N:
        ans = min(ans, r-l+1);
        cart[pods[l]] -= 1
        if cart[pods[l]] == 0:
            count -= 1
        l += 1

print(ans)
