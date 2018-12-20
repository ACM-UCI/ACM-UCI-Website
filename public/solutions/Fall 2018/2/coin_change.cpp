class Solution {
public:
        int coinChange(vector<int>& coins, int amount) {
        int Max = amount + 1;
        int coinlen = coins.size();
        vector<int> dp(amount + 1, Max);
        dp[0] = 0;
        for (int i = 0; i < amount + 1; ++i) 
        {
            for (int j = 0; j < coinlen; ++j)
            {
                if(coins[j] <= i)
                    dp[i] = min(dp[i], dp[i - coins[j]] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
            
    }
};
