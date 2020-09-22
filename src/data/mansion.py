from heapq import heappush as push, heappop as pop
N, A, B, C = map(int, input().split())
src, dst = [], []
ans = 0
for i in range(N):
    X, Y = map(int, input().split())
    curr, prev, instant = (dst, src, A) if X < Y else (src, dst, B)
    for _ in range(abs(X-Y)):
        cost = instant
        if prev and C * i + prev[0] < cost:
            cost = C * i + pop(prev)
        push(curr, C * -i - cost)
        ans += cost
print(ans)
