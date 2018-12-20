#problem input
filename = 'p067_triangle.txt'
with open(filename) as f:
  line = f.readline().split()
  lines = 1
  row = list()
  triangle = list()
  while line:
    for i in range(0, len(line)):
          row.append(int(line[i]));
          
    triangle.append(row)
    line = f.readline().split()
    lines += 1

#print(triangle)

#problem process
maxvalues = list()
#initialize with starting values
for i in range(0, lines - 1):
    maxvalues.append(i);

print(maxvalues)

for i in range(lines - 2, 0, -1):
  for j in range(0, i):
    maxvalues[j] = triangle[i][j] + max(maxvalues[j], maxvalues[j + 1])
    print(maxvalues)

print(maxvalues[0])
