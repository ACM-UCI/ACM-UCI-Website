import time
# how many digits you limit the fib# to
MOD = 1000000000
	
def matmult(a,b):
    '''matrix mult without numpy'''
    zip_b = zip(*b)
    zip_b = list(zip_b)
    return [[sum(ele_a*ele_b%MOD for ele_a, ele_b in zip(row_a, col_b)) 
            for col_b in zip_b] for row_a in a]    
assert matmult([[3,2,5],[9,1,4]],[[1,2],[3,4],[5,6]]) == [[34,44],[32,46]]
             
             
def expBySquaringMatrices(x,n):
    '''x^n O(log(n)) iters'''
    if n==0:
        return [[0,1],[0,1]]
    elif n==1:
        return x
    elif n%2 == 0:
        return expBySquaringMatrices(matmult(x,x),n/2)
    elif n%2 == 1:
        return matmult(x,expBySquaringMatrices(matmult(x,x),(n-1)/2))
assert expBySquaringMatrices([[0,1],[1,1]],2) == [[1,1],[1,2]]


def fib(n):
    return matmult(expBySquaringMatrices([[0,1],[1,1]],n-1),[[1],[1]])[0][0]
assert fib(6) == 8

'''
a = time.time()
print(fib(3750000000))
b = time.time()
print(str(b-a), 'seconds to complete')
'''


cases = int(input())

results = []
for a in range(cases):
    tot,num = input().split()
    tot = fib(int(num))%MOD
    results.append(str(a+1)+' '+str(tot))
    
for ans in results:
    print(ans)
    
