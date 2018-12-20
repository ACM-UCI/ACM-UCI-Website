'''
    Algorithm category: Binary search + greedy
    Problem explaination: Using O(n^2) solution would lead to getting a TLE(Time
    limit exceeded) error by comparing each P with the rest of P.
    However, it is not hard to test if 100, for example, is one of the solutions(may
    not be the optimal one). if 100 can not be one of the solution, how about 100/2?
    This intuition give us a clue to use binary search on the answer and use
    greedy algorithm to check if this answer is correct or not
    Side Note: The online judge accept my Pyhton 2.7 solution but give TLE error
    for my Python3's. There are places in this solution that can be optimized.
    Try to come up and pass the online judge using Python3 if interested.
'''
def solve(field,size,answer):
    star_pos = -1
    p_pos = -1
    for i in range(size):
        #print(p_pos,star_pos)
        if field[i] == "*":
            if star_pos != -1:
                if p_pos != -1:
                    if star_pos < p_pos and i > p_pos: #*...P.*.* star on both side of P
                        if min(2*(p_pos-star_pos)+(i-p_pos),2*(i-p_pos)+\
                               (p_pos-star_pos)) > answer:
                            star_pos = i
                            p_pos = -1
                            continue
                    elif i-p_pos > answer: #..P..*P when star on the right of P
                        star_pos = i
                        p_pos = -1
                        continue
            else:
                if p_pos != -1: #P..*.P 
                    if i - p_pos > answer:
                        p_pos = -1
                star_pos = i
            
        if field[i] == "P":
            if p_pos != -1:
                star_pos = -1
            if star_pos != -1:
                #print("star_pos:",star_pos,"current pos",i)
                if i - star_pos > answer:
                    return -1
            p_pos = i
        
    if p_pos == -1:
        return -1
    return 1
        
                    
                

if __name__ == "__main__":
    size = int(input().strip()) #Change this statement in to int(raw_input().strip()) in Python 2.7
    field = input().strip() # Change this statement into raw_input().strip() in Python 2.7
    first = 1
    last = 2*size
    best = last + 1
    while first <= last:
        mid = int(first + (last - first)/2) 
        if solve(field,size,mid) == -1:
            first = mid + 1
        else:
            best = mid
            last = mid - 1
    print(best)

