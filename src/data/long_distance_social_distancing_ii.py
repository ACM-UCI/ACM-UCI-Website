import timeit

modulus = 10**9 + 7

class Matrix: #square matrix only 

    def __init__(self):
        self.m = [[1,1,1,1,1],
            [1,0,1,1,0],
            [1,1,0,1,1],
            [1,1,1,0,0],
            [1,0,1,0,0]]
        self.dim = len(self.m)     
    
    def __mul__(self, m2): #works because square
        m3 = Matrix()
        for i in range(self.dim):
            for k in range(self.dim):
                m3.m[i][k] = sum(self.m[i][x] * m2.m[x][k] for x in range(5)) % modulus
        return m3

    def __pow__(self, exponent: int):
        if exponent == 0:
            tmp = Matrix()
            tmp.m = [[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]]
            return tmp
        elif exponent == 1:
            return self
        if exponent % 2 == 0:
            return pow(self*self, exponent//2)
        else:
            return self * pow(self*self, exponent//2)
        
    def __str__(self):
        s = ""
        for row in self.m:
            s += ','.join(map(str,row)) + '\n'
        return s

def m_sum(m: [[int]]):
    return sum(sum(m[i]) for i in range(len(m)))

def seating_arrangments(m, n: int):
    if n==0: return 1
    return m_sum(pow(m, n-1).m)

def run():
    t = int(input())
    for _ in range(t):
        transform = Matrix()
    
        n = int(input())
        print(seating_arrangments(transform, n)**2 % modulus)

run()
