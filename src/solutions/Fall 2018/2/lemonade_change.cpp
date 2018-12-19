class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int size = bills.size();
        int fives = 0;
        int tens = 0;
        for (auto i : bills)
        {
            if (i == 5)
                fives += 1;
            else if (i == 10)
            {
                if (fives < 1)
                    return false;
                else {
                    tens += 1;
                    fives -=1;
                }
            }
            else 
            {
                if ((fives < 1 || tens < 1) && fives < 3)
                    return false;
                else
                {
                    if (tens) {
                        tens -= 1;
                        fives -= 1;
                    }
                    else
                        fives -= 3;
                }
            }
        }
        return true;
        
    }
};
