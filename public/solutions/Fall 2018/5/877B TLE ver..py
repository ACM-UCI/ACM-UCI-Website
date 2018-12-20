'''
    Nikita and string (TLE ver.)
    Source: http://codeforces.com/problemset/problem/877/B
'''

def solve(string):
    dp = [[0,string[0]]]
    to_add = True
    #b_len = len([1 for i in string if i=='b'])
    #a_len = len([1 for i in string if i=='a'])
    for i in range(1,len(string)):
        to_add = True
        for j in range(len(dp)):
            if dp[j][0] == 0:
                if string[i] != dp[j][-1]:
                    if string[i] == 'b':
                        dp.append([0]+dp[j][1:] + [string[i]])
                    else:
                        dp.append([1]+dp[j][1:] + [string[i]])
                else:
                    to_add = False
                    dp[j].append(string[i])
            elif dp[j][0] == 1:
                if string[i] == dp[j][-1]:
                    dp[j].append(string[i])

    #print(dp)
    print(max([(len(i)-1) for i in dp]))
                    


if __name__ == '__main__':
    string = input().strip()
    solve(string)