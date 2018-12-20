from math import*
p=[[float(x)for x in input().split()]for _ in range(int(input()))];r=i=4e3
while i:a=[hypot(x,y)*cos(atan2(y,x)+i/1e3)for x,y in p];r=min(r,max(a)-min(a));i-=1
print("%.2f"%r)