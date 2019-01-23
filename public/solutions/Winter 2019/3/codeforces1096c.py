def gcd(a,b):
	if a == 0 or b == 0:
		return max(a,b)
	return gcd(b, a%b)

t = int(input())
for _ in range(t):
	ang = int(input())
	gc = gcd(180, ang)
	n = 180 // gc
	if ang // gc + 1 == n:
		n *= 2
	print(n)