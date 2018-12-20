###   UVA #101 : The Blocks Problem
###   Labels   : implementation, hash

n = int(input())
stack = [[i] for i in range(n)]
position = [i for i in range(n)]

line = input().split()
while len(line)!=1:

    a = int(line[1])
    b = int(line[3])

    if position[a]!=position[b]:
        
        # put back blocks on top of a
        if line[0]=='move':
            top = stack[position[a]][-1]
            while top!=a:
                stack[top] = [top]
                position[top] = top
                stack[position[a]].pop()
                top = stack[position[a]][-1]                
                
        # put back blocks on top of b
        if line[2]=='onto':
            top = stack[position[b]][-1]
            while top!=b:
                stack[top] = [top]
                position[top] = top
                stack[position[b]].pop()
                top = stack[position[b]][-1]
        
        index_a = stack[position[a]].index(a)
        stack_to_add = stack[position[a]][index_a:]
        stack[position[a]] = stack[position[a]][:index_a]
        
        # update position of blocks on top of a
        for i in stack_to_add: position[i]=position[b]
        stack[position[b]] += stack_to_add 
           
    
    line = input().split()
    
for i in range(n):
    print(str(i), end=":")
    for block in stack[i]: print(" " + str(block), end="")
    print()