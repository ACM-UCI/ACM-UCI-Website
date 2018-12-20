//link: https://leetcode.com/problems/string-to-integer-atoi/description/
class Solution {
public:
    int myAtoi(string str) {
        int i = 0;
        int n = str.length();
        int sign = 1;
        int num = 0;
        int maxDiv10 = INT_MAX / 10;
        int temp;
        while (i < n && str[i] == ' ') 
            i++;
        if (i < n && str[i] == '+')
        {
            i++;
        }
        else if(i < n && str[i] == '-')
        {
            sign = -1;
            i++;
        }
        while (i < n && str[i] >= '0' && str[i] <= '9')
        {
            temp = str[i] - '0';
            if ( num > maxDiv10 || num == maxDiv10 && temp >= 8)
            {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            num = num * 10 + temp;
            i++;
        }
        return sign * num;
    }
};
