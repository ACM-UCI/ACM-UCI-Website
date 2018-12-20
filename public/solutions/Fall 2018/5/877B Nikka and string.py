'''
    Nikita and string
    Source: http://codeforces.com/problemset/problem/877/B
'''

def solve(string):
    dp = [[],[],[],0]
    index = 0
    for i in range(0,len(string)):
        if string[i] == 'a':
            dp[0].append('a')
            dp[2].append('a')
            if dp[3] == 1:
                dp[3] = 2
            if len(dp[1]) >= 1 and dp[1][-1] != 'b':
                dp[1].append('a')
        else:
            dp[1].append('b')
            if dp[3] != 2:
                dp[2].append('b')
                dp[3] = 1
        if len(dp[0]) > len(dp[1]):
            dp[1] = list(dp[0])
        if len(dp[0]) > len(dp[2]):
            dp[2] = list(dp[0])
            dp[3] = 0
        if len(dp[1]) > len(dp[2]):
            dp[2] = list(dp[1])
            dp[3] = 1
       
    #print(dp)
    print(len(dp[2]))
                    


if __name__ == '__main__':
    string = input().strip()
    solve(string)
