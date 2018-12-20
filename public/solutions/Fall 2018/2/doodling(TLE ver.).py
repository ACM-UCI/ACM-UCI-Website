'''
    This is a TLE solution which basically follow the bouncing rule in the
    description and count doodling grid one by one. The time complexity is
    O(n^2) which can not pass the online judge when input x y is 20000
'''

def solve(height, width, x, y, x_direc, y_direc,visited):
    
    if (x == width and y == height) \
       or (x == 1 and y == height) or (x == width and y == 1):
        return 1
    if (x + x_direc > width or x + x_direc < 1):
        x_direc = -x_direc
    
    if y + y_direc > height or y + y_direc < 1:
        y_direc = -y_direc
    if (x,y) not in visited:
        visited.add((x,y))
        to_add = 1
    else:
        to_add = 0
    return to_add + solve(height, width, x + x_direc, y + y_direc, x_direc, y_direc,visited)

if __name__ == "__main__":
    test_num = int(input())  #number of testcases
    for i in range(test_num):
        width, height = [int(i) for i in input().strip().split()] #get width and height
        visited = set()  #we don't want to re-count the node we had visited
        if height <=1 or width <= 1:
            print(1)
        else:
            ans = solve(height,width, 1, 1, 1, 1, visited)
            print(ans)
        print()
    
