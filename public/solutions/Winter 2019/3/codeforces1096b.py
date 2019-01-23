def tri(n):
	return (n*(n+1))//2

from collections import Counter

input()
s = input()
ct = Counter(s)
ans = 0

if len(ct.most_common(3)) == 1:
	ans = tri(len(s))
else:
	left = 1
	right = 1
	lc = s[0]
	rc = s[-1]
	while(s[left] == lc):
		left += 1
	while(s[len(s)-1-right] == rc):
		right += 1
	# print(left,right)
	if lc == rc:
		ans = (left+1) * (right+1)
	else:
		ans = left+right+1

print(ans % 998244353)